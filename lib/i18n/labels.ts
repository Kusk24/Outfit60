import type { OccasionId, StyleId } from "../data";
import type { Dictionary } from "./en";

export const occShort = (dict: Dictionary, occasion: OccasionId | null) =>
  occasion ? dict.occasions[occasion].short : dict.occasions.other.short;

export const styleName = (dict: Dictionary, style: StyleId | undefined) => dict.styles[style ?? "minimal"].title;
