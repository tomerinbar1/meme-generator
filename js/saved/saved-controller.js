'use strict'

function renderSaved() {
  const loadImgs = []
  const imgs = loadFromStorage()
  loadImgs.push(imgs)
  const elSaved = document.querySelector('.saved')
  const imgStr = loadImgs.map(img => {
    return `<li><img onclick="onSetImg(${img.selectedImgId})" class="saved-img" src="${img.saveBase}"></li>`
  })
  imgStr.unshift('<ul class="saved-grid">')
  imgStr.push('</ul>')
  elSaved.innerHTML = imgStr.join('')
}
