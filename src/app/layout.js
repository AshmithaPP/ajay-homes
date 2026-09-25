import { Montserrat } from "next/font/google";
import "./globals.css";
import FloatingChat from "@/components/FloatingChat";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Ajay Homes & Estates | Architecture • Construction • Luxury",
  description:
    "From site groundbreaking to bespoke luxury residences, Ajay Homes & Estates delivers engineering-grade architectural construction across South India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-slate-900 flex flex-col font-sans">
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
