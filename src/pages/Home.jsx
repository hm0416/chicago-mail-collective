import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Short stories by Chicagoans · In your mailbox</p>
      <h1>Join our mail club!</h1>
      <p className="lede">A Chicago newsletter of short stories written by local Chicagoans, custom printed and mailed to you. $10 an issue, on a sliding scale.</p>
      <Link className="btn dark" to="/subscribe">Subscribe — $10 / issue</Link>
    </section>
  )
}
