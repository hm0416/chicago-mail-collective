import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Community from './pages/Community.jsx'
import Subscribe from './pages/Subscribe.jsx'
import Issues from './pages/Issues.jsx'
import Issue from './pages/Issue.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="community" element={<Community />} />
        <Route path="subscribe" element={<Subscribe />} />
        <Route path="issues" element={<Issues />} />
        <Route path="issues/:id" element={<Issue />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
