import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours",
  description: "Explore available tours and experiences.",
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="flex flex-col w-full">{children}</section>;
}
