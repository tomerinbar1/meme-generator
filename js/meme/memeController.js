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
