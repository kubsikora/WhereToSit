const containerElement = document.querySelector('.container');
const XY = document.getElementById('XY');
let currentElementNumber = 1;
const smietnikElement = document.querySelector('.smietnik');

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;

    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left + 50;
        offsetY = event.clientY - element.getBoundingClientRect().top + 50;
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        const containerRect = containerElement.getBoundingClientRect();
        const maxX = containerRect.width - element.offsetWidth;
        const maxY = containerRect.height - element.offsetHeight;

        if (x >= 0 && x <= maxX && y >= 0 && y <= maxY) {
            element.style.transform = `translate(${x}px, ${y}px)`;
            XY.innerHTML = `x: ${x.toFixed(0)} y: ${y.toFixed(0)}`;
        }
        const smietnikRect = smietnikElement.getBoundingClientRect();
        if (
            x >= smietnikRect.left &&
            x <= smietnikRect.right &&
            y >= smietnikRect.top &&
            y <= smietnikRect.bottom
        ) {
            containerElement.removeChild(element);
            if (element.classList.contains('krzeslo')) {
                currentElementNumber -= 1;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        element.style.cursor = 'grab';
    });
}

const addButtonKwadrat = document.getElementById('addButtonkwadrat');
const addButtonProstokat = document.getElementById('addButtonprostokat');
const addButtonProstokat90 = document.getElementById('addButtonprostokat90');
const addButtonkolo = document.getElementById('addButtonkolo');
const addButtonkrzeslo = document.getElementById('addButtonkrzeslo');

addButtonKwadrat.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'kwadrat';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '50px';
    newDraggableElement.style.top = '50px';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonProstokat.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '50px';
    newDraggableElement.style.top = '50px';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonProstokat90.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat90';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '50px';
    newDraggableElement.style.top = '50px';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonkolo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'kolo';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '50px';
    newDraggableElement.style.top = '50px';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonkrzeslo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'krzeslo';
    newDraggableElement.style.position = 'absolute';

    newDraggableElement.style.left = '50px';
    newDraggableElement.style.top = '50px';
    containerElement.appendChild(newDraggableElement);
    newDraggableElement.innerHTML = currentElementNumber;
    currentElementNumber = currentElementNumber + 1;

    makeDraggable(newDraggableElement);
});
makeDraggable(smietnikElement);

