import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  // System mono stack for glyphs Plex Mono lacks, in place of the size-adjusted Arial next/font generates
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

const description =
  "Valence is a low-frequency trading system for Bitcoin perpetual futures. Claude makes the call; deterministic code watches the market and carries it out.";

export const metadata: Metadata = {
  title: "Valence",
  description,
  openGraph: {
    type: "website",
    title: "Valence",
    description,
    url: "https://valence.web.id/",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="overflow-x-clip bg-paper px-[clamp(16px,4vw,40px)] font-serif text-[1.0625rem] leading-[1.6] text-ink antialiased [text-rendering:optimizeLegibility]">
        {children}
      </body>
    </html>
  );
}
