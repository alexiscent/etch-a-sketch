initEvents();
makeArea();

function initEvents() {
    addSizeChange();
    addClear();
}

function addSizeChange() {
    const sizeBtn = document.getElementById('size');
    sizeBtn.addEventListener('click', resize);
}

function addClear() {
    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', clear);
}

function resize() {
    const newSize = prompt('Enter new size');
    if (+newSize <= 100) {
        const area = document.getElementById('sketch');
        area.style.setProperty('--size', newSize);
        makeArea();
    }
}

function clear() {
    const squares = document.getElementsByClassName('unit');
    for (let i = 0; i < squares.length; i++) {
        squares[i].style['background-color'] = '';
    }
}

function makeArea() {
    const area = document.getElementById('sketch');
    const size = getComputedStyle(area).getPropertyValue('--size') ** 2;
    const squares = [];
    for (let i = 0; i < size; i++) {
        squares.push(createSquare());
    }
    area.replaceChildren(...squares);
    enableDraw();
}

function createSquare() {
    const square = document.createElement('div');
    square.classList.add('unit');
    return square;
}

function enableDraw(func = draw) {
    const squares = document.getElementsByClassName('unit');
    for (let i = 0; i < squares.length; i++) {
        squares[i].onmouseenter = (() => func(squares[i]));
    }
}

function draw(obj) {
    obj.style['background-color'] = 'black';
}
