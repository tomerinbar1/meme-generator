'use strict'

function onInit() {
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
  

  function onOpenImgInCanvas(imgId) {
OpenImgInCanvas(imgId)
  }