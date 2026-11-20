"use client";

import { useCallback, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";

/**
 * Saved properties ("shortlist"), kept in this browser's localStorage (no account, nothing sent anywhere).
 * Works when storage is blocked (private window etc.): the shortlist then lasts for the page visit only.
 */
const KEY = "nh-shortlist";
const EVENT = "nh-shortlist-change";
const EMPTY: readonly string[] = [];

let current: readonly string[] = EMPTY;
let loaded = false;

function load(): readonly string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : EMPTY;
  } catch {
    return current;
  }
}

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  if (!loaded) {
    current = load();
    loaded = true;
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = load();
      cb();
    }
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => current;
const getServerSnapshot = () => EMPTY;

export const listingKey = (category: string, slug: string) => `${category}/${slug}`;

export function useShortlist() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((key: string) => {
    const has = current.includes(key);
    current = has ? current.filter((k) => k !== key) : [...current, key];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(current));
    } catch {
      /* storage blocked: keep it in memory for this visit */
    }
    track(has ? "Shortlist removed" : "Shortlist added");
    emit();
  }, []);

  return { items, has: (key: string) => items.includes(key), toggle, count: items.length };
}
