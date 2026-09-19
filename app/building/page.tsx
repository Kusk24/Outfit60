import type { Metadata } from "next";
import { BuildingScreen } from "@/components/building/building-screen";

export const metadata: Metadata = {
  title: "Building your look",
};

export default function BuildingPage() {
  return <BuildingScreen />;
}
