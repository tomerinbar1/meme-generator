'use strict'

function renderGallery() {
  const imgs = createImages()
  const elGallery = document.querySelector('.gallery')
  const imgsStr = imgs.map(img => {
    return `<li onClick="onOpenImgInCanvas('${img.id}')"><img src="${img.url}"/></li>`
  })
  imgsStr.unshift('<ul class="gallery-grid">')
  imgsStr.push('</ul>')
  elGallery.innerHTML = imgsStr.join('')
}
