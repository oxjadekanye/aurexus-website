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

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const organisation = String(body.organisation ?? "").trim();
  const interest = String(body.interest ?? "General enquiry").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
  }
  if (!isEmail(email) || email.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email address." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 5000) {
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

  const resendKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [siteConfig.email.general],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "We could not send your message right now. Please email us directly.",
          fallbackEmail: siteConfig.email.general,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  }

  // Real fallback path when no mail provider is configured: return a mailto URL
  const mailto = `mailto:${siteConfig.email.general}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  return NextResponse.json({
    ok: true,
    mode: "mailto",
    mailto,
    fallbackEmail: siteConfig.email.general,
  });
}
