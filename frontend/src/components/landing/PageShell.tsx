import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-[#0A0D2C] antialiased">
      <Header />
      <main className="pt-32 pb-24">{children}</main>
      <Footer />
    </div>
  );
}
