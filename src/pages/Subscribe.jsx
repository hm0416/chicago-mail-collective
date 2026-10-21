import { useState } from 'react'
import { EMAIL, VENMO, FORM_ENDPOINT } from '../config.js'

const empty = { first: '', last: '', email: '', a1: '', a2: '', city: '', st: '', zip: '' }

export default function Subscribe() {
  const [f, setF] = useState(empty)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [fail, setFail] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const address = [f.a1, f.a2].filter(Boolean).join(', ') + `, ${f.city}, ${f.st} ${f.zip}`

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setFail(false)
    try {
      if (FORM_ENDPOINT) {
        const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...f, address }) })
        if (!r.ok) throw new Error('bad response')
      } else {
        const body = `Name: ${f.first} ${f.last}\nEmail: ${f.email}\nAddress: ${address}`
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('CMC subscription')}&body=${encodeURIComponent(body)}`
      }
      setSent(true)
    } catch { setFail(true) } finally { setBusy(false) }
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
          {sent ? (
            <div className="stack">
              <h3 className="pink">Almost there, {f.first}!</h3>
              <p>Send your first $10 on Venmo to <strong>{VENMO}</strong> and write <strong>“CMC — {f.first} {f.last}”</strong> in the note. Once it lands, we’ll add {address} to the mailing list and send a confirmation to {f.email}.</p>
              <a className="btn dark" href="https://venmo.com/">Open Venmo</a>
            </div>
          ) : (
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
              <div className="note"><strong>Recurring payment every other month · $10 per issue</strong><br />Sliding scale: [ADD YOUR RANGE OR TIERS]. Paid through Venmo.</div>
              {fail && <p role="alert" className="error">Something went wrong sending that. Please try again or email {EMAIL}.</p>}
              <button className="btn pink-btn" disabled={busy}>{busy ? 'Sending…' : 'Join the mail club'}</button>
            </form>
          )}
        </div>
        <div className="price"><p className="big">$10</p><p><strong>per issue, bi-monthly</strong></p><p>Custom printed. Mailed or shipped to you.</p></div>
      </div>
    </section>
  )
}
