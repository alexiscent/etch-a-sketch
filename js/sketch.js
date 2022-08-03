makeArea();

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
