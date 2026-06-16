// Supabase Edge Function: sends the Cyrral welcome email via Resend.
// Secrets (set with `supabase secrets set`, never committed): RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function buildWelcomeEmailHtml() {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#FCF9F8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FCF9F8;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" style="max-width:480px;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;color:#A86040;letter-spacing:-0.01em;padding-bottom:28px;">
                Cyrral
              </td>
            </tr>
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;font-weight:600;color:#1B1C1C;padding-bottom:18px;">
                You&rsquo;re on the list.
              </td>
            </tr>
            <tr>
              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#524346;padding-bottom:16px;">
                Thank you for joining the Cyrral waitlist. We&rsquo;re building this slowly and carefully &mdash; and you&rsquo;ll be among the first in when it&rsquo;s ready.
              </td>
            </tr>
            <tr>
              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#524346;padding-bottom:16px;">
                While you&rsquo;re here &mdash; what&rsquo;s the hardest part of this chapter for you right now? Just hit reply and tell me. A real person reads every message.
              </td>
            </tr>
            <tr>
              <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1B1C1C;padding-top:8px;padding-bottom:28px;">
                Warmly,<br/>
                <span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;color:#6e3041;">The Cyrral team</span>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #D7C1C4;padding-top:16px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#857375;">
                You&rsquo;re receiving this because you joined the Cyrral waitlist. Reply STOP to leave the list.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const EMAIL_FROM = Deno.env.get('EMAIL_FROM');
    const EMAIL_REPLY_TO = Deno.env.get('EMAIL_REPLY_TO');

    if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_REPLY_TO) {
      console.error('Missing RESEND_API_KEY, EMAIL_FROM, or EMAIL_REPLY_TO secret.');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Cyrral <${EMAIL_FROM}>`,
        to: [email],
        reply_to: EMAIL_REPLY_TO,
        subject: "You're in",
        html: buildWelcomeEmailHtml(),
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error('Resend API error:', resendRes.status, detail);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-welcome-email error:', err);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
