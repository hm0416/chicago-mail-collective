import { useState } from 'react'
import { EMAIL, PRICE } from '../config.js'

const empty = { first: '', last: '', email: '', a1: '', a2: '', city: '', st: '', zip: '' }

// The subscriber fills in their info, then pays on Stripe's secure checkout page.
// They are only subscribed once Stripe confirms the payment (see netlify/functions/stripe-webhook.js).
export default function Subscribe() {
  const [f, setF] = useState(empty)
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const address = [f.a1, f.a2].filter(Boolean).join(', ') + `, ${f.city}, ${f.st} ${f.zip}`

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setFail(false)
    try {
      const r = await fetch('/.netlify/functions/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, address }) })
      const { url } = await r.json()
      if (!r.ok || !url) throw new Error('checkout')
      window.location.href = url
    } catch { setFail(true); setBusy(false) }
  }

  const field = (k, label, props = {}) => (
    <label className="field" style={props.style}>{label}
      <input value={f[k]} onChange={set(k)} required={!props.optional} {...props.input} /></label>
  )

  return (
    <section className="page">
      <h2>Subscribe</h2>
      <div className="subscribe">
        <div className="card form-card">
          <form className="stack" onSubmit={submit}>
            <div className="row">
              {field('first', 'First name', { input: { autoComplete: 'given-name' }, style: { flex: '1 1 200px' } })}
              {field('last', 'Last name', { input: { autoComplete: 'family-name' }, style: { flex: '1 1 200px' } })}
            </div>
            {field('email', 'Email', { input: { type: 'email', autoComplete: 'email' } })}
            <fieldset className="stack">
              <legend>Mailing address</legend>
              {field('a1', 'Address line 1', { input: { autoComplete: 'address-line1' } })}
              {field('a2', 'Address line 2 (apt, suite, unit; optional)', { optional: true, input: { autoComplete: 'address-line2' } })}
              <div className="row">
                {field('city', 'City', { input: { autoComplete: 'address-level2' }, style: { flex: '2 1 200px' } })}
                {field('st', 'State', { input: { autoComplete: 'address-level1' }, style: { flex: '1 1 90px' } })}
                {field('zip', 'ZIP code', { input: { inputMode: 'numeric', autoComplete: 'postal-code' }, style: { flex: '1 1 120px' } })}
              </div>
            </fieldset>
            <div className="note"><strong>Recurring payment every other month · ${PRICE} per issue</strong><br />Sliding scale: [ADD YOUR RANGE OR TIERS]. You’ll pay securely by card on the next screen, powered by Stripe. You’re subscribed once your payment goes through, and you can cancel anytime.</div>
            {fail && <p role="alert" className="error">Something went wrong starting checkout. Please try again or email {EMAIL}.</p>}
            <button className="btn pink-btn" disabled={busy}>{busy ? 'One moment…' : 'Continue to secure payment'}</button>
          </form>
        </div>
        <div className="price"><p className="big">${PRICE}</p><p><strong>per issue, bi-monthly</strong></p><p>Custom printed. Mailed or shipped to you.</p></div>
      </div>
    </section>
  )
}
