// Stripe calls this after a payment. A subscriber only counts once Stripe says they paid.
import Stripe from 'stripe'

export default async (req) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const raw = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(raw, req.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return new Response('Bad signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed' && event.data.object.payment_status === 'paid') {
    const s = event.data.object
    const to = process.env.NOTIFY_EMAIL || 'hifamousou@gmail.com'
    const text = [
      'New paid subscriber for the Chicago Mail Collective.',
      '',
      `Name: ${s.metadata?.name || ''}`,
      `Email: ${s.customer_details?.email || s.customer_email || ''}`,
      `Mailing address: ${s.metadata?.address || ''}`,
      `Paid: $${(s.amount_total / 100).toFixed(2)} (recurring every 2 months)`,
      `Stripe payment: ${s.id}`,
    ].join('\n')
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Chicago Mail Collective <onboarding@resend.dev>', to: [to], subject: `New paid subscriber: ${s.metadata?.name || ''}`, text }),
    })
    if (!r.ok) return new Response('Email failed', { status: 500 }) // Stripe will retry
  }
  return new Response('ok')
}
