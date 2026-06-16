import WaitlistForm from './WaitlistForm.jsx';

const AVATAR_COLORS = ['#ffd9df', '#ffdcc6', '#caebc9', '#d7c1c4'];

export default function Hero() {
  return (
    <section className="relative" style={{ padding: 'clamp(48px,7vw,104px) clamp(20px,5vw,80px) clamp(56px,8vw,112px)' }}>
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] z-0 -translate-x-1/2"
        style={{
          width: 'min(760px,120%)',
          height: 560,
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(246,243,242,0.9) 0%, rgba(252,249,248,0) 70%)',
        }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-[1180px] flex-wrap items-center"
        style={{ gap: 'clamp(36px,5vw,72px)' }}
      >
        <div className="flex-[1_1_380px]" style={{ minWidth: 'min(100%,340px)' }}>
          <span className="reveal mb-5 block text-xs font-bold uppercase tracking-[0.14em] text-secondary">
            Perimenopause &amp; Menopause, Understood
          </span>
          <h1
            className="reveal m-0 mb-[22px] font-serif font-semibold text-ink"
            style={{ fontSize: 'clamp(31px,5.1vw,56px)', lineHeight: 1.08, letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            The chapter no one prepared you for — finally, a companion who gets it.
          </h1>
          <p
            className="reveal m-0 max-w-[30em] text-ink-soft"
            style={{ fontSize: 'clamp(16px,1.9vw,19px)', lineHeight: 1.62, textWrap: 'pretty' }}
          >
            Cyrral helps you track what you're feeling, understand the patterns behind it, and finally put words to
            what your body is going through.
          </p>

          <div className="reveal max-w-[460px]" style={{ marginTop: 'clamp(28px,4vw,40px)' }}>
            <WaitlistForm id="waitlist" withStage />
          </div>

          <div className="reveal mt-7 flex items-center gap-3.5">
            <div className="flex items-center">
              {AVATAR_COLORS.map((color, i) => (
                <span
                  key={color}
                  className="h-[34px] w-[34px] rounded-full border-[2.5px] border-bg"
                  style={{ background: color, marginLeft: i === 0 ? 0 : -12 }}
                />
              ))}
            </div>
            <p className="m-0 text-sm leading-snug text-ink-soft">
              Join <strong className="font-semibold text-ink">2,300+</strong> women already on the early list
            </p>
          </div>
        </div>

        <div className="reveal flex flex-[0_1_400px] justify-center" style={{ minWidth: 'min(100%,280px)' }}>
          <div className="w-full max-w-[380px]" style={{ transform: 'rotate(2deg)' }}>
            <div
              className="floaty relative w-full overflow-hidden rounded-3xl"
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(160deg,#f6efe6,#efe6e8)',
                boxShadow: '0px 18px 50px rgba(45,45,45,0.14)',
              }}
            >
              <img
                alt="Editorial portrait of a woman embracing her journey through menopause"
                src="https://lh3.googleusercontent.com/aida/AP1WRLtKWyFunLDVM9pKzbaR641RNRgVCVCKiHKi5nI5sXJ5f4ADahrcV9qflV8LI-JGUonWri3QCZjTebGqbomAokull0OlrDktfe3OeS_97w4V8bfctnpcXMfevWGVY_5oyKkDu-GGu4_KYLaORZBRuA5CxMq_0MjdpAJ2XiKkppzHOrH3GKWy-npXP0elNhWASKwt3jgCOOgVq2DukfjwNIwuVcQD6nLFqoCSaZMBoIm8Wcclw4-4R_qncmY"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 px-5 pb-[18px] pt-[22px]"
                style={{ background: 'linear-gradient(to top, rgba(251,247,239,0.96), rgba(251,247,239,0))' }}
              >
                <span
                  className="font-serif italic font-semibold text-primary-light"
                  style={{ fontSize: 'clamp(18px,2.4vw,22px)', letterSpacing: '0.04em' }}
                >
                  Embrace your journey
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
