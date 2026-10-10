import type { ReactNode } from "react";
import CopyEmail from "./copy-email";
import FounderPortrait from "./founder-portrait";
import Logo from "./logo";

// Layout: one 1120px column. Hero splits thesis | signal diagram; each section opens with a ruled head; contact closes on an inverted panel.

const labelBase = "font-sans text-[0.75rem] font-medium tracking-[0.14em] uppercase";
const label = `${labelBase} text-mute`;
const tag = "font-sans text-[0.6875rem] tracking-[0.14em] uppercase";
const subBase = "font-sans leading-[1.55] text-ink-2 max-w-[56ch]";
const sub = `${subBase} text-[1.0625rem]`;
const section = "border-t border-ink py-[clamp(56px,8vw,112px)]";
const block = "mt-[clamp(56px,8vw,96px)]";

function Brand({ className }: { className: string }) {
  return (
    <a
      href="#top"
      aria-label="Valence, back to top"
      className={`inline-flex items-center gap-2.5 font-serif tracking-[0.01em] no-underline ${className}`}
    >
      <Logo className="h-[0.95em] w-auto" />
      <span>Valence</span>
    </a>
  );
}

function SecHead({ id, name, title, children }: { id: string; name: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-[clamp(40px,6vw,72px)] grid grid-cols-[minmax(0,13rem)_minmax(0,1fr)] gap-x-10 gap-y-4 max-md:grid-cols-1">
      <p className={`${label} pt-[0.9rem] max-md:pt-0`}>{name}</p>
      <div className="grid min-w-0 gap-[18px]">
        <h2 id={id} className="max-w-[24ch] text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.016em]">
          {title}
        </h2>
        <p className={sub}>{children}</p>
      </div>
    </div>
  );
}

function BlockHead({ name, title, children }: { name: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-7 grid max-w-[60ch] gap-2.5">
      <p className={label}>{name}</p>
      <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.01em]">{title}</h3>
      {children && <p className={sub}>{children}</p>}
    </div>
  );
}

const signals = [
  "Market structure",
  "Price action",
  "Trend",
  "Momentum",
  "Volume",
  "Volatility",
  "Support & resistance",
  "Market sentiment",
  "Multi-timeframe",
];
// [delay, duration] per pulse, in seconds
const pulses = [
  [0, 3.6], [-2.2, 4.1], [-0.9, 3.2], [-3.1, 3.6], [-1.6, 4.4],
  [-2.7, 3.4], [-0.4, 3.9], [-1.9, 3.6], [-3.4, 4.2],
];
const wire = (y: number) => `M170 ${y} C252 ${y} 262 166 318 166`;

const reasons = [
  {
    title: "Why a language model",
    body: "A good trade rests on evidence that arrives in many forms at once: price structure, resting orders, liquidation clusters, funding, and how the largest traders are positioned. Fixed rules handle the numbers and miss the context. A person reads the context but tires, hesitates and drifts from the plan. Claude reads all of it on every decision, applies the same rulebook each time, and writes down its reasoning.",
  },
  {
    title: "The quantitative base",
    body: "Everything Claude sees is computed first, in tested code. We collect data from Binance, Bybit, OKX and Bitget and compute more than twenty indicators in-house, including ATR, cumulative volume delta and its divergences, open-interest delta, market structure, funding and basis. The key indicators update live as each candle forms and are checked against TradingView.",
  },
  {
    title: "Why low frequency suits Claude",
    body: "We trade a small number of high-conviction setups, and a setup can take hours or days to fill. At that pace a few seconds of model thinking costs nothing, so every decision gets the strongest Claude model and the full picture. The work that needs speed, watching price every second and sending orders, stays in code.",
  },
];

const steps = [
  { name: "Watch", by: "Code", body: "Fifteen detectors scan the data around the clock. Claude stays idle until one of them flags something worth a closer look, such as a break in market structure, a new 4-hour or daily candle, or price reaching a key level." },
  { name: "Read", by: "Claude", body: "Claude pulls the history and live readings it needs through tools, and reads the charts and market maps it asks for." },
  { name: "Plan", by: "Claude", body: "It writes a board. Each setup gets an entry band, a stop, targets, its odds of reaching the first target, and the exact conditions under which it may fire." },
  { name: "Hold", by: "Code", body: "A watcher checks those conditions every second, with no model in the loop. When an entry condition is met inside the band, fixed code sizes the position and places the order." },
  { name: "Manage", by: "Both", body: "In a trade, Claude sets warning and exit conditions. A warning wakes it to reassess. An exit condition closes the trade without waiting for the model." },
  { name: "Review", by: "Claude", body: "When the trade closes, Claude writes the journal entry and the desk returns to idle, ready for the next setup." },
];

