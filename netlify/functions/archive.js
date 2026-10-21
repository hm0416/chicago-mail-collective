// Server-side paywall check: only returns the issue PDF links if the code is right.
export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  let code = ''
  try { code = (await req.json()).code || '' } catch {}
  const secret = process.env.SUBSCRIBER_CODE
  if (!secret || code.trim() !== secret) {
    return Response.json({ error: 'invalid' }, { status: 401 })
  }
  return Response.json({ pdfs: { 1: process.env.ISSUE_1_PDF || '', 2: process.env.ISSUE_2_PDF || '' } })
}
