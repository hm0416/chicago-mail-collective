import { createContext, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, arrivedViaInvite } from './supabase.js'

const Ctx = createContext(null)
export const useContent = () => useContext(Ctx)

export function ContentProvider({ children }) {
  const [content, setContent] = useState({})
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    let alive = true
    supabase.from('content').select('key,value').then(({ data }) => {
      if (!alive) return
      if (data) setContent(Object.fromEntries(data.map((r) => [r.key, r.value])))
      setReady(true)
    })
    const ch = supabase.channel('content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, ({ new: row }) => {
        if (row?.key) setContent((c) => ({ ...c, [row.key]: row.value }))
      })
      .subscribe()
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); if (!s) setEditMode(false) })
    return () => { alive = false; supabase.removeChannel(ch); sub.subscription.unsubscribe() }
  }, [])

  async function write(key, value) {
    setContent((c) => ({ ...c, [key]: value }))
    const { error } = await supabase.from('content').upsert({ key, value })
    if (error) alert('Could not save: ' + error.message)
  }

  // prev is the text shown before the edit, so undo can restore it.
  function save(key, value, prev) {
    if (prev !== undefined) setHistory((h) => [...h, { key, prev }])
    return write(key, value)
  }

  function undo() {
    const last = history[history.length - 1]
    if (!last) return
    setHistory((h) => h.slice(0, -1))
    write(last.key, last.prev)
  }

  const isAdmin = !!session
  return (
    <Ctx.Provider value={{ content, ready, isAdmin, session, editMode: isAdmin && editMode, setEditMode, save, undo, canUndo: history.length > 0 }}>
      {children}
    </Ctx.Provider>
  )
}

export function useText(k, def) {
  const { content } = useContent()
  return content[k] ?? def
}

// Editable text: renders the saved value (or the default) and becomes click-to-edit in edit mode.
export function T({ k, children, as: Tag = 'span', ...rest }) {
  const { content, ready, editMode, save } = useContent()
  const value = content[k] ?? children
  if (!editMode) return <Tag {...rest} style={{ ...rest.style, visibility: ready ? undefined : 'hidden' }}>{value}</Tag>
  return (
    <Tag
      {...rest}
      className={(rest.className ? rest.className + ' ' : '') + 'editable'}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck
      onClick={(e) => e.preventDefault()}
      onBlur={(e) => {
        const next = e.currentTarget.innerText.replace(/\n+$/, '')
        if (next !== value) save(k, next, value)
      }}
    >{value}</Tag>
  )
}

export function AdminBar() {
  const { isAdmin, editMode, setEditMode, content, save, undo, canUndo } = useContent()
  const [needsPassword, setNeedsPassword] = useState(arrivedViaInvite)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  if (!isAdmin) return null
  if (needsPassword) {
    return (
      <form className="admin-bar on" onSubmit={async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.updateUser({ password: pw })
        if (error) setErr(error.message)
        else { setNeedsPassword(false); setEditMode(true) }
      }}>
        <strong>Welcome! Choose a password:</strong>
        <input type="password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
        <button className="btn yellow">Save password</button>
        {err && <span>{err}</span>}
      </form>
    )
  }
  return (
    <div className={'admin-bar' + (editMode ? ' on' : '')}>
      <button className="btn yellow" onClick={() => setEditMode(!editMode)}>{editMode ? 'Done editing' : 'Edit mode'}</button>
      <span>{editMode ? 'Editing: click any text to change it. Changes save when you click away.' : 'Logged in as admin'}</span>
      {editMode && (
        <>
          <label className="admin-banner">Banner issue #:
            <input defaultValue={content['banner.issue'] ?? '3'} onBlur={(e) => e.target.value !== (content['banner.issue'] ?? '3') && save('banner.issue', e.target.value, content['banner.issue'] ?? '3')} />
          </label>
          <label className="admin-banner">Banner ship date:
            <input defaultValue={content['banner.date'] ?? 'January 2027'} onBlur={(e) => e.target.value !== (content['banner.date'] ?? 'January 2027') && save('banner.date', e.target.value, content['banner.date'] ?? 'January 2027')} />
          </label>
        </>
      )}
      {editMode && <button className="btn" onClick={undo} disabled={!canUndo}>Undo</button>}
      <button className="btn" onClick={() => supabase.auth.signOut()}>Log out</button>
    </div>
  )
}

export function AdminLink() {
  const { isAdmin } = useContent()
  return isAdmin ? null : <Link className="admin-link" to="/admin">Admin</Link>
}
