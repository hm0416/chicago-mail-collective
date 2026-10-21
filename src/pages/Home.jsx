import { Link } from 'react-router-dom'
import { T } from '../content.jsx'
export default function Home() {
  return (
    <section className="hero">
      <T as="p" k="home.eyebrow" className="eyebrow">Short stories by Chicagoans · In your mailbox</T>
      <T as="h1" k="home.title">Join our mail club!</T>
      <T as="p" k="home.lede" className="lede">A Chicago newsletter of short stories written by local Chicagoans, custom printed and mailed to you. $5, $10 or $15 an issue, on a sliding scale.</T>
      <Link className="btn dark" to="/subscribe"><T k="home.cta">Subscribe</T></Link>
    </section>
  )
}
