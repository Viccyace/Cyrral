import WaitlistForm from './WaitlistForm.jsx';

export default function FinalCta() {
  return (
    <section className="bg-plum text-bg" style={{ padding: 'clamp(56px,9vw,128px) clamp(20px,5vw,80px)' }}>
      <div className="mx-auto flex max-w-[620px] flex-col items-center text-center">
        <span className="mb-[18px] text-xs font-bold uppercase tracking-[0.14em] text-[rgba(255,209,217,0.85)]">
          Limited Early Access
        </span>
        <h2
          className="m-0 mb-4 font-serif font-semibold text-bg"
          style={{ fontSize: 'clamp(28px,4.2vw,44px)', lineHeight: 1.15, letterSpacing: '-0.015em', textWrap: 'balance' }}
        >
          Be the first through the door.
        </h2>
        <p
          className="mx-auto max-w-[30em] text-[rgba(252,249,248,0.82)]"
          style={{ margin: '0 0 clamp(28px,4vw,40px)', fontSize: 'clamp(16px,1.8vw,18px)', lineHeight: 1.6 }}
        >
          Spots open in small waves so we can welcome everyone properly. Add your email and we'll save your place.
        </p>

        <div className="w-full max-w-[420px]">
          <WaitlistForm variant="plum" />
        </div>

        <div className="mt-7 flex items-center gap-3">
          <div className="flex items-center">
            {['#ffd9df', '#ffdcc6', '#caebc9'].map((color, i) => (
              <span
                key={color}
                className="h-[30px] w-[30px] rounded-full border-2 border-plum"
                style={{ background: color, marginLeft: i === 0 ? 0 : -10 }}
              />
            ))}
          </div>
          <p className="m-0 text-[13.5px] text-[rgba(252,249,248,0.82)]">
            Joining <strong className="font-semibold text-bg">2,300+</strong> women already waiting
          </p>
        </div>
      </div>
    </section>
  );
}
