'use strict'

function saveToStorage() {
  const meme = getMeme()
  const dataUrl = gElCanvas.toDataURL('image/jpeg')
  meme.saveBase = dataUrl
  const imgStr = JSON.stringify(meme)
  localStorage.setItem('key', imgStr)
}

function loadFromStorage() {
  const imgStr = localStorage.getItem('key')
  return JSON.parse(imgStr)
}