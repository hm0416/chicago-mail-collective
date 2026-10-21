import { useState } from 'react'
import { Link } from 'react-router-dom'
import { issues } from '../data.js'
import { useArchive } from '../auth.jsx'

export default function Issues() {
  const { unlocked, unlock, logout } = useArchive()
  const [code, setCode] = useState('')
  const [bad, setBad] = useState(false)
  async function submit(e) { e.preventDefault(); setBad(!(await unlock(code))) }
  return (
    <section className="page">
      <h2>Past Issues</h2>
      {unlocked ? (
        <div className="banner"><span>Subscriber view: every issue is unlocked.</span><button className="btn yellow" onClick={logout}>Log out</button></div>
      ) : (
        <>
          <p className="intro">The archive is for subscribers. Enter your subscriber code to read every issue.</p>
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
            <div className="small"><strong>{i.date}</strong></div>
            <h3>{i.name}</h3>
            <p className="stories">{i.stories.map((s) => `${s.title} · ${s.author}`).join('\n')}</p>
            {unlocked ? <Link className="btn pink-btn self-start" to={`/issues/${i.id}`}>Read this issue →</Link>
              : <div className="lock"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E2418" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>Subscribers only: unlock to read</div>}
          </article>
        ))}
      </div>
    </section>
  )
}
