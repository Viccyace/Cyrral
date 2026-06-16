const FEATURES = [
  {
    icon: 'edit_note',
    bg: '#ffd9df',
    fg: '#6e3041',
    title: 'Track what matters',
    body: 'Log symptoms, moods, and sleep in seconds — no clinical jargon, no judgement.',
  },
  {
    icon: 'insights',
    bg: '#ffdcc6',
    fg: '#85522D',
    title: 'See the patterns',
    body: 'Cyrral gently surfaces the connections in your own data, so nothing feels random anymore.',
  },
  {
    icon: 'chat_bubble',
    bg: '#caebc9',
    fg: '#2f4b32',
    title: 'Find the words',
    body: "Walk into your next appointment able to explain exactly what's happening — and be taken seriously.",
  },
];

export default function Features() {
  return (
    <section
      className="border-y border-[#D7C1C4]/40 bg-surface-low"
      style={{ padding: 'clamp(56px,9vw,120px) clamp(20px,5vw,80px)' }}
    >
      <div className="mx-auto max-w-[1180px]">
        <h2
          className="reveal mx-auto mb-[clamp(40px,5vw,68px)] max-w-[16em] text-center font-serif font-semibold text-ink"
          style={{ fontSize: 'clamp(27px,4vw,42px)', lineHeight: 1.18, letterSpacing: '-0.015em', textWrap: 'balance' }}
        >
          If you've felt dismissed, you're not alone.
        </h2>
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 'clamp(18px,2.5vw,28px)' }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="reveal flex flex-col gap-4 rounded-3xl border border-[#D7C1C4]/35 bg-white shadow-[0px_4px_20px_rgba(45,45,45,0.06)] transition-all hover:-translate-y-1.5 hover:shadow-[0px_16px_36px_rgba(45,45,45,0.10)]"
              style={{ padding: 'clamp(24px,3vw,32px)' }}
            >
              <span
                className="material-symbol flex h-12 w-12 items-center justify-center rounded-full text-[26px]"
                style={{ background: f.bg, color: f.fg }}
              >
                {f.icon}
              </span>
              <h3 className="m-0 font-serif text-[22px] font-semibold text-ink">{f.title}</h3>
              <p className="m-0 text-base leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
