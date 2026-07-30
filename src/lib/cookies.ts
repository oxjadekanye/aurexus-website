export const COOKIE_CONSENT_KEY = "aurexus_cookie_consent_v1";
export const COOKIE_CONSENT_COOKIE = "aurexus_consent";
export const CONSENT_EVENT = "aurexus-cookie-consent";

export type CookieConsentState = {
  version: 1;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const defaultRejectedConsent: CookieConsentState = {
  version: 1,
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

/** Cached snapshot so useSyncExternalStore receives a stable reference. */
let cachedRaw: string | null | undefined = undefined;
let cachedSnapshot: CookieConsentState | null = null;

function isBrowser() {
  return typeof window !== "undefined";
}

function logConsentError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "development") return;
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[aurexus:consent] ${context}:`, message);
}

function parseConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    if (parsed?.version !== 1) return null;
    return {
      version: 1,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: String(parsed.updatedAt ?? ""),
    };
  } catch (error) {
    logConsentError("parseConsent", error);
    return null;
  }
}

function syncCacheFromStorage(): CookieConsentState | null {
  if (!isBrowser()) {
    cachedRaw = null;
    cachedSnapshot = null;
    return null;
  }

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    logConsentError("localStorage.getItem", error);
    raw = null;
  }

  if (raw === cachedRaw) {
    return cachedSnapshot;
  }

  cachedRaw = raw;
  cachedSnapshot = parseConsent(raw);
  return cachedSnapshot;
}

/**
 * Snapshot for useSyncExternalStore.
 * Must return the same reference while underlying storage is unchanged.
 */
export function getConsentSnapshot(): CookieConsentState | null {
  return syncCacheFromStorage();
}

export function getServerConsentSnapshot(): CookieConsentState | null {
  return null;
}

export function subscribeConsent(onStoreChange: () => void) {
  if (!isBrowser()) return () => {};

  const handler = () => {
    // Invalidate cache before notifying React so the next getSnapshot re-reads.
    cachedRaw = undefined;
    onStoreChange();
  };

  window.addEventListener(CONSENT_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function writeFirstPartyCookie(value: CookieConsentState) {
  if (!isBrowser()) return;
  try {
    const compact = JSON.stringify({
      v: value.version,
      a: value.analytics ? 1 : 0,
      m: value.marketing ? 1 : 0,
    });
    const secure =
      typeof window.location !== "undefined" && window.location.protocol === "https:"
        ? "; Secure"
        : "";
    // No Domain attribute — works on both apex and www.
    document.cookie = `${COOKIE_CONSENT_COOKIE}=${encodeURIComponent(compact)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  } catch (error) {
    logConsentError("document.cookie", error);
  }
}

function notifyConsentListeners() {
  if (!isBrowser()) return;
  try {
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch (error) {
    logConsentError("dispatchEvent", error);
  }
}

export function writeConsent(partial: {
  analytics: boolean;
  marketing: boolean;
}): CookieConsentState {
  const next: CookieConsentState = {
    version: 1,
    necessary: true,
    analytics: Boolean(partial.analytics),
    marketing: Boolean(partial.marketing),
    updatedAt: new Date().toISOString(),
  };

  const serialized = JSON.stringify(next);

  if (isBrowser()) {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
    } catch (error) {
      logConsentError("localStorage.setItem", error);
    }
    writeFirstPartyCookie(next);
  }

  cachedRaw = serialized;
  cachedSnapshot = next;
  notifyConsentListeners();
  return next;
}

export function canLoadAnalytics(consent: CookieConsentState | null): boolean {
  return Boolean(consent?.analytics);
}

export function canLoadMarketing(consent: CookieConsentState | null): boolean {
  return Boolean(consent?.marketing);
}

/**
 * Safe optional analytics bootstrap. Currently a no-op.
 * Must never throw or navigate.
 */
export function initialiseOptionalIntegrations(consent: CookieConsentState) {
  try {
    if (!consent.analytics && !consent.marketing) return;
    // No third-party analytics/marketing vendors are integrated yet.
    // Future vendors must be loaded only after consent and wrapped in try/catch.
  } catch (error) {
    logConsentError("initialiseOptionalIntegrations", error);
  }
}
