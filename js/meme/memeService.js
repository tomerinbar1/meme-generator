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
            isDrag: false,
        },
        {
            txt: 'but I love Pizza!',
            size: 50,
            align: 'center',
            color: 'white',
            font: 'impact',
            strokeStyle: 'black',
            pos: {x: 250, y: 300},
            isDrag: false,
        },
    ],
}

function createLine(txt = '') {
    return {
        txt,
        size: 50,
        align: 'center',
        color: 'white',
        font: 'impact',
        strokeStyle: 'black',
        pos: {x: 250, y: 250},
        isDrag: false,
        txtWidth: 0,
    }
}

function setLineTxt(txt) {
    if (gMeme.lines.length > 2) return
    if (gMeme.lines.length === 0) {
        const newTextLine = createLine(txt)
        gMeme.lines.push(newTextLine)
        return
    }
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

function changeAlign(dir, elCanvasWidth) {
    const {pos, txtWidth} = gMeme.lines[gMeme.selectedLineIdx];
    if (dir === 'left') pos.x = 10 + txtWidth / 2;
    else if (dir === 'right') pos.x = elCanvasWidth - 10 - txtWidth / 2;
    else pos.x = elCanvasWidth / 2;
}

function moveUp() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10
}

function moveDown() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += 10
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
    if (gMeme.lines.length === 0) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function isLineClicked(clickedPos) {
    let isLineClicked = false
    gMeme.lines.forEach((line, idx) => {
        const {pos, size, txtWidth} = line
        if (
            clickedPos.x > pos.x - txtWidth / 2  &&
            clickedPos.x < pos.x + txtWidth / 2  &&
            clickedPos.y > pos.y - size &&
            clickedPos.y < pos.y
        ) {
            gMeme.selectedLineIdx = idx
            isLineClicked = true
        }
    })
    return isLineClicked
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].pos.x += dx
    meme.lines[meme.selectedLineIdx].pos.y += dy
}