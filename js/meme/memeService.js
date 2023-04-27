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
      pos: {x: 250, y: 100},
      isDrag: false
    },
    {
      txt: 'but I love Pizza!',
      size: 50,
      align: 'center',
      color: 'white',
      font: 'impact',
      strokeStyle: 'black',
      pos: {x: 250, y: 400},
      isDrag: false
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
    pos: {x: 250, y: 250},
    isDrag: false
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

function getEvPos(ev) {
  // Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // console.log('pos:', pos)
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    // console.log('ev.pageX:', ev.pageX)
    // console.log('ev.pageY:', ev.pageY)
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
    // console.log('pos:', pos)
  }
  return pos
}


function isLineClicked(clickedPos) {
  // console.log('posX:', posX, 'posY:', posY, 'elLine', textElement)

  const textWidth = textElement.offsetWidth;
  const textHeight = textElement.offsetHeight;
  const textPosX = textElement.offsetLeft;
  const textPosY = textElement.offsetTop;
  
  if (posX >= textPosX && posX <= textPosX + textWidth &&
      posY >= textPosY && posY <= textPosY + textHeight) {
    return true;
  } else {
    return false;
  }
}

function setLineDrag(isDrag) {
  gMeme.lines[selectedLineIdx].isDrag = isDrag
}