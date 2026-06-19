import { useState } from 'react';
import { supabase } from '../lib/supabase.js';

// Welcome emails are deferred until a sending domain is verified in Resend.
// Until then this stays off, so signups don't trigger failed Resend calls.
// To turn it back on: set VITE_SEND_WELCOME_EMAIL=true (Vercel env var) and redeploy.
const SEND_WELCOME_EMAIL = import.meta.env.VITE_SEND_WELCOME_EMAIL === 'true';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const STAGES = [
  { value: 'perimenopause', label: 'Perimenopause' },
  { value: 'menopause', label: 'Menopause' },
  { value: 'post-menopause', label: 'Post-menopause' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export default function WaitlistForm({ id, variant = 'default', withStage = false }) {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const isPlum = variant === 'plum';

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    const { error } = await supabase.from('waitlist').insert({ email, stage });

    // 23505 = unique_violation: she's already on the list. Treat as success, just don't re-send the welcome email.
    if (error && error.code !== '23505') {
      console.error('Waitlist insert failed:', error);
      setStatus('error');
      setErrorMsg("Something went wrong on our end — mind trying again?");
      return;
    }

    setStatus('success');

    // Only fire the welcome email when enabled AND this was a fresh signup (not a duplicate).
    if (SEND_WELCOME_EMAIL && !error) {
      supabase.functions.invoke('send-welcome-email', { body: { email } }).catch((err) => {
        console.error('Welcome email failed to send:', err);
      });
    }
  }

  if (status === 'success') {
    return (
      <div
        id={id}
        className={
          isPlum
            ? 'flex items-center justify-center gap-3 rounded-[18px] border border-white/[0.18] bg-white/[0.08] px-[22px] py-5'
            : 'flex items-start gap-3.5 rounded-[18px] border border-[#D7C1C4]/60 bg-white px-[22px] py-5 shadow-[0px_4px_20px_rgba(45,45,45,0.06)]'
        }
      >
        <span className="material-symbol flex h-10 w-10 flex-none items-center justify-center rounded-full bg-sage text-2xl text-sage-ink">
          check
        </span>
        <div className={isPlum ? 'text-left' : ''}>
          <div className={`font-serif text-lg font-semibold ${isPlum ? 'text-bg' : 'text-ink'}`}>
            You&rsquo;re on the list.
          </div>
          <div className={isPlum ? 'text-[13.5px] text-bg/80' : 'text-sm leading-relaxed text-ink-soft'}>
            {isPlum
              ? 'Look out for one quiet note from us soon.'
              : "We'll send one quiet note the moment your spot opens. Welcome — you're not in this alone."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          isPlum
            ? 'h-14 w-full rounded-none border-0 border-b-[1.5px] border-white/40 bg-transparent px-0.5 py-2 text-center font-sans text-base text-bg outline-none transition-colors focus:border-bg'
            : 'h-14 w-full rounded-none border-0 border-b-[1.5px] border-hairline bg-transparent px-0.5 py-2 font-sans text-base text-ink outline-none transition-colors focus:border-primary'
        }
      />

      {withStage && (
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Where are you in this? <span className="font-normal normal-case">(optional)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStage((current) => (current === s.value ? null : s.value))}
                className={`rounded-full border px-3 py-1.5 font-sans text-[13px] transition-colors ${
                  stage === s.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-hairline text-ink-soft hover:border-primary-light'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={
          isPlum
            ? 'h-14 w-full rounded-2xl bg-bg font-sans text-[15px] font-semibold text-primary shadow-[0px_8px_24px_rgba(0,0,0,0.22)] transition hover:bg-white active:scale-[0.985] disabled:opacity-70'
            : 'h-14 w-full rounded-2xl bg-primary font-sans text-[15px] font-semibold text-white shadow-[0px_6px_22px_rgba(110,48,65,0.22)] transition hover:bg-primary-hover hover:shadow-[0px_10px_28px_rgba(110,48,65,0.28)] active:scale-[0.985] disabled:opacity-70'
        }
      >
        {status === 'submitting' ? 'Joining…' : 'Join the early list'}
      </button>

      {status === 'error' ? (
        <p className={`m-0 text-sm ${isPlum ? 'text-bg/90' : 'text-primary'}`}>{errorMsg}</p>
      ) : (
        !isPlum && (
          <p className="m-0 text-[12.5px] italic text-ink-faint">No spam, ever. Just one note when we're ready for you.</p>
        )
      )}
    </form>
  );
}
