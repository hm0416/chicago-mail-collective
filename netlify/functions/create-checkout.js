// Creates a Stripe Checkout session for a recurring $10 / every-2-months subscription.
import Stripe from 'stripe'

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  let b
  try { b = await req.json() } catch { return Response.json({ error: 'bad request' }, { status: 400 }) }
  if (!b.email || !b.first || !b.last || !b.a1 || !b.city || !b.st || !b.zip) {
    return Response.json({ error: 'missing fields' }, { status: 400 })
  }
  const origin = process.env.URL || new URL(req.url).origin
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: b.email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: 1000,
          recurring: { interval: 'month', interval_count: 2 },
          product_data: { name: 'Chicago Mail Collective: printed issue every other month' },
        },
      }],
      metadata: { name: `${b.first} ${b.last}`, address: b.address || '' },
      subscription_data: { metadata: { name: `${b.first} ${b.last}`, address: b.address || '' } },
      success_url: `${origin}/subscribe/success`,
      cancel_url: `${origin}/subscribe`,
    })
    return Response.json({ url: session.url })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'stripe error' }, { status: 500 })
  }
}
