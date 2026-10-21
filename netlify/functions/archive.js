// Server-side paywall check: only returns the issue PDF links if the code is right.
// Admin-uploaded PDFs live in a private Supabase bucket; we hand out short-lived signed links.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jytninegbyjqglowlfai.supabase.co'

async function signedLink(id) {
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!key) return ''
  const r = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/issues/issue-${id}.pdf`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ expiresIn: 3600 }),
  })
  if (!r.ok) return ''
  const { signedURL } = await r.json()
  return signedURL ? `${SUPABASE_URL}/storage/v1${signedURL}` : ''
}

// Valid Supabase login token means an invited admin (sign-ups are disabled).
async function isAdmin(token) {
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!token || !key) return false
  const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { Authorization: `Bearer ${token}`, apikey: key } })
  return r.ok
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  let code = ''
  let token = ''
  try { ({ code = '', token = '' } = await req.json()) } catch {}
  const secret = process.env.SUBSCRIBER_CODE
  if (!(await isAdmin(token)) && (!secret || code.trim() !== secret)) {
    return Response.json({ error: 'invalid' }, { status: 401 })
  }
  const [a, b] = await Promise.all([signedLink(1), signedLink(2)])
  return Response.json({ pdfs: { 1: a || process.env.ISSUE_1_PDF || '', 2: b || process.env.ISSUE_2_PDF || '' } })
}
