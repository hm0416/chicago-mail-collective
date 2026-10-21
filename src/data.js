import issue1 from './assets/issue1cover.png'
import train from './assets/train.jpg'

export const artists = [
  ['Anahita Dasgupta', 'Wrote “Before she was my Dadi, who was she?” in Issue 1, piecing together her grandmother’s life through family stories and her own sketches. Her work is about family history and the threads that connect generations.'],
  ['Matteo Marrocco', 'Wrote “Homebound” in Issue 1, an essay on what it means to feel at home. He writes about moving, identity and chosen family.'],
  ['Douglas Tsui', 'Contributed to Issue 1 and designed the sticker that came with Issue 2. [ADD ONE SENTENCE ABOUT DOUGLAS]'],
  ['Tristan Wong', 'Wrote “The People You Meet When You Go Out On Weekdays” in Issue 2, a funny, warm look at Chicago nightlife on a weeknight. It’s about friendship, reinvention and the strangers who become friends.'],
  ['Trinity Brandt, editor', 'Editor of the Chicago Mail Collective and a nurse who makes art. Wrote “Decay” in Issue 1 and “Casa Madero” in Issue 2.'],
]

export const issues = [
  { id: 1, name: 'Issue 1', date: '[DATE]', cover: issue1, stories: [
    { title: 'Before she was my Dadi, who was she?', author: 'Anahita Dasgupta', excerpt: 'Around 2022, I found out that my Dadi (my paternal grandmom) had 9 other siblings. I knew she had brothers and sisters but 10?' },
    { title: 'Decay', author: 'Trinity Brandt', excerpt: 'My weeks of eat-pray-love in Central America were necessary after a year of pronouncing people dead for a job.' },
    { title: 'Homebound', author: 'Matteo Marrocco', excerpt: 'Over the holidays, I went back to my hometown to spend time with my family.' },
  ] },
  { id: 2, name: 'Issue 2', date: 'October 2026', cover: train, stories: [
    { title: 'Casa Madero', author: 'Trinity Brandt', excerpt: 'Once upon a time, a young woman grew tired in her own thoughts. It was the end of a hot and grey summer.' },
    { title: 'The People You Meet When You Go Out On Weekdays: The MILF', author: 'Tristan Wong', excerpt: 'A not so well-known superpower of being An Unemployed is that you can viscerally feel the money bleeding out of your bank account at all times.' },
  ] },
]
