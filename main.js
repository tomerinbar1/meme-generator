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
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align

        gCtx.strokeStyle = `${line.strokeStyle}`
        gCtx.fillStyle = `${line.color}`

        gCtx.fillText(line.txt, 250, 250)
        gCtx.strokeText(line.txt, 250, 250)
    })
}