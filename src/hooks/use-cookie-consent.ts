"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  canLoadAnalytics,
  canLoadMarketing,
  getConsentSnapshot,
  getServerConsentSnapshot,
  initialiseOptionalIntegrations,
  subscribeConsent,
  writeConsent,
  type CookieConsentState,
} from "@/lib/cookies";

export function useCookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const save = useCallback((analytics: boolean, marketing: boolean): CookieConsentState => {
    const next = writeConsent({ analytics, marketing });
    // Never reload/redirect. Analytics failures must not break the page.
    try {
      initialiseOptionalIntegrations(next);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[aurexus:consent] save integrations:", error);
      }
    }
    return next;
  }, []);

  return {
    consent,
    hasChoice: consent !== null,
    analyticsAllowed: canLoadAnalytics(consent),
    marketingAllowed: canLoadMarketing(consent),
    acceptAll: () => save(true, true),
    rejectNonEssential: () => save(false, false),
    savePreferences: save,
  };
}

export function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