const small = "text-[0.8125rem] text-mute";
const op = "text-mute";
const boardRows: [string, ReactNode][] = [
  ["Side", "Long"],
  ["Entry band", "61,200 – 61,500"],
  ["Stop", <>60,780 <small className={small}>below the support level</small></>],
  ["Target 1", <>63,750 <small className={small}>3.1R from the worst fill</small></>],
  ["Odds", <>34% <small className={small}>to reach T1 before the stop</small></>],
  [
    "Fires when",
    <>
      price trades inside the band<br />
      <span className={op}>then</span> 15m closes back above 61,200<br />
      <span className={op}>and</span> the 4h trend still holds
    </>,
  ],
  ["Disarm if", "4h closes below 60,780"],
];

const rules = [
  "One position at a time, on one account.",
  "Isolated margin only. Leverage is capped by our risk limits and is never set by the model.",
  "A setup cannot be armed without a stop on the correct side of its entry.",
  "An entry that fires outside its band is refused. We do not chase.",
  "Position size comes from fixed, reviewed code. The model’s only input to it is its odds.",
  "The protective close never waits for the model, and trading keys carry no withdrawal rights.",
];

const uses = [
  ["Research", "The trading method was refined on the Anantaka desk with Claude as the analyst, and the architecture was worked out in long design sessions with Claude."],
  ["Engineering", "The system is built with Claude Code. Features start as written design specs, and the repository carries its own working instructions for Claude."],
  ["Decisions", "In production Claude is the analyst. It runs through the Claude Agent SDK with tools, chart reading, and one continuous conversation for each trade."],
  ["Review", "We audit the system with Claude. The September review checked 22 findings against the code and set the order of fixes."],
  ["Learning", "Claude writes a journal entry for every trade, and the desk reviews what worked and what did not before the next one."],
];

// photoFocus is the object-position used when the portrait goes 16:10 on small screens
const founders: {
  initials: string;
  role: string;
  name: string;
  bio: string;
  linkedin: string;
  photo?: string;
  photoFocus?: string;
}[] = [
  {
    initials: "Futuh",
    photo: "/founders/futuh.jpeg",
    photoFocus: "50% 5%",
    role: "Founder · Quant & Product",
    name: "Futuh Nurmuntaha Alfahmi",
    bio: "Designed the trading method and the rules Valence runs on, and sets its risk limits. Has traded crypto markets since 2020, and is managing partner of Anantaka, a sister trading desk in Halven Group.",
    linkedin: "https://www.linkedin.com/in/futuh-nurmuntaha-alfahmi-4841201a3/",
  },
  {
    initials: "Uto",
    photo: "/founders/uto.jpg",
    photoFocus: "50% 25%",
    role: "Principal · Lead Programmer",
    name: "Ramadhan Agung Karyuto",
    bio: "Builds the data engine: the collectors for four exchanges, the indicator calculators, the live pipelines and the order path.",
    linkedin: "https://www.linkedin.com/in/rakaryuto/",
  },
  {
    initials: "Ian",
    photo: "/founders/ian.jpeg",
    photoFocus: "50% 10%",
    role: "Principal · DevOps & AI Engineer",
    name: "Afrian Luthfan",
    bio: "Runs the infrastructure and the Claude analyst: the servers, the browser scrapers, and the prompts, tools and guardrails the model works within.",
    linkedin: "https://www.linkedin.com/in/afrian-luthfan/",
  },
];

