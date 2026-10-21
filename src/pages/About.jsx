import { T } from '../content.jsx'

export default function About() {
  return (
    <section className="page">
      <T as="h2" k="about.title">About</T>
      <div className="grid">
        <div className="card"><T as="h3" k="about.what.title">What</T><T as="p" k="about.what.body">Chicago Mail Collective is an independent publication produced by a community of Chicago-based artists. CMC delivers printed, thoughtfully made media to your mailbox every other month, with short stories by local Chicagoans in every issue.</T></div>
        <div className="card"><T as="h3" k="about.why.title">Why</T><T as="p" k="about.why.body">Through a sliding scale subscription, CMC hopes to make art more accessible and financially support young artists in the city.</T></div>
      </div>
    </section>
  )
}
