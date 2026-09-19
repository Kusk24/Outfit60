"use client";

import { useEffect } from "react";
import { scrollToHow } from "@/lib/scroll";
import { takeHowScroll } from "@/lib/store";

/** Finishes a "How It Works" click made on another page, once the landing page is on screen. */
export function HowScrollOnArrival() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (takeHowScroll()) scrollToHow();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
