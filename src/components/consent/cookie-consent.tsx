"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookieConsent, useHasMounted } from "@/hooks/use-cookie-consent";

/**
 * Cookie preference banner.
 * Accept / Reject / Save must only update local state + storage — never reload or navigate.
 */
export function CookieConsent() {
  const mounted = useHasMounted();
  const { hasChoice, acceptAll, rejectNonEssential, savePreferences } = useCookieConsent();
  const [manualOpen, setManualOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const openPrefs = () => {
      setManualOpen(true);
      setPrefsOpen(true);
    };
    window.addEventListener("aurexus-open-cookie-settings", openPrefs);
    return () => window.removeEventListener("aurexus-open-cookie-settings", openPrefs);
  }, []);

  if (!mounted) return null;

  const open = manualOpen || !hasChoice;
  if (!open) return null;

  const closeBanner = () => {
    setManualOpen(false);
    setPrefsOpen(false);
  };

  const onAcceptAll = () => {
    try {
      acceptAll();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[aurexus:consent] acceptAll failed:", error);
      }
    }
    closeBanner();
  };

  const onReject = () => {
    try {
      rejectNonEssential();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[aurexus:consent] rejectNonEssential failed:", error);
      }
    }
    closeBanner();
  };

  const onSavePreferences = () => {
    try {
      savePreferences(analytics, marketing);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[aurexus:consent] savePreferences failed:", error);
      }
    }
    closeBanner();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl md:p-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 id="cookie-consent-title" className="font-display text-lg font-semibold tracking-tight">
            Cookie preferences
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We use strictly necessary storage for theme and to remember your cookie choices.
            Analytics and marketing cookies are not currently loaded on this site. Your choice
            still controls whether those categories may run if introduced later. See our{" "}
            <Link href="/legal/cookie-policy" className="underline-offset-4 hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
          {prefsOpen ? (
            <div className="mt-4 space-y-3 rounded-xl border border-border p-4 text-sm">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1" />
                <span>
                  <strong>Strictly necessary</strong> — always on (theme and consent storage).
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span>
                  <strong>Analytics</strong> — not currently used; permission stored for future use.
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span>
                  <strong>Marketing</strong> — not currently used; permission stored for future use.
                </span>
              </label>
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {prefsOpen ? (
            <Button type="button" onClick={onSavePreferences}>
              Save preferences
            </Button>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={() => setPrefsOpen(true)}>
                Manage
              </Button>
              <Button type="button" variant="outline" onClick={onReject}>
                Reject non-essential
              </Button>
              <Button type="button" onClick={onAcceptAll}>
                Accept all
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          window.dispatchEvent(new Event("aurexus-open-cookie-settings"));
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("[aurexus:consent] open settings failed:", error);
          }
        }
      }}
    >
      Cookie settings
    </button>
  );
}
