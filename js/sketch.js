initEvents();
makeArea();

function initEvents() {
    addSizeChange();
    addClear();
    addGradualShading();
}

function addSizeChange() {
    const sizeBtn = document.getElementById('size');
    sizeBtn.addEventListener('click', resize);
}

function addClear() {
    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', clear);
}

function addGradualShading() {
    const gradualBtn = document.getElementById('gradual');
    gradualBtn.addEventListener('click', () => toggleMode(gradualBtn, gradualShading));
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
        squares[i].style['filter'] = '';
    }
}

function toggleMode(btn, func) {
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        enableDraw();
    } else {
        btn.classList.add('active');
        enableDraw(func);
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
    resetMode();
}

function createSquare() {
    const square = document.createElement('div');
    square.classList.add('unit');
    return square;
}

function resetMode() {
    const mode = document.querySelector('.active');
    if (mode) mode.classList.remove('active');
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

function gradualShading(obj) {
    const re = /(?<=brightness\()[\d\.]+(?=\))/;
    const filter = obj.style.filter;
    let brightness = filter.match(re);
    if (brightness) {
        brightness = brightness[0] - 0.1;
        obj.style.filter = filter.replace(re, brightness);
    } else {
        brightness = 0.9;
        obj.style.filter = filter.concat(' brightness(' + brightness + ')');
    }
}
