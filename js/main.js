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

function toggleIcon(elNav) {
    elNav.classList.toggle('open')
    const elNavbar = document.querySelector('.navbar')
    elNavbar.classList.toggle('open-navbar')
}

function onOpenEditor() {
    const elGallery = document.querySelector('.gallery-page-wrapper')
    const elEditor = document.querySelector('.editor-page-wrapper')
    const elSaved = document.querySelector('.saved-page-wrapper')
    const elAbout = document.querySelector('.about-page-wrapper')
    elAbout.style.display = 'none'
    elSaved.style.display = 'none'
    elGallery.style.display = 'none'
    elEditor.style.display = 'block'
  }

  function onOpenGallery() {
    const elGallery = document.querySelector('.gallery-page-wrapper')
    const elEditor = document.querySelector('.editor-page-wrapper')
    const elAbout = document.querySelector('.about-page-wrapper')
    const elSaved = document.querySelector('.saved-page-wrapper')
    elAbout.style.display = 'none'
    elEditor.style.display = 'none'
    elSaved.style.display = 'none'
    elGallery.style.display = 'block'
  }

  function onOpenSaved() {
    const elGallery = document.querySelector('.gallery-page-wrapper')
    const elEditor = document.querySelector('.editor-page-wrapper')
    const elSaved = document.querySelector('.saved-page-wrapper')
    const elAbout = document.querySelector('.about-page-wrapper')
    elEditor.style.display = 'none'
    elGallery.style.display = 'none'
    elAbout.style.display = 'none'
    elSaved.style.display = 'block'
    renderSavedMemes()
  }

  function onOpenAbout() {
    const elAbout = document.querySelector('.about-page-wrapper')
    const elGallery = document.querySelector('.gallery-page-wrapper')
    const elEditor = document.querySelector('.editor-page-wrapper')
    const elSaved = document.querySelector('.saved-page-wrapper')
    elEditor.style.display = 'none'
    elGallery.style.display = 'none'
    elSaved.style.display = 'none'
    elAbout.style.display = 'block'
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
        return `<li onclick="onSetImg(${img.id})"><img class="gallery-img" src="${img.url}" /></li>`
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
        const textWidth = gCtx.measureText(line.txt).width
        line.textWidth = textWidth
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
            var rectX = line.pos.x - line.textWidth / 2
            var rectWidth = line.textWidth
            var rectHeight = 1.5 * line.size
            gCtx.lineWidth = 3
            gCtx.rect(rectX - 10, rectY, rectWidth + 20, rectHeight)
            gCtx.strokeStyle = 'pink'
            gCtx.stroke()
        }
    })
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSavedContainer = document.querySelector('.saved-container')
    const imgsStr = savedMemes.map(img => {
        return `<li onclick="onOpenSavedMeme('${img.id}')"><img class="gallery-img" src="${img.saveBase}" /></li>`
    })
    imgsStr.unshift('<ul class="gallery-saved-grid">')
    imgsStr.push('</ul>')
    elSavedContainer.innerHTML = imgsStr.join('')
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
