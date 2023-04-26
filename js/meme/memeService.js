'use strict'

const gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'white', font: 'impact', strokeStyle: 'red'},
    ],
}

function setLineTxt(txt) {
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