type Milestone = { time: string; datetime?: string; title: string; body: string; state?: "done" | "now" | "next" };
const timeline: Milestone[] = [
  { time: "2020", datetime: "2020", state: "done", title: "The founder starts trading crypto markets", body: "The trading experience that Valence is built on begins." },
  { time: "Jul 2024", datetime: "2024-07", state: "done", title: "Anantaka starts trading", body: "Anantaka, a sister desk in Halven Group, trades BTC perpetual futures with a written, rule-based framework. Claude later becomes the desk’s analyst." },
  { time: "Apr 2026", datetime: "2026-04", state: "done", title: "Work begins on automating the desk", body: "We compare three frontier AI models on the same desk data and start specifying the system." },
  { time: "5 May 2026", datetime: "2026-05-05", state: "done", title: "Engineering starts", body: "The three founders split the work across quant and product, data engineering, and AI engineering. The database schema and the first indicator pipelines ship." },
  { time: "27 Jun 2026", datetime: "2026-06-27", state: "done", title: "We choose Claude", body: "Claude reasoned the most systematically of the models we tested, so we dropped the multi-model design and built on Claude alone. The trade lifecycle is fixed: idle, setup, in trade, review." },
  { time: "Jul 2026", datetime: "2026-07", state: "done", title: "The data engine is complete", body: "Indicators from four exchanges are checked bar by bar against TradingView. The automation is designed around the Claude Agent SDK." },
  { time: "11 Aug 2026", datetime: "2026-08-11", state: "done", title: "The system becomes Valence", body: "Claude now writes the conditions for each trade in a form the machine can check, and a watcher holds them every second." },
  { time: "Sep 2026", datetime: "2026-09", state: "done", title: "Orders run on testnet", body: "Execution runs through a simulator and Binance testnet. On 30 September a full system review checks 22 findings against the code, with 1,591 tests passing." },
  { time: "Oct 2026", datetime: "2026-10", state: "now", title: "Entry and risk, rebuilt", body: "Entries and stops are redesigned around liquidity sweeps, and the review’s fixes land one by one." },
  { time: "Next", state: "next", title: "Live trading", body: "Valence goes live once the pre-live checklist from the review is cleared." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1120px]">
      <header className="flex flex-wrap items-center justify-between gap-6 py-[22px]">
        <Brand className="text-[1.375rem]" />
        <nav aria-label="Sections" className="flex flex-wrap gap-[clamp(14px,2.4vw,28px)] max-sm:gap-3.5">
          {["Approach", "Founders", "Timeline", "Contact"].map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="font-sans text-[0.8125rem] tracking-[0.06em] text-ink-2 no-underline hover:text-ink hover:underline"
            >
              {s}
            </a>
          ))}
        </nav>
      </header>

      {/* ===================== HERO ===================== */}
      <section
        id="top"
        aria-labelledby="hero-title"
        className="grid grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,72px)] pt-[clamp(40px,7vw,96px)] pb-[clamp(56px,8vw,112px)] max-lg:grid-cols-1"
      >
        <div className="grid min-w-0 gap-7">
          <p className={label}>Systematic trading · BTC perpetual futures</p>
          <h1 id="hero-title" className="text-[clamp(2.6rem,6.2vw,5.1rem)] leading-[1.02] font-[350] tracking-[-0.022em]">
            Claude makes the call. <em className="font-light italic">Code carries it out.</em>
          </h1>
          <p className={`${subBase} text-[clamp(1.0625rem,1.5vw,1.1875rem)]`}>
            Valence is a low-frequency trading system for Bitcoin perpetual futures. Code watches the market around the
            clock. When a setup forms, Claude reads the whole picture and writes the trade plan, and code then holds that
            plan exactly as written.
          </p>
          <dl className="mt-1 grid grid-cols-3 gap-5 border-t border-rule pt-[18px] max-sm:grid-cols-1 max-sm:gap-3">
            {[
              ["Built on", "Claude, by Anthropic"],
              ["Market", "BTCUSDT perpetual, Binance"],
              ["Stage", "Testing on Binance testnet"],
            ].map(([dt, dd]) => (
              <div key={dt} className="min-w-0">
                <dt className={`${tag} text-mute`}>{dt}</dt>
                <dd className="mt-1 font-sans text-[0.9375rem] text-ink">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="m-0 grid min-w-0 gap-[18px] max-lg:max-w-[600px]">
          <svg viewBox="0 0 452 332" role="img" aria-labelledby="bond-t bond-d" className="block h-auto w-full overflow-visible">
            <title id="bond-t">Many market signals combining into one decision</title>
            <desc id="bond-d">
              Market structure, price action, trend, momentum, volume, volatility, support and resistance, market sentiment
              and multi-timeframe context feed one node, Claude, which outputs a single trade plan.
            </desc>
            {signals.map((s, i) => {
              const y = 30 + i * 34;
              const [delay, duration] = pulses[i];
              return (
                <g key={s}>
                  <text x="158" y={y} textAnchor="end" className="fill-ink-2 font-mono text-[12.5px] [dominant-baseline:middle]">
                    {s}
                  </text>
                  <path d={wire(y)} className="fill-none stroke-rule-strong stroke-1" />
                  <path
                    d={wire(y)}
                    pathLength={100}
                    style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
                    className="animate-flow fill-none stroke-ink stroke-[1.6] [stroke-dasharray:3_97] [stroke-dashoffset:100] [stroke-linecap:round] motion-reduce:hidden"
                  />
                  <circle cx="168" cy={y} r="2.2" className="fill-ink-2" />
                </g>
              );
            })}
            <circle cx="330" cy="166" r="12" className="fill-paper stroke-ink stroke-[1.4]" />
            <circle cx="330" cy="166" r="5" className="fill-ink" />
            <g className="fill-ink font-sans text-[11px] font-semibold tracking-[0.16em]">
              <text x="330" y="197" textAnchor="middle">CLAUDE</text>
              <text x="441" y="150" textAnchor="end">PLAN</text>
            </g>
            <g className="fill-none stroke-ink stroke-[1.4]">
              <path d="M344 166 H440" />
              <path d="M434 160 L441 166 L434 172" />
            </g>
          </svg>
          <figcaption className="max-w-[46ch] border-l border-rule-strong pl-3.5 font-sans text-[0.875rem] leading-[1.55] text-mute">
            <b className="font-serif text-[1rem] font-medium text-ink italic">Valence</b>, in chemistry, is an atom’s
            combining power: how many bonds it can form. Our engine combines many market signals into one decision. Which signals we use, and how we weigh them, stay in-house.
          </figcaption>
        </figure>
      </section>

      {/* ===================== APPROACH ===================== */}
      <section id="approach" aria-labelledby="approach-title" className={section}>
        <SecHead id="approach-title" name="Approach" title="A language model as the analyst. A machine as the trader.">
          Why we put Claude at the center of a quantitative system, and how the model and the code divide the work.
        </SecHead>

        <div className="grid grid-cols-3 gap-[clamp(28px,4vw,48px)] max-md:grid-cols-1">
          {reasons.map((r) => (
            <article key={r.title} className="grid min-w-0 content-start gap-3 border-t border-rule pt-5">
              <h3 className="text-[1.375rem] leading-[1.25]">{r.title}</h3>
              <p className="text-ink-2">{r.body}</p>
            </article>
          ))}
        </div>

        <div className={block}>
          <BlockHead name="The decision loop" title="How one market event becomes a trade" />
          <ol className="grid grid-cols-3 border-t border-l border-rule max-lg:grid-cols-2 max-sm:grid-cols-1">
            {steps.map((s, i) => (
              <li key={s.name} className="grid min-w-0 content-start gap-2.5 border-r border-b border-rule px-[22px] pt-[22px] pb-[26px]">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.75rem] text-mute tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="font-serif text-[1.25rem] font-medium">{s.name}</h4>
                  <span className={`${tag} ml-auto ${s.by === "Claude" ? "text-ink" : "text-mute"}`}>{s.by}</span>
                </div>
                <p className="text-[1rem] leading-[1.55] text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>

          <figure className="mt-7 grid grid-cols-[minmax(0,1fr)_minmax(0,18rem)] items-start gap-[clamp(20px,4vw,48px)] max-lg:grid-cols-1">
            <div className="min-w-0 overflow-x-auto border border-rule bg-panel">
              <div className={`${tag} flex justify-between gap-3 border-b border-rule px-[18px] py-3 text-mute`}>
                <b className="font-semibold text-ink">Board · Setup A</b>
                <span>Illustrative</span>
              </div>
              <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-[22px] gap-y-[7px] px-[18px] pt-3.5 pb-[18px] font-mono text-[0.875rem] leading-[1.5] tabular-nums">
                {boardRows.map(([dt, dd]) => (
                  <div key={dt} className="contents">
                    <dt className="pt-[0.12em] text-[0.75rem] tracking-[0.04em] text-mute uppercase">{dt}</dt>
                    <dd className="min-w-0 text-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figcaption className="grid gap-2.5 font-sans text-[0.9375rem] leading-[1.55] text-ink-2">
              <span className={label}>What Claude hands to the machine</span>
              <span>
                Each row on a board is a complete, checkable plan. Claude writes it once, in advance. From then on the
                watcher decides only whether its conditions are true, so every trade can be traced back to reasoning
                written before any money moved.
              </span>
              <span>This row is an example made up for this page. It is not a live position or a signal.</span>
            </figcaption>
          </figure>
        </div>

        <div className={block}>
          <BlockHead name="House rules" title="Limits that hold whatever the model concludes" />
          <ul className="grid grid-cols-2 gap-x-[clamp(28px,5vw,64px)] max-md:grid-cols-1">
            {rules.map((r) => (
              <li
                key={r}
                className="grid min-w-0 grid-cols-[1.75rem_minmax(0,1fr)] gap-2 border-b border-rule py-[15px] before:mt-[0.55em] before:size-[9px] before:rotate-45 before:border-[1.4px] before:border-ink"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className={block}>
          <BlockHead name="Claude across the company" title="From the first design session to the trade journal">
            Claude has been part of every stage of the work since the beginning, from research to production.
          </BlockHead>
          <dl className="grid">
            {uses.map(([dt, dd]) => (
              <div
                key={dt}
                className="grid grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-x-10 gap-y-2 border-t border-rule py-5 last:border-b max-md:grid-cols-1"
              >
                <dt className="font-sans text-[0.9375rem] font-medium tracking-[0.02em]">{dt}</dt>
                <dd className="max-w-[62ch] text-ink-2">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ===================== FOUNDERS ===================== */}
      <section id="founders" aria-labelledby="founders-title" className={section}>
        <SecHead id="founders-title" name="Founders" title="A trader and two engineers">
          Valence was founded in 2026 by three principals. It is a Halven Group company.
        </SecHead>
        <div className="grid grid-cols-3 gap-[clamp(28px,4vw,44px)] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {founders.map((f) => (
            <article key={f.name} className="grid min-w-0 content-start gap-3.5">
              <FounderPortrait
                name={f.name}
                nickname={f.initials}
                linkedin={f.linkedin}
                photo={f.photo}
                photoFocus={f.photoFocus}
              />
              <p className={label}>{f.role}</p>
              <h3 className="text-[1.5rem] leading-[1.2]">{f.name}</h3>
              <p className="text-[1rem] leading-[1.55] text-ink-2">{f.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== TIMELINE ===================== */}
      <section id="timeline" aria-labelledby="timeline-title" className={section}>
        <SecHead id="timeline-title" name="Timeline" title="From a trading desk to a trading machine">
          Years of trading came first. The machine has been in engineering since May 2026.
        </SecHead>
        <ol className="relative before:absolute before:top-2 before:bottom-2 before:left-[calc(9.5rem+20px)] before:w-px before:bg-rule-strong max-md:before:left-[5px]">
          {timeline.map((m) => (
            <li
              key={m.time}
              className={`relative grid grid-cols-[9.5rem_minmax(0,1fr)] gap-10 pb-[34px] last:pb-0 before:absolute before:top-[0.62em] before:left-[calc(9.5rem+15px)] before:size-[11px] before:rounded-full before:border-[1.4px] before:border-ink max-md:grid-cols-1 max-md:gap-1 max-md:pl-[30px] max-md:before:top-[0.3em] max-md:before:left-0 ${
                m.state === "done" ? "before:bg-ink" : "before:bg-paper"
              } ${m.state === "next" ? "before:border-dashed" : ""}`}
            >
              <time
                dateTime={m.datetime}
                className="pt-[0.32em] text-right font-mono text-[0.8125rem] tracking-[0.04em] text-ink-2 tabular-nums max-md:pt-0 max-md:text-left"
              >
                {m.time}
              </time>
              <div className="grid max-w-[62ch] min-w-0 gap-1.5">
                <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-[1.3125rem] leading-[1.3]">
                  {m.title}
                  {m.state === "now" && (
                    <span className={`${tag} bg-solid px-2 pt-0.5 pb-[3px] text-on-solid`}>Now</span>
                  )}
                </h3>
                <p className="text-ink-2">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" aria-labelledby="contact-title" className={section}>
        <div className="grid gap-7 bg-solid p-[clamp(32px,6vw,72px)] text-on-solid">
          <p className={`${labelBase} text-on-solid-mute`}>Contact</p>
          <h2 id="contact-title" className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.016em]">
            Write to the founders
          </h2>
          <CopyEmail />
          <dl className="grid grid-cols-3 gap-[18px] border-t border-solid-rule pt-[22px] max-sm:grid-cols-1 max-sm:gap-3">
            {[
              ["Halven Group", "Valence"],
            ].map(([dt, dd]) => (
              <div key={dt}>
                <dt className={`${tag} text-on-solid-mute`}>{dt}</dt>
                <dd className="mt-1 font-sans text-[0.9375rem]">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-12 gap-y-5 pt-9 pb-12 max-md:grid-cols-1">
        <Brand className="justify-self-start self-start text-[1.125rem]" />
        <div className="font-sans text-[0.8125rem] leading-[1.6] text-mute">
          <p>© 2026 Valence. A Halven Group company.</p>
          <p>Nothing on this site is investment advice, a solicitation, or an offer of any financial product or service.</p>
        </div>
      </footer>
    </div>
  );
}
