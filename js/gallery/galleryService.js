'use strict'

let gKeywordSearchCountMap = {}

const gImgs = [
  { id: 0, url: 'img/0.jpg', tags: ['swiss', 'switzerland', 'heidi', 'woman'] },
  {
    id: 1,
    url: 'img/1.jpg',
    tags: ['president', 'donald', 'trump', 'man', 'face'],
  },
  {
    id: 2,
    url: 'img/2.jpg',
    tags: ['pappies', 'dog', 'sweet', 'cute', 'kiss'],
  },
  {
    id: 3,
    url: 'img/3.jpg',
    tags: ['baby', 'pappy', 'sleep', 'sweet', 'cute', 'dog'],
  },
  {
    id: 4,
    url: 'img/4.jpg',
    tags: ['baby', 'buster', 'angry', 'beach', 'fist'],
  },
  {
    id: 5,
    url: 'img/5.jpg',
    tags: ['cat', 'sleep', 'sweet', 'cute', 'laptop'],
  },
  { id: 6, url: 'img/6.jpg', tags: ['legend', 'Wonderland', 'costume'] },
  { id: 7, url: 'img/7.jpg', tags: ['baby', 'plot', 'evil'] },
  { id: 8, url: 'img/8.jpg', tags: ['haim', 'hecht', 'what', 'men', 'old'] },
  { id: 9, url: 'img/9.jpg', tags: ['why', 'damm', 'no'] },
  {
    id: 10,
    url: 'img/10.jpg',
    tags: ['history', 'proffesor', 'size', 'crazy'],
  },
  { id: 11, url: 'img/11.jpg', tags: ['dr', 'evil', 'austin', 'powers'] },
  { id: 12, url: 'img/12.jpg', tags: ['dace', 'african', 'children', 'happy'] },
  {
    id: 13,
    url: 'img/13.jpg',
    tags: ['president', 'donald', 'trump', 'man', 'face'],
  },
  { id: 14, url: 'img/14.jpg', tags: ['shock', 'eyes', 'child'] },
  { id: 15, url: 'img/15.jpg', tags: ['dog', 'begging', 'cool', 'floor'] },
  { id: 16, url: 'img/16.jpg', tags: ['barak', 'obama', 'president', 'man'] },
  { id: 17, url: 'img/17.jpg', tags: ['sport', 'kiss', 'guys', 'men'] },
  {
    id: 18,
    url: 'img/18.jpg',
    tags: ['hollywood', 'actor', 'leonardo', 'dicaprio', 'cheers'],
  },
  { id: 19, url: 'img/19.jpg', tags: ['matrix', 'black', 'man'] },
  { id: 20, url: 'img/20.jpg', tags: ['penis', 'size', 'circle', 'man'] },
  { id: 21, url: 'img/21.jpg', tags: ['opera', 'winfrey', 'show'] },
  { id: 22, url: 'img/22.jpg', tags: ['starwars', 'man', 'laugh'] },
  {
    id: 23,
    url: 'img/23.jpg',
    tags: ['president', 'putin', 'old', 'man', 'russia'],
  },
  {
    id: 24,
    url: 'img/24.jpg',
    tags: ['toys', 'story', 'woody', 'buzz', 'lightyear'],
  },
]

function getImgs() {
  return gImgs
}

function searchByTags(match) {
  const tags = getImgs()
  const tagsList = tags.map(tag => {
    return tag.tags
  })
  const matches = tagsList.forEach(tag => {
    tag.forEach(tag => {
      if (tag === match) {
        console.log('match')
      }
    })
  })
  return matches
}
