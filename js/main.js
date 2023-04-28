'use strict'

let gElCanvas
let gCtx
let gStartPos
let isFlex = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')
  renderGallery()
  addListeners()
  renderCanvas()
  resizeCanvas(1)
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas(1)
    renderCanvas()
  })
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

function resizeCanvas(ratio) {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight * ratio
}

function renderCanvas() {
  const meme = getMeme()
  const img = new Image()
  img.src = `./img/${meme.selectedImgId}.jpg`
  img.onload = () => {
    const ratio = img.naturalHeight / img.naturalWidth
    resizeCanvas(ratio)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText()
    markLine()
  }
}

function renderGallery() {
  const imgs = getImgs()
  const elGallery = document.querySelector('.gallery')
  const imgsStr = imgs.map(img => {
    return `<li onClick="onSetImg(${img.id})"><img class="gallery-img" src="${img.url}" /> </li>`
  })
  imgsStr.unshift('<ul class="gallery-grid">')
  imgsStr.push('</ul>')
  elGallery.innerHTML = imgsStr.join('')

  const elImgs = document.querySelectorAll('.gallery-img')

  elImgs.forEach(elImg => {
    const imgNaturalWidth = elImg.naturalWidth
    const imgNaturalHeight = elImg.naturalHeight
    const imgRatio = imgNaturalHeight / imgNaturalWidth
    elImg.height = 150 * imgRatio
    elImg.width = 150
  })
}

function drawText() {
  const meme = getMeme()
  meme.lines.forEach(line => {
    gCtx.beginPath()
    gCtx.font = `${line.size}px ${line.font}`
    const txtWidth = gCtx.measureText(line.txt).width
    line.txtWidth = txtWidth
    gCtx.textBaseline = 'alphabetic'

    gCtx.fillStyle = line.color
    gCtx.strokeStyle = `${line.strokeStyle}`
    gCtx.fillStyle = `${line.color}`
    gCtx.lineWidth = 1
    gCtx.textAlign = `${line.align}`
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
  })
}

function markLine() {
  const meme = getMeme()
  meme.lines.map((line, idx) => {
    if (idx === meme.selectedLineIdx) {
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

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

// share on Facebook

function onUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log(encodedUploadedImgUrl)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }

  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR
    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}

function onFlexible() {
  isFlex = true
  const meme = getMeme()
  const lines = meme.lines
  lines.splice(0, lines.length)
  const imgs = getImgs()
  const randImgId = getRandomIntInclusive(0, imgs.length - 1)
  onSetImg(randImgId)
  const lineCount = getRandomIntInclusive(1, 2)
  var randLines = []
  for (let i = 0; i < lineCount; i++) {
    const randLine = createLine(
      getRandomText(),
      getRandomIntInclusive(30, 40),
      getRandomColor(),
      getRandomColor(),
      {x: 250, y: i === 0 ? 100 : 250}
    )
    randLines.push(randLine)
  }
  meme.lines = randLines
  renderCanvas()
}