"use client";

import { useEffect } from "react";

const visitSessionKey = "portfolio_visit_tracked";

export function VisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(visitSessionKey)) return;
    sessionStorage.setItem(visitSessionKey, "true");

    const payload = JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      language: navigator.language || "",
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/visit", new Blob([payload], { type: "application/json" }));
      return;
    }

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      sessionStorage.removeItem(visitSessionKey);
    });
  }, []);

  return null;
}
