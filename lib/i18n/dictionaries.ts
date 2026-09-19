import type { Locale } from "./config";
import { en, type Dictionary } from "./en";
import { th } from "./th";

const DICTIONARIES: Record<Locale, Dictionary> = { en, th };

export const getDictionary = (lang: Locale) => DICTIONARIES[lang];

export type { Dictionary };
