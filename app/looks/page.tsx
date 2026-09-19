import type { Metadata } from "next";
import { SavedLooks } from "@/components/looks/saved-looks";

export const metadata: Metadata = {
  title: "My Looks",
};

export default function LooksPage() {
  return (
    <main className="mx-auto w-full max-w-[560px] animate-fade-up-fast px-6 py-10">
      <h1 className="text-[30px] font-extrabold tracking-[-0.5px]">My Looks</h1>
      <SavedLooks />
    </main>
  );
}
