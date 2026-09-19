"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Every screen change starts at the top, like the prototype's go(screen). */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
