const containerElement = document.querySelector('.container');
const XY = document.getElementById('XY');

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;

    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        const containerRect = containerElement.getBoundingClientRect();
        const maxX = containerRect.width - element.offsetWidth - 100;
        const maxY = containerRect.height - element.offsetHeight - 100;

        if (x >= 0 && x <= maxX && y >= 0 && y <= maxY) {
            element.style.transform = `translate(${x}px, ${y}px)`;
            XY.innerHTML = `x: ${x.toFixed(0)} y: ${y.toFixed(0)}`;
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
addButtonKwadrat.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'kwadrat';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonProstokat.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonProstokat90.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat90';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});

addButtonkolo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'kolo';
    containerElement.appendChild(newDraggableElement);

    makeDraggable(newDraggableElement);
});
