import BrandMark from './BrandMark.jsx';

export default function Header() {
  return (
    <header
      className="sticky z-50 flex items-center justify-between gap-4 rounded-full border border-[#D7C1C4]/55
        bg-[#FCF9F8]/85 backdrop-blur-md shadow-[0px_8px_28px_rgba(45,45,45,0.08)]"
      style={{ top: 20, margin: '20px clamp(20px,5vw,80px) 0', padding: '14px 16px 14px clamp(20px,3vw,28px)' }}
    >
      <a href="#" className="inline-flex items-center gap-2 font-serif text-2xl font-semibold text-brand tracking-tight no-underline">
        <BrandMark className="w-6 h-6 flex-none" />
        Cyrral
      </a>
      <a
        href="#waitlist"
        className="inline-flex items-center gap-1.5 rounded-full border border-[#D7C1C4]/90 px-4 py-2.5
          font-sans text-sm font-semibold text-primary no-underline transition-colors hover:bg-white hover:border-primary-light"
      >
        Join the waitlist
      </a>
    </header>
  );
}
