'use strict'

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderCanvas()
}

function onSetImg(imgId) {
  setImg(imgId) // SET DATA TO SERVICE
  onOpenEditor()
  const elInput = document.querySelector('.textInput')
  const meme = getMeme()
  elInput.value = meme.lines[meme.selectedLineIdx].txt
  renderCanvas()
}

function onIncreaseSize() {
  increaseSize()
  renderCanvas()
}

function onDecreaseSize() {
  decreaseSize()
  renderCanvas()
}

function onChangeTextColor(txtColor) {
  changeTextColor(txtColor)
  renderCanvas()
}

function onChangeStroke(strokeColor) {
  changeStroke(strokeColor)
  renderCanvas()
}

function onSwitchLine() {
  switchLine()
  renderCanvas()
}

function onLeftAlign() {
  leftAlign()
  renderCanvas()
}

function onCenterAlign() {
  centerAlign()
  renderCanvas()
}

function onRightAlign() {
  rightAlign()
  renderCanvas()
}

function onMoveUp() {
  moveUp()
  renderCanvas()
}
function onMoveDown() {
  moveDown()
  renderCanvas()
}

function onaddLine() {
  addLine()
  renderCanvas()
}

function onDeleteText() {
  deleteText()
  renderCanvas()
}

function onDown(ev) {
  // Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  console.log(pos);

  if (!isLineClicked(pos)) return

  console.log('Down')

  setLineDrag(true)
  //Save the pos we start from

  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const meme = getMeme()
  const isDrag = meme.lines[meme.selectedLineIdx].isDrag
  
  if (!isDrag) return
  console.log('Move')

  const pos = getEvPos(ev)
  // Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)
  // Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos
  // The canvas is render again after every move
  renderCanvas()
}

// function onUp() {
//   // console.log('Up')
//   setCircleDrag(false)
//   document.body.style.cursor = 'grab'
// }