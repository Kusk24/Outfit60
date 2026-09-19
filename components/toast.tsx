"use client";

import { useAppState } from "@/lib/store";

export function Toast() {
  const { toast } = useAppState();

  return (
    <div role="status" aria-live="polite">
      {toast && (
        <div
          key={toast}
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 animate-toast bg-ink px-6 py-3 text-center text-[13px] font-bold text-white"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
