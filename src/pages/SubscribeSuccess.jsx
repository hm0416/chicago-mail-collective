import { Link } from 'react-router-dom'
import { T } from '../content.jsx'
export default function SubscribeSuccess() {
  return (
    <section className="page narrow">
      <T as="h2" k="success.title">Thank you!</T>
      <div className="card">
        <T as="p" k="success.body">Your payment went through, and you’re now a subscriber of the Chicago Mail Collective. Stripe will email your receipt, and we’ll mail your first issue to the address you gave us.</T>
        <p style={{ marginTop: 16 }}><Link to="/">← Back home</Link></p>
      </div>
    </section>
  )
}
