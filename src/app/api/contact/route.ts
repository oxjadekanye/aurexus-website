import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type ContactBody = {
  name?: string;
  email?: string;
  organisation?: string;
  interest?: string;
  message?: string;
  company_website?: string;
  formStartedAt?: number;
};

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email.general;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Strip control characters and normalise whitespace for safe plain-text email bodies. */
function sanitize(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — bots often fill hidden fields
  if (body.company_website && String(body.company_website).trim() !== "") {
    return NextResponse.json({ ok: true, mode: "accepted" });
  }

  const started = Number(body.formStartedAt ?? 0);
  if (!started || Date.now() - started < 2500) {
    return NextResponse.json(
      { ok: false, error: "Please take a moment before submitting." },
      { status: 429 },
    );
  }

  const name = sanitize(String(body.name ?? ""), 120);
  const email = sanitize(String(body.email ?? ""), 200);
  const organisation = sanitize(String(body.organisation ?? ""), 200);
  const interest = sanitize(String(body.interest ?? "General enquiry"), 120) || "General enquiry";
  const message = sanitize(String(body.message ?? ""), 5000);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email address." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please enter a message between 10 and 5,000 characters." },
      { status: 400 },
    );
  }

  const subject = `Aurexus website enquiry — ${interest}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organisation || "—"}`,
    `Interest: ${interest}`,
    "",
    message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!resendKey || !fromAddress) {
    return NextResponse.json(
      {
        ok: false,
        error: `Online delivery is temporarily unavailable. Please email ${CONTACT_TO_EMAIL} directly.`,
        fallbackEmail: CONTACT_TO_EMAIL,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `We could not send your message right now. Please email ${CONTACT_TO_EMAIL} directly.`,
          fallbackEmail: CONTACT_TO_EMAIL,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: `We could not send your message right now. Please email ${CONTACT_TO_EMAIL} directly.`,
        fallbackEmail: CONTACT_TO_EMAIL,
      },
      { status: 502 },
    );
  }
}
