export default function BrandMark({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M5 13.5 A11 11 0 1 0 16 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4.5" fill="currentColor" />
    </svg>
  );
}
