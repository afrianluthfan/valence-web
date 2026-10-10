"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

type Props = {
  name: string;
  nickname: string;
  linkedin: string;
  photo?: string;
  photoFocus?: string;
};

// Mouse hover opens the popup and leaving closes it. A click or tap on the photo opens it;
// "Not now", Escape or a tap outside closes it. The popup sits inside the photo at its bottom-right
// corner, and slides in from the right.
export default function FounderPortrait({ name, nickname, linkedin, photo, photoFocus }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const popupId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function show() {
    setOpen(true);
  }

  function onEnter(e: PointerEvent) {
    if (e.pointerType === "mouse") show();
  }

  function onLeave(e: PointerEvent) {
    if (e.pointerType === "mouse") setOpen(false);
  }

  function dismiss() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onKeyDown={(e) => e.key === "Escape" && open && dismiss()}
      onBlur={(e) => !wrap.current?.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={`${name}, LinkedIn profile`}
        aria-expanded={open}
        aria-controls={popupId}
        onClick={show}
        className="group relative grid aspect-[4/5] w-full cursor-default items-end justify-items-start overflow-hidden bg-solid p-[18px] text-left text-on-solid max-sm:aspect-[16/10]"
      >
        {photo && (
          <>
            <Image
              src={photo}
              alt=""
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 360px"
              style={{ objectPosition: photoFocus }}
              className={`object-cover brightness-100 contrast-105 grayscale transition-[scale,filter] duration-[200ms,200ms] group-hover:brightness-75 ease-out motion-reduce:transition-none ${
                open ? "scale-[1.04]" : ""
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-solid/85 to-transparent to-55%" />
          </>
        )}
        <span className="relative font-serif text-[clamp(3.4rem,7vw,5.4rem)] leading-[0.9] font-light tracking-[-0.03em]">
          {nickname}
        </span>
      </button>

      <div
        id={popupId}
        role="group"
        aria-label={`Visit ${nickname}’s LinkedIn profile`}
        inert={!open}
        className={`absolute right-3 bottom-3 z-10 grid w-[min(18rem,calc(100%-1.5rem))] gap-3 border border-rule-strong bg-paper p-4 text-ink transition-[translate,opacity,visibility] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
          open ? "visible translate-x-0 opacity-100" : "invisible translate-x-6 opacity-0"
        }`}
      >
        <p className="font-sans text-[0.6875rem] tracking-[0.14em] text-mute uppercase">LinkedIn</p>
        <p className="font-serif text-[1.125rem] leading-[1.3]">Visit {nickname}’s LinkedIn profile?</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener"
            className="bg-ink px-3 py-[7px] font-sans text-[0.75rem] tracking-[0.08em] text-paper uppercase no-underline hover:opacity-85"
          >
            Visit profile ↗
          </a>
        </div>
      </div>
    </div>
  );
}
