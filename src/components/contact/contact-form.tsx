"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formStartedAt = useRef<number | null>(null);
  const submittingRef = useRef(false);

  function ensureStartTime() {
    if (formStartedAt.current === null) {
      formStartedAt.current = Date.now();
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    ensureStartTime();
    setError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      organisation: String(data.get("organisation") || "").trim(),
      interest: String(data.get("interest") || "").trim(),
      message: String(data.get("message") || "").trim(),
      company_website: String(data.get("company_website") || ""),
      formStartedAt: formStartedAt.current ?? Date.now(),
    };

    const nextErrors: Record<string, string> = {};
    if (payload.name.length < 2) nextErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (payload.message.length < 10) nextErrors.message = "Enter at least 10 characters.";
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setStatus("error");
      setError("Please correct the highlighted fields.");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        mode?: string;
        error?: string;
        fallbackEmail?: string;
      };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(
          result.error ||
            `Unable to send. Please email ${result.fallbackEmail || siteConfig.email.general}.`,
        );
        return;
      }

      setStatus("success");
      form.reset();
      formStartedAt.current = null;
    } catch {
      setStatus("error");
      setError(`Network error. Please email ${siteConfig.email.general} directly.`);
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={ensureStartTime}
      className="space-y-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          required
          autoComplete="name"
          error={fieldErrors.name}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={fieldErrors.email}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organisation" name="organisation" autoComplete="organization" />
        <div>
          <label htmlFor="interest" className="mb-2 block text-sm font-medium">
            Area of interest
          </label>
          <select
            id="interest"
            name="interest"
            className="focus-ring h-11 w-full rounded-lg border border-border bg-card px-3 text-sm"
            defaultValue="Partnership"
          >
            <option>Partnership</option>
            <option>BioAegix / Healthcare</option>
            <option>NPTTE PharmaNG</option>
            <option>BeatIQ</option>
            <option>Research collaboration</option>
            <option>Investment discussion</option>
            <option>Careers</option>
            <option>General enquiry</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="focus-ring w-full rounded-lg border border-border bg-card px-3 py-3 text-sm leading-relaxed"
          placeholder="Tell us briefly about your organisation and what you would like to explore."
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from assistive tech users via CSS + tabindex */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Or email{" "}
          <a className="underline-offset-4 hover:underline" href={`mailto:${siteConfig.email.general}`}>
            {siteConfig.email.general}
          </a>
        </p>
      </div>

      {status === "success" ? (
        <p className="rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm" role="status">
          Thank you. Your enquiry has been sent to Aurexus Group Ltd.
        </p>
      ) : null}
      {status === "error" && error ? (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="focus-ring h-11 w-full rounded-lg border border-border bg-card px-3 text-sm"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
