'use strict'

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderCanvas()
}

function onSetImg(imgId) {
    setImg(imgId)
    onOpenEditor()
    renderInputValue()
    renderCanvas()
}

function onOpenSavedMeme(imgId) {
    openSaveMeme(imgId)
    onOpenEditor()
    renderInputValue()
    renderCanvas()
}

function renderInputValue() {
    const elInput = document.querySelector('.textInput')
    const meme = getMeme()
    if (!meme.lines.length) {
        elInput.value = ''
        return
    }
    elInput.value = meme.lines[meme.selectedLineIdx].txt
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

function onChangeAlign(dir) {
    changeAlign(dir, gElCanvas.width)
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
    renderInputValue()
    renderCanvas()
}

function onDown(ev) {
    const meme = getMeme()
    if(!meme.lines.length) return
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    if(!meme.lines.length) return
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
    const meme = getMeme()
    if(!meme.lines.length) return
    setLineDrag(false)
    document.body.style.cursor = 'pointer'
}

function onSaveMeme() {
    const base64 = gElCanvas.toDataURL('image/jpeg')
    saveMeme(base64)
}
