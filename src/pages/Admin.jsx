import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabase.js'
import { useContent } from '../content.jsx'

export default function Admin() {
  const { isAdmin, setEditMode } = useContent()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  if (isAdmin) return <Navigate to="/" replace />
  async function submit(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErr('Wrong email or password.')
    else setEditMode(true)
  }
  return (
    <section className="page narrow">
      <h2>Admin login</h2>
      <form className="card stack" onSubmit={submit}>
        <label className="field">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
        <label className="field">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
        {err && <p role="alert" className="error">{err}</p>}
        <button className="btn dark">Log in</button>
      </form>
    </section>
  )
}
