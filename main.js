'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')

  renderGallery()
}

function onOpenEditor() {
  const elGallery = document.querySelector('.gallery-page-wrapper')
  const elEditor = document.querySelector('.editor-page-wrapper')
  elEditor.style.display = 'block'
  elGallery.style.display = 'none'
}

function onOpenGallery() {
  const elGallery = document.querySelector('.gallery-page-wrapper')
  const elEditor = document.querySelector('.editor-page-wrapper')
  elEditor.style.display = 'none'
  elGallery.style.display = 'block'
}

function renderCanvas() {
  const meme = getMeme() // GET DATA FROM SERVICE
  const img = new Image()
  img.src = `./img/${meme.selectedImgId}.jpg`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(meme.lines)
    markLine()
  }
}

function renderGallery() {
  const imgs = getImgs() // GET DATA FROM SERVICE
  const elGallery = document.querySelector('.gallery')
  const imgsStr = imgs.map(img => {
    return `<li onClick="onSetImg(${img.id})"><img src="${img.url}"/></li>`
  })
  imgsStr.unshift('<ul class="gallery-grid">')
  imgsStr.push('</ul>')
  elGallery.innerHTML = imgsStr.join('')
}

function drawText(lines) {
  lines.forEach(line => {
    const txtWidth = gCtx.measureText(line.txt).width
    line.txtWidth = txtWidth
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align
    gCtx.strokeStyle = `${line.strokeStyle}`
    gCtx.fillStyle = `${line.color}`
    gCtx.lineWidth = 3
    gCtx.fillText(line.txt, line.posX, line.posY)
    gCtx.strokeText(line.txt, line.posX, line.posY)
  })
}

function markLine() {
  const meme = getMeme()
  meme.lines.map((line, idx) => {
    if (idx === gMeme.selectedLineIdx) {
      gCtx.beginPath()
      var rectY = line.posY - line.size
      var rectX = line.posX - line.txtWidth / 2
      var rectWidth = line.txtWidth
      var rectHeight = 1.5 * line.size
      gCtx.lineWidth = 3
      gCtx.rect(rectX - 10, rectY, rectWidth + 20, rectHeight)
      gCtx.strokeStyle = 'pink'
      gCtx.stroke()
    }
  })
}

//! TODO finish the markLine bug when load an image.
