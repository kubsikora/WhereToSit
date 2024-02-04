const draggableElement = document.getElementById('draggableElement');

let offsetX, offsetY, isDragging = false;

draggableElement.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
    draggableElement.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    draggableElement.style.transform = `translate(${x}px, ${y}px)`;
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;

    isDragging = false;
    draggableElement.style.cursor = 'grab';
});
