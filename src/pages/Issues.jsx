import { useState } from 'react'
import { Link } from 'react-router-dom'
import { issues } from '../data.js'
import { useArchive } from '../auth.jsx'
import { T, useContent } from '../content.jsx'
import { supabase } from '../supabase.js'

function PdfUpload({ id }) {
  const [msg, setMsg] = useState('')
  async function pick(e) {
    const file = e.target.files[0]
    if (!file) return
    setMsg('Uploading…')
    const { error } = await supabase.storage.from('issues').upload(`issue-${id}.pdf`, file, { upsert: true, contentType: 'application/pdf' })
    setMsg(error ? 'Upload failed: ' + error.message : 'Uploaded. Subscribers see it now.')
  }
  return <label className="pdf-upload">Upload PDF for this issue<input type="file" accept="application/pdf" onChange={pick} />{msg && <span>{msg}</span>}</label>
}

export default function Issues() {
  const { editMode } = useContent()
  const { unlocked, unlock, logout } = useArchive()
  const [code, setCode] = useState('')
  const [bad, setBad] = useState(false)
  async function submit(e) { e.preventDefault(); setBad(!(await unlock(code))) }
  return (
    <section className="page">
      <T as="h2" k="issues.title">Past Issues</T>
      {unlocked ? (
        <div className="banner"><T k="issues.unlocked">Subscriber view: every issue is unlocked.</T><button className="btn yellow" onClick={logout}>Log out</button></div>
      ) : (
        <>
          <T as="p" k="issues.intro" className="intro">The archive is for subscribers. Enter your subscriber code to read every issue.</T>
          <form className="code-row" onSubmit={submit}>
            <label htmlFor="code"><strong>Subscriber code</strong></label>
            <input id="code" value={code} onChange={(e) => setCode(e.target.value)} />
            <button className="btn dark">Unlock archive</button>
            {bad && <span role="alert" className="error">That code didn’t work. Try again or email us.</span>}
          </form>
        </>
      )}
      <div className="grid">
        {issues.map((i) => (
          <article key={i.id} className="card issue">
            <img src={i.cover} alt={`Cover art for ${i.name}`} />
            <T as="div" k={`issue.${i.id}.date`} className="small" style={{ fontWeight: 700 }}>{i.date}</T>
            <T as="h3" k={`issue.${i.id}.name`}>{i.name}</T>
            <div className="stories">{i.stories.map((s, j) => (
              <div key={j}><T k={`issue.${i.id}.story.${j}.title`}>{s.title}</T> · <T k={`issue.${i.id}.story.${j}.author`}>{s.author}</T></div>
            ))}</div>
            {editMode && <PdfUpload id={i.id} />}
            {unlocked ? <Link className="btn pink-btn self-start" to={`/issues/${i.id}`}>Read this issue →</Link>
              : <div className="lock"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E2418" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>Subscribers only: unlock to read</div>}
          </article>
        ))}
      </div>
    </section>
  )
}
