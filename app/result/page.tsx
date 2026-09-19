import type { Metadata } from "next";
import { ResultScreen } from "@/components/result/result-screen";

export const metadata: Metadata = {
  title: "Your Look Is Ready",
};

export default function ResultPage() {
  return <ResultScreen />;
}
