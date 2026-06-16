import BrandMark from './BrandMark.jsx';
import { TikTokIcon, FacebookIcon, InstagramIcon } from './SocialIcons.jsx';

const SOCIALS = [
  { href: 'https://www.tiktok.com/@cyrralapp', label: 'Cyrral on TikTok', Icon: TikTokIcon },
  { href: 'https://www.facebook.com/cyrralapp', label: 'Cyrral on Facebook', Icon: FacebookIcon },
  { href: 'https://www.instagram.com/cyrralapp', label: 'Cyrral on Instagram', Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer
      className="flex flex-col items-center gap-4 border-t border-[#D7C1C4]/60 bg-bg text-center"
      style={{ padding: 'clamp(48px,7vw,88px) clamp(20px,5vw,80px)' }}
    >
      <div className="inline-flex items-center gap-2 font-serif text-2xl font-semibold text-brand">
        <BrandMark className="w-6 h-6 flex-none" />
        Cyrral
      </div>
      <p className="m-0 max-w-[24em] text-[15px] leading-snug text-ink-soft">
        A companion for perimenopause and menopause.
      </p>

      <div className="flex gap-3">
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#D7C1C4]/90 text-primary transition-all hover:-translate-y-0.5 hover:border-primary-light hover:bg-white hover:text-primary-light"
          >
            <Icon />
          </a>
        ))}
      </div>

      <div className="mt-1 flex gap-6 text-xs font-semibold tracking-wide">
        <a href="#" className="text-ink-soft no-underline transition-colors hover:text-secondary">
          Privacy
        </a>
        <a href="#" className="text-ink-soft no-underline transition-colors hover:text-secondary">
          Contact
        </a>
      </div>
      <div className="mt-2 text-xs tracking-wide text-ink-faint">© 2026 Cyrral. Made with care.</div>
    </footer>
  );
}
