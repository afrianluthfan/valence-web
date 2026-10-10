"use client";

import { useRef, useState } from "react";

const address = "founders@valence-quant.art";

export default function CopyEmail() {
  const link = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState("");

  function fallback() {
    try {
      const range = document.createRange();
      range.selectNodeContents(link.current!);
      const sel = window.getSelection()!;
      sel.removeAllRanges();
      sel.addRange(range);
    } catch {}
    setStatus("Address selected. Press Ctrl+C or ⌘C to copy.");
  }

  function copy() {
    if (!navigator.clipboard?.writeText) return fallback();
    navigator.clipboard.writeText(address).then(() => setStatus("Copied to your clipboard."), fallback);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3.5">
        <a
          ref={link}
          href={`mailto:${address}`}
          className="font-serif text-[clamp(1.4rem,3.6vw,2.5rem)] font-normal wrap-anywhere text-on-solid"
        >
          {address}
        </a>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer border border-on-solid bg-transparent px-4 py-[9px] font-sans text-[0.8125rem] tracking-[0.08em] text-on-solid uppercase hover:bg-on-solid hover:text-solid focus-visible:outline-on-solid"
        >
          Copy address
        </button>
      </div>
      <p aria-live="polite" className="min-h-[1.4em] font-sans text-[0.875rem] text-on-solid-mute">
        {status}
      </p>
    </>
  );
}
