'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.querySelector('.responsive-canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
  addListeners()
  renderCanvas()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

// function resizeCanvas() {
//   const elContainer = document.querySelector('.canvas-container')
//   gElCanvas.width = elContainer.offsetWidth
//   gElCanvas.height = elContainer.offsetHeight
// }

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
  const meme = getMeme()
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
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
  })
}

function markLine() {
  const meme = getMeme()
  meme.lines.map((line, idx) => {
    if (idx === gMeme.selectedLineIdx) {
      gCtx.beginPath()
      var rectY = line.pos.y - line.size
      var rectX = line.pos.x - line.txtWidth / 2
      var rectWidth = line.txtWidth
      var rectHeight = 1.5 * line.size
      gCtx.lineWidth = 3
      gCtx.rect(rectX - 10, rectY, rectWidth + 20, rectHeight)
      gCtx.strokeStyle = 'pink'
      gCtx.stroke()
    }
  })
}

//* TODO finish the markLine bug when load an image.
//* TODO finish the responsivness of the Canvas
