import { Link } from 'react-router-dom'
export default function SubscribeSuccess() {
  return (
    <section className="page narrow">
      <h2>Thank you!</h2>
      <div className="card">
        <p>Your payment went through, and you’re now a subscriber of the Chicago Mail Collective. Stripe will email your receipt, and we’ll mail your first issue to the address you gave us.</p>
        <p style={{ marginTop: 16 }}><Link to="/">← Back home</Link></p>
      </div>
    </section>
  )
}
