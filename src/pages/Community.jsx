import { artists } from '../data.js'
import { INSTAGRAM, INSTAGRAM_URL } from '../config.js'
import train from '../assets/train.jpg'
import ometepe from '../assets/ometepe.jpg'
import cats from '../assets/cats.png'
import { T } from '../content.jsx'

export default function Community() {
  return (
    <section className="page">
      <T as="h2" k="community.title">The Community &amp; Artists</T>
      <div className="grid">
        <div className="card wide">
          <T as="h3" k="community.artists.title">Past Artists</T>
          <div className="artists">{artists.map(([n, d], i) => <div key={i}><T as="strong" k={`artist.${i}.name`}>{n}</T><br /><T k={`artist.${i}.bio`}>{d}</T></div>)}</div>
        </div>
        <div className="card"><T as="h3" k="community.support.title">How We Support Artists</T><T as="p" k="community.support.body">Subscriptions financially support young artists in the city. [ADD: how contributors are paid.]</T></div>
        <div className="card dark">
          <T as="h3" k="community.submit.title">Submit</T>
          <T as="p" k="community.submit.body">For now, submissions happen through Instagram, with our core artists only, and aren’t open on this website yet. Stay tuned for submission opportunities!</T>
          <a href={INSTAGRAM_URL}>Find us on Instagram: {INSTAGRAM} →</a>
        </div>
      </div>
      <T as="h3" k="community.gallery.title" className="gallery-title">From the mailbox</T>
      <div className="gallery">
        <figure className="print" style={{ flex: '0 1 380px', transform: 'rotate(-2.5deg)' }}><span className="tape" /><img src={train} alt="Illustration of a person with a red umbrella walking past a green L train in the rain" /><T as="figcaption" k="community.cap1">Issue 2 art · [ARTIST CREDIT]</T></figure>
        <figure className="print" style={{ flex: '0 1 250px', transform: 'rotate(2deg)' }}><span className="tape" /><img src={ometepe} alt="Watercolor of a white heron in front of a volcano and green trees on Ometepe" /><T as="figcaption" k="community.cap2">Issue 1 art · Ometepe, Nicaragua · Trinity Brandt</T></figure>
        <figure style={{ flex: '0 1 200px', margin: 0, transform: 'rotate(-4deg)' }}><img src={cats} alt="Two gray cats leaping" style={{ width: '100%' }} /><T as="figcaption" k="community.cap3" className="small">From “Casa Madero,” Issue 2 · [ARTIST CREDIT]</T></figure>
      </div>
    </section>
  )
}
