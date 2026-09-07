import type { IncomingMessage, ServerResponse } from 'node:http';
import { z } from 'zod';

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

type VercelResponse = ServerResponse & {
  json: (body: unknown) => void;
  status: (code: number) => VercelResponse;
};

const enquirySchema = z
  .object({
    name: z.string().trim().min(1).max(160),
    company: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(320),
    phone: z.string().trim().min(3).max(50),
    partnershipType: z.enum([
      'Investment',
      'Strategic Partnership',
      'Technology',
      'Media',
      'Entertainment',
      'Venture Opportunity',
      'General Enquiry',
    ]),
    message: z.string().trim().min(1).max(10000),
  })
  .strict();

const MAX_BODY_BYTES = 32_000;
const VERIFIED_SENDER = 'hello@7nitesentertainment.co.za';

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] ?? character,
  );
}

function sendJson(response: VercelResponse, status: number, body: unknown) {
  response.status(status).json(body);
}

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function applyOriginGuard(request: VercelRequest, response: VercelResponse) {
  const origin = request.headers.origin;
  const allowedOrigins = getAllowedOrigins();

  if (!origin || allowedOrigins.length === 0) {
    return true;
  }

  if (!allowedOrigins.includes(origin)) {
    sendJson(response, 403, { error: 'Request origin is not allowed.' });
    return false;
  }

  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Vary', 'Origin');
  return true;
}

function getRequestBody(request: VercelRequest) {
  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body) as unknown;
    } catch {
      return null;
    }
  }

  return request.body ?? null;
}

function getConfiguredEmailAddress(value: string) {
  const bracketedAddress = value.match(/<([^<>]+)>/u)?.[1] ?? value;
  return bracketedAddress.trim().toLowerCase();
}

function buildEmailContent(
  enquiry: z.infer<typeof enquirySchema>,
  submittedAt: string,
) {
  const fields = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['Subject', enquiry.partnershipType],
    ['Message', enquiry.message],
    ['Submitted', submittedAt],
  ] as const;

  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n\n');
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return {
    text,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#192b5b"><h2 style="margin:0 0 20px">New 7Nites Website Enquiry</h2><table style="border-collapse:collapse;width:100%;max-width:720px"><tbody>${rows}</tbody></table></div>`,
  };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', 'POST, OPTIONS');
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  if (!applyOriginGuard(request, response)) {
    return;
  }

  const contentLength = Number(request.headers['content-length'] ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    sendJson(response, 413, { error: 'Request is too large.' });
    return;
  }

  const parsed = enquirySchema.safeParse(getRequestBody(request));
  if (!parsed.success) {
    sendJson(response, 400, {
      error: 'Please check your details and try again.',
      fields: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ENQUIRY_TO_EMAIL;
  const sender = process.env.EMAIL_FROM;

  if (
    !apiKey ||
    !recipient ||
    !sender ||
    recipient.trim().toLowerCase() !== VERIFIED_SENDER ||
    getConfiguredEmailAddress(sender) !== VERIFIED_SENDER
  ) {
    console.error('Enquiry email configuration is incomplete or invalid.');
    sendJson(response, 500, {
      error: 'Enquiry delivery is temporarily unavailable.',
    });
    return;
  }

  const submittedAt = new Date().toISOString();
  const emailContent = buildEmailContent(parsed.data, submittedAt);

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: parsed.data.email,
        subject: `New Website Enquiry — ${parsed.data.partnershipType}`,
        text: emailContent.text,
        html: emailContent.html,
      }),
    });

    if (!resendResponse.ok) {
      console.error('Resend rejected enquiry email.', {
        status: resendResponse.status,
      });
      sendJson(response, 502, {
        error: 'Enquiry delivery is temporarily unavailable.',
      });
      return;
    }

    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error('Enquiry email request failed.', {
      error: error instanceof Error ? error.name : 'unknown',
    });
    sendJson(response, 502, {
      error: 'Enquiry delivery is temporarily unavailable.',
    });
  }
}