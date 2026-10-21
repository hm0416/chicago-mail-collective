import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { EMAIL } from '../config.js'
import { AdminBar, AdminLink, T, useText } from '../content.jsx'
import logo from '../assets/logo_black.png'
import flowerL from '../assets/flowerL.png'
import flowerR from '../assets/flowerR.png'

// Fixed spots so the flowers stay put from page to page.
const flowers = [
  [flowerL, 230, 'left:2%', 92, -8], [flowerR, 270, 'right:3%', 118, 9],
  [flowerR, 520, 'left:-1%', 104, -18], [flowerL, 720, 'right:1%', 88, 14],
  [flowerL, 880, 'left:3%', 124, 6], [flowerR, 1020, 'right:4%', 96, -12],
  [flowerR, 1300, 'left:1%', 110, 11], [flowerL, 1500, 'right:2%', 130, -6],
  [flowerL, 1700, 'left:5%', 90, 16], [flowerR, 1900, 'right:6%', 100, -15],
]
const tabs = [['/', 'Home'], ['/about', 'About'], ['/community', 'Community & Artists'], ['/subscribe', 'Subscribe'], ['/issues', 'Past Issues']]
export default function Layout() {
  const { pathname } = useLocation()
  const issueNo = useText('banner.issue', '3')
  const shipDate = useText('banner.date', 'January 2027')
  const banner = `Next issue release  ✿  Issue ${issueNo}  ✿  anticipated shipping: ${shipDate}  ✿  printed & mailed to your door  ✿  `
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <div className="site">
      <AdminBar />
      {flowers.map(([src, top, side, w, rot], i) => {
        const [k, v] = side.split(':')
        return <img key={i} className="flower" src={src} alt="" aria-hidden="true" style={{ top, [k]: v, width: w, transform: `rotate(${rot}deg)` }} />
      })}
      <div className="content">
        <header className="header">
          <Link to="/" aria-label="Chicago Mail Collective, home"><img className="logo" src={logo} alt="Chicago Mail Collective" /></Link>
          <nav>
            {tabs.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'tab' + (isActive || (to === '/issues' && pathname.startsWith('/issues')) ? ' active' : '')}>{label}</NavLink>
            ))}
          </nav>
        </header>
        <div className="marquee" aria-label={`Next issue release: Issue ${issueNo}, anticipated shipping ${shipDate}`}>
          <div className="track" aria-hidden="true"><span>{banner.repeat(2)}</span><span>{banner.repeat(2)}</span></div>
        </div>
        <main><Outlet /></main>
        <footer className="footer">
          <T as="p" k="footer.contact" className="contact-label">Contact the editor</T>
          <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <T as="p" k="footer.thanks">Thank you for your support! Made in Chicago, mailed everywhere.</T>
          <AdminLink />
        </footer>
      </div>
    </div>
  )
}
