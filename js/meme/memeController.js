'use strict'

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderCanvas()
}

function onSetImg(imgId) {
    setImg(imgId) // SET DATA TO SERVICE
    onOpenEditor()
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