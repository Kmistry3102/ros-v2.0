import { Metadata } from "next";
import AssestClient from "@/component/dashboard/main/assests/AssestClient";

export const metadata: Metadata = {
  title: "Assets",
};

export default function AssetsPage() {
  return <AssestClient />;
}