import { artists } from '../data.js'
import { INSTAGRAM, INSTAGRAM_URL } from '../config.js'
import train from '../assets/train.jpg'
import ometepe from '../assets/ometepe.jpg'
import cats from '../assets/cats.png'

export default function Community() {
  return (
    <section className="page">
      <h2>The Community &amp; Artists</h2>
      <div className="grid">
        <div className="card wide">
          <h3>Past Artists</h3>
          <div className="artists">{artists.map(([n, d]) => <div key={n}><strong>{n}</strong><br />{d}</div>)}</div>
        </div>
        <div className="card"><h3>How We Support Artists</h3><p>Subscriptions financially support young artists in the city. [ADD: how contributors are paid.]</p></div>
        <div className="card dark">
          <h3>Submit</h3>
          <p>For now, submissions happen through Instagram, with our core artists only, and aren’t open on this website yet. Stay tuned for submission opportunities!</p>
          <a href={INSTAGRAM_URL}>Find us on Instagram: {INSTAGRAM} →</a>
        </div>
      </div>
      <h3 className="gallery-title">From the mailbox</h3>
      <div className="gallery">
        <figure className="print" style={{ flex: '0 1 380px', transform: 'rotate(-2.5deg)' }}><span className="tape" /><img src={train} alt="Illustration of a person with a red umbrella walking past a green L train in the rain" /><figcaption>Issue 2 art · [ARTIST CREDIT]</figcaption></figure>
        <figure className="print" style={{ flex: '0 1 250px', transform: 'rotate(2deg)' }}><span className="tape" /><img src={ometepe} alt="Watercolor of a white heron in front of a volcano and green trees on Ometepe" /><figcaption>Issue 1 art · Ometepe, Nicaragua · Trinity Brandt</figcaption></figure>
        <figure style={{ flex: '0 1 200px', margin: 0, transform: 'rotate(-4deg)' }}><img src={cats} alt="Two gray cats leaping" style={{ width: '100%' }} /><figcaption className="small">From “Casa Madero,” Issue 2 · [ARTIST CREDIT]</figcaption></figure>
      </div>
    </section>
  )
}
