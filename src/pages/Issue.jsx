import { Link, Navigate, useParams } from 'react-router-dom'
import { issues } from '../data.js'
import { useArchive } from '../auth.jsx'
import { T } from '../content.jsx'

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
          <T as="strong" k={`issue.${issue.id}.date`}>{issue.date}</T>
          <T as="h2" k={`issue.${issue.id}.name`} className="reader-title">{issue.name}</T>
          <T as="p" k="issue.intro">You’re reading as a subscriber. Here’s what’s inside.</T>
          {pdf && <a className="btn dark" href={pdf}>Download the full issue (PDF)</a>}
        </div>
      </div>
      <h3>Inside</h3>
      <div className="stack">
        {issue.stories.map((s, j) => (
          <article key={j} className="card cream"><T as="h4" k={`issue.${issue.id}.story.${j}.title`}>{s.title}</T><T as="strong" k={`issue.${issue.id}.story.${j}.author`}>{s.author}</T><T as="p" k={`issue.${issue.id}.story.${j}.excerpt`}>{s.excerpt}</T></article>
        ))}
      </div>
    </section>
  )
}
