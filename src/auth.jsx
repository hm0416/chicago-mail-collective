import { createContext, useContext, useEffect, useState } from 'react'
import { useContent } from './content.jsx'

const Ctx = createContext(null)
export const useArchive = () => useContext(Ctx)

// Subscriber access: the code is checked on the server (netlify/functions/archive.js),
// which is the only thing that returns the issue PDF links.
export function ArchiveProvider({ children }) {
  const { session } = useContent()
  const [adminPdfs, setAdminPdfs] = useState(null)
  const token = session?.access_token
  // Logged-in admins skip the subscriber code; the server verifies the token.
  useEffect(() => {
    if (!token) { setAdminPdfs(null); return }
    fetch('/.netlify/functions/archive', { method: 'POST', body: JSON.stringify({ token }) })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setAdminPdfs(d?.pdfs ?? null))
      .catch(() => setAdminPdfs(null))
  }, [token])
  const [pdfs, setPdfs] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('cmc-pdfs')) } catch { return null }
  })
  async function unlock(code) {
    try {
      const r = await fetch('/.netlify/functions/archive', { method: 'POST', body: JSON.stringify({ code }) })
      if (!r.ok) return false
      const { pdfs } = await r.json()
      sessionStorage.setItem('cmc-pdfs', JSON.stringify(pdfs))
      setPdfs(pdfs)
      return true
    } catch { return false }
  }
  function logout() { sessionStorage.removeItem('cmc-pdfs'); setPdfs(null) }
  return <Ctx.Provider value={{ unlocked: !!(pdfs || adminPdfs), pdfs: pdfs || adminPdfs, unlock, logout }}>{children}</Ctx.Provider>
}
