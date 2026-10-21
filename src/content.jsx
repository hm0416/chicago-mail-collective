import { createContext, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'

const Ctx = createContext(null)
export const useContent = () => useContext(Ctx)

export function ContentProvider({ children }) {
  const [content, setContent] = useState({})
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)
  const [editMode, setEditMode] = useState(false)

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

  async function save(key, value) {
    setContent((c) => ({ ...c, [key]: value }))
    const { error } = await supabase.from('content').upsert({ key, value })
    if (error) alert('Could not save: ' + error.message)
  }

  const isAdmin = !!session
  return (
    <Ctx.Provider value={{ content, ready, isAdmin, editMode: isAdmin && editMode, setEditMode, save }}>
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
        if (next !== value) save(k, next)
      }}
    >{value}</Tag>
  )
}

export function AdminBar() {
  const { isAdmin, editMode, setEditMode, content, save } = useContent()
  if (!isAdmin) return null
  return (
    <div className={'admin-bar' + (editMode ? ' on' : '')}>
      <button className="btn yellow" onClick={() => setEditMode(!editMode)}>{editMode ? 'Done editing' : 'Edit mode'}</button>
      <span>{editMode ? 'Editing: click any text to change it. Changes save when you click away.' : 'Logged in as admin'}</span>
      {editMode && (
        <label className="admin-banner">Banner:
          <input defaultValue={content.banner ?? ''} placeholder="Scrolling banner text" onBlur={(e) => e.target.value !== (content.banner ?? '') && save('banner', e.target.value)} />
        </label>
      )}
      <button className="btn" onClick={() => supabase.auth.signOut()}>Log out</button>
    </div>
  )
}

export function AdminLink() {
  const { isAdmin } = useContent()
  return isAdmin ? null : <Link className="admin-link" to="/admin">Admin</Link>
}
