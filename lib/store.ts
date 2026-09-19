"use client";

import { useSyncExternalStore } from "react";
import type { OccasionId, Size, StyleId } from "./data";
import { buildOutfit, DEFAULT_PREFS, type Prefs } from "./outfit";
import { getProducts } from "./products";

export interface LookResult {
  itemIds: string[];
  score: number;
  doneSecs: number;
}

/** Stored as ids, not text, so a saved look reads correctly in either language. */
export interface SavedLook {
  id: string;
  occasion: OccasionId | null;
  style: StyleId | undefined;
  size: Size;
  doneSecs: number;
  total: number;
  itemIds: string[];
}

const isSavedLook = (value: unknown): value is SavedLook =>
  typeof value === "object" &&
  value !== null &&
  Array.isArray((value as SavedLook).itemIds) &&
  typeof (value as SavedLook).doneSecs === "number";

interface AppState {
  prefs: Prefs;
  result: LookResult | null;
  /** Items in the most recent look, penalised when generating the next one. */
  lastIds: string[];
  savedLooks: SavedLook[];
  toast: string | null;
}

// The current challenge survives a refresh (sessionStorage); saved looks persist (localStorage).
const SESSION_KEY = "outfitin60:session";
const LOOKS_KEY = "outfitin60:looks";

const INITIAL: AppState = { prefs: DEFAULT_PREFS, result: null, lastIds: [], savedLooks: [], toast: null };

let state = INITIAL;
let loaded = false;
const listeners = new Set<() => void>();

function readJSON(storage: () => Storage, key: string): unknown {
  try {
    const raw = storage().getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJSON(storage: () => Storage, key: string, value: unknown) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the app still works in memory.
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const session = readJSON(() => sessionStorage, SESSION_KEY) as Partial<AppState> | null;
  const looks = readJSON(() => localStorage, LOOKS_KEY);
  const result = session?.result;
  state = {
    ...state,
    prefs: { ...DEFAULT_PREFS, ...session?.prefs },
    result: result && Array.isArray(result.itemIds) ? result : null,
    lastIds: Array.isArray(session?.lastIds) ? session.lastIds : [],
    savedLooks: Array.isArray(looks) ? looks.filter(isSavedLook) : [],
  };
}

function update(patch: Partial<AppState>) {
  ensureLoaded();
  state = { ...state, ...patch };
  if ("prefs" in patch || "result" in patch || "lastIds" in patch) {
    writeJSON(() => sessionStorage, SESSION_KEY, { prefs: state.prefs, result: state.result, lastIds: state.lastIds });
  }
  if ("savedLooks" in patch) writeJSON(() => localStorage, LOOKS_KEY, state.savedLooks);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

export const useAppState = () => useSyncExternalStore(subscribe, getSnapshot, () => INITIAL);

const noopSubscribe = () => () => {};

/** False during server render and hydration, true once browser storage has been read. */
export const useHydrated = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

/** Current answers, read at call time (event handlers can run before the next render). */
export const getPrefs = () => getSnapshot().prefs;

export const setPrefs = (patch: Partial<Prefs>) => update({ prefs: { ...getPrefs(), ...patch } });

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string) {
  clearTimeout(toastTimer);
  update({ toast: message });
  toastTimer = setTimeout(() => update({ toast: null }), 2200);
}

const newScore = () => 88 + Math.floor(Math.random() * 10);

function freshLookIds() {
  const { prefs, lastIds } = getSnapshot();
  return buildOutfit(prefs, lastIds).map((item) => item.id);
}

export function completeBuild(doneSecs: number) {
  const itemIds = freshLookIds();
  update({ result: { itemIds, score: newScore(), doneSecs }, lastIds: itemIds });
}

export function tryAnotherLook() {
  const { result } = getSnapshot();
  if (!result) return;
  const itemIds = freshLookIds();
  update({ result: { ...result, itemIds, score: newScore() }, lastIds: itemIds });
}

/** Saves the current result; the caller shows the (translated) toast. */
export function saveCurrentLook(): "saved" | "duplicate" | null {
  const { prefs, result, savedLooks } = getSnapshot();
  if (!result) return null;
  const key = result.itemIds.join("|");
  if (savedLooks.some((look) => look.itemIds.join("|") === key)) return "duplicate";
  const look: SavedLook = {
    id: String(Date.now()),
    occasion: prefs.occasion,
    style: prefs.styles[0],
    size: prefs.size ?? "M",
    doneSecs: result.doneSecs,
    total: getProducts(result.itemIds).reduce((sum, item) => sum + item.price, 0),
    itemIds: result.itemIds,
  };
  update({ savedLooks: [...savedLooks, look] });
  return "saved";
}

// "How It Works" from another page: land on "/" first, then the landing page scrolls down.
let pendingHowScroll = false;

export const requestHowScroll = () => {
  pendingHowScroll = true;
};

export function takeHowScroll() {
  const pending = pendingHowScroll;
  pendingHowScroll = false;
  return pending;
}
