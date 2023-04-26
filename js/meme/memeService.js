'use strict'

const gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I eat Spagetti',
      size: 50,
      align: 'center',
      color: 'white',
      font: 'impact',
      strokeStyle: 'black',
      posX: 250,
      posY: 100,
    },
    {
      txt: 'but I love Pizza!',
      size: 50,
      align: 'center',
      color: 'white',
      font: 'impact',
      strokeStyle: 'black',
      posX: 250,
      posY: 400,
    },
  ],
}

function createLine() {
  return {
    txt: '',
    size: 50,
    align: 'center',
    color: 'white',
    font: 'impact',
    strokeStyle: 'black',
    posX: 250,
    posY: 250,
  }
}

function setLineTxt(txt) {
  if (gMeme.lines.length > 2) return
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getMeme() {
  return gMeme
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function increaseSize() {
  gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseSize() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function changeTextColor(txtColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = txtColor
}

function changeStroke(strokeColor) {
  gMeme.lines[gMeme.selectedLineIdx].strokeStyle = strokeColor
}

function switchLine() {
  if (
    gMeme.selectedLineIdx === undefined ||
    gMeme.selectedLineIdx === gMeme.lines.length - 1
  ) {
    gMeme.selectedLineIdx = 0
  } else {
    gMeme.selectedLineIdx += 1
  }
}

function leftAlign() {
  gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function centerAlign() {
  gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function rightAlign() {
  gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function moveUp() {
  gMeme.lines[gMeme.selectedLineIdx].posY -= 10
}
function moveDown() {
  gMeme.lines[gMeme.selectedLineIdx].posY += 10
}

function addLine() {
  if (gMeme.lines.length > 2) return
  const elNewTxt = document.querySelector('.textInput')
  const newLine = elNewTxt.value
  const newTextLine = createLine()
  newTextLine.txt = newLine
  gMeme.lines.push(newTextLine)
}

function deleteText() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}
