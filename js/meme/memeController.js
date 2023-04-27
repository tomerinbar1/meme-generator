'use strict'

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderCanvas()
}

function onSetImg(imgId) {
  setImg(imgId)
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
  const pos = getEvPos(ev)
  if (isLineClicked(pos)) return
  setLineDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const meme = getMeme()
  const isDrag = meme.lines[meme.selectedLineIdx].isDrag
  if (!isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)
  gStartPos = pos
  renderCanvas()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}
