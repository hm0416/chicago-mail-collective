import { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)
export const useArchive = () => useContext(Ctx)

// Subscriber access: the code is checked on the server (netlify/functions/archive.js),
// which is the only thing that returns the issue PDF links.
export function ArchiveProvider({ children }) {
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
  return <Ctx.Provider value={{ unlocked: !!pdfs, pdfs, unlock, logout }}>{children}</Ctx.Provider>
}
