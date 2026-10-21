import { Link, Navigate, useParams } from 'react-router-dom'
import { issues } from '../data.js'
import { useArchive } from '../auth.jsx'

export default function Issue() {
  const { id } = useParams()
  const { unlocked, pdfs } = useArchive()
  const issue = issues.find((i) => String(i.id) === id)
  if (!unlocked || !issue) return <Navigate to="/issues" replace />
  const pdf = pdfs?.[issue.id]
  return (
    <section className="page narrow">
      <Link className="back" to="/issues">← All issues</Link>
      <div className="reader-top">
        <img className="reader-cover" src={issue.cover} alt={`Cover art for ${issue.name}`} />
        <div>
          <strong>{issue.date}</strong>
          <h2 className="reader-title">{issue.name}</h2>
          <p>You’re reading as a subscriber. Here’s what’s inside.</p>
          {pdf && <a className="btn dark" href={pdf}>Download the full issue (PDF)</a>}
        </div>
      </div>
      <h3>Inside</h3>
      <div className="stack">
        {issue.stories.map((s) => (
          <article key={s.title} className="card cream"><h4>{s.title}</h4><strong>{s.author}</strong><p><em>{s.excerpt}</em></p></article>
        ))}
      </div>
    </section>
  )
}
