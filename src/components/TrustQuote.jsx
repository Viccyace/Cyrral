export default function TrustQuote() {
  return (
    <section style={{ padding: '0 clamp(20px,5vw,80px) clamp(56px,9vw,120px)' }}>
      <div
        className="reveal mx-auto max-w-[880px] border-y border-[#D7C1C4]/60 text-center"
        style={{ padding: 'clamp(48px,7vw,88px) clamp(8px,3vw,24px)' }}
      >
        <blockquote
          className="m-0 mb-5 font-serif italic font-medium text-primary-light"
          style={{ fontSize: 'clamp(24px,3.6vw,38px)', lineHeight: 1.28, letterSpacing: '-0.01em', textWrap: 'balance' }}
        >
          &ldquo;Cyrral was created alongside women who live this every day — and the carers who walk beside
          them.&rdquo;
        </blockquote>
        <p className="mx-auto my-0 max-w-[36em] text-base leading-relaxed text-ink-soft">
          We believe menopause isn't a problem to be solved, but a transition to be supported with dignity and
          intelligence.
        </p>
      </div>
    </section>
  );
}
