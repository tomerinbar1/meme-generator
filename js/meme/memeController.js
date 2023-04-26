'use strict'

function openImgInCanvas(imgId) {
  const imgIdStr = imgId
  const imgs = createImages()
  const getImage = imgs.find(img => String(img.id).trim() === imgIdStr.trim())
  const imageUrl = getImage.url
  renderCanvas(imageUrl)
  onOpenEditor()
}

function onWriteText(txt) {
  setLineTxt(txt)
  
  gCtx.font = '60px Comic Sans MS'
  gCtx.fillStyle = 'blue'
  gCtx.textAlign = 'center'
  // gCtx.fillText(txt, gElCanvas.width / 4, gElCanvas.height / 4)
}

function renderCanvas(img) {
  const elImg = new Image()
  elImg.src = img
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}