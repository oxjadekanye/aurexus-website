"use client";

import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { initialiseOptionalIntegrations } from "@/lib/cookies";
import { useEffect } from "react";

/**
 * Loads non-essential third-party scripts only when consent allows.
 * Failures must never break page navigation or crash the tab.
 */
export function ConsentGatedScripts() {
  const { consent, hasChoice, analyticsAllowed, marketingAllowed } = useCookieConsent();

  useEffect(() => {
    if (!hasChoice || !consent) return;
    try {
      initialiseOptionalIntegrations(consent);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[aurexus:consent] ConsentGatedScripts:", error);
      }
    }
  }, [hasChoice, consent, analyticsAllowed, marketingAllowed]);

  return null;
}
