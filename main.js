'use strict'

let gElCanvas
let gCtx

function onInit() {
  renderGallery()
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')
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

function onOpenImgInCanvas(imgId) {
  openImgInCanvas(imgId)
}
