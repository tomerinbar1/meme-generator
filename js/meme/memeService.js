'use strict'

const KEY_MEMES = 'memes'
let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    saveBase: '',
    lines: [
        {
            txt: 'I eat Spagetti',
            size: 50,
            align: 'center',
            color: 'white',
            font: 'impact',
            strokeStyle: 'black',
            pos: {x: 200, y: 100},
            isDrag: false,
        },
        {
            txt: 'but I love Pizza!',
            size: 50,
            align: 'center',
            color: 'white',
            font: 'impact',
            strokeStyle: 'black',
            pos: {x: 200, y: 250},
            isDrag: false,
            textWidth: 0,
        },
    ],
}


function createLine(txt = '', size = 40, color = 'white', strokeStyle = 'black', pos = {x: 250, y: 100}) {
    return {
        txt,
        size,
        align: 'center',
        color,
        font: 'impact',
        strokeStyle,
        pos,
        isDrag: false,
        textWidth: 0,
    }
}

function getRandomText() {
    const lineList = [
        'Me checking the fridge again',
        'When you finally finish debugging',
        'The face I make when code works',
        'When you accidentally hit send',
        'Me trying to understand CSS',
        'When you find the missing semicolon',
        'Me after writing one line of code',
        'When you fix a bug on Friday',
        'Me after a 12 hour coding session',
        'When the client changes the requirements',
        'Me trying to stay awake',
        'When the code finally compiles',
        'Me trying to explain my code',
        'When you find a solution on Stack Overflow',
        'Me trying to merge conflicts',
    ]
    const randIdx = getRandomIntInclusive(0, lineList.length - 1)
    return lineList[randIdx]
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

function openSaveMeme(imgId) {
    const loadedMemes = loadFromStorage(KEY_MEMES)
    const meme = loadedMemes.find((meme) => meme.id === imgId)
    gMeme = meme
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
    const {pos, textWidth} = gMeme.lines[gMeme.selectedLineIdx]
    if (dir === 'left') pos.x = 10 + textWidth / 2
    else if (dir === 'right') pos.x = elCanvasWidth - 10 - textWidth / 2
    else pos.x = elCanvasWidth / 2
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
        const {pos, size, textWidth} = line
        if (
            clickedPos.x > pos.x - textWidth / 2 &&
            clickedPos.x < pos.x + textWidth / 2 &&
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


function saveMeme(base64) {
    gMeme.saveBase = base64
    gMeme.id = makeId()
    const memesFromStorage = loadFromStorage(KEY_MEMES) || []
    memesFromStorage.push(gMeme)
    saveToStorage(KEY_MEMES, memesFromStorage)
}

function getSavedMemes() {
    return loadFromStorage(KEY_MEMES) || []
}