'use strict'

function openImgInCanvas(imgId) {
  const imgIdStr = imgId
  const imgs = createImages()
  const getImage = imgs.find(img => String(img.id).trim() === imgIdStr.trim())
  const imageUrl = getImage.url
  drawImg(imageUrl)
  onOpenEditor()
}

function drawImg(img) {
  const elImg = new Image()
  elImg.src = img
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}
