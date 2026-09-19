import type { Metadata } from "next";
import { CommunityGrid } from "@/components/community/community-grid";

export const metadata: Metadata = {
  title: "Community",
};

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-[760px] animate-fade-up-fast px-6 py-10">
      <div className="text-center">
        <h1 className="text-[30px] font-extrabold tracking-[-0.5px]">OutfitIn60 Community</h1>
        <p className="mt-1.5 text-[14px] text-muted">See how other people completed their look.</p>
      </div>
      <CommunityGrid />
    </main>
  );
}
