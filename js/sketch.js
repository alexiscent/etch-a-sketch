makeArea();

function makeArea() {
    const area = document.getElementById('sketch');
    const size = getComputedStyle(area).getPropertyValue('--size') ** 2;
    const squares = [];
    for (let i = 0; i < size; i++) {
        squares.push(createSquare());
    }
    area.replaceChildren(...squares);
}

function createSquare() {
    const square = document.createElement('div');
    square.classList.add('unit');
    return square;
}