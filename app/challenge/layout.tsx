import type { Metadata } from "next";
import { FlowShell } from "@/components/challenge/flow-shell";

export const metadata: Metadata = {
  title: "Outfit Challenge",
};

export default function ChallengeLayout({ children }: LayoutProps<"/challenge">) {
  return <FlowShell>{children}</FlowShell>;
}
