const containerElement = document.querySelector('.container');
const XY = document.getElementById('XY');
const data = document.getElementById('data');
let currentElementNumber = 1, NumberKrzesla = 1, NumberKwadrat = 1, NumberProstokat = 1, NumberProstokat90 = 1, NumberKolo = 1;
const smietnikElement = document.querySelector('.smietnik');
const meble = [];

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;

    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left + 50;
        offsetY = event.clientY - element.getBoundingClientRect().top + 50;
        element.style.cursor = 'grabbing';
        const listaElementow = pobierzListeElementow();
        const listaElementowString = JSON.stringify(listaElementow, null, 2);
        data.innerHTML = meble;
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

            const elementIndex = meble.findIndex((el) => el === element.className + element.innerHTML);
            if (elementIndex !== -1) {
                meble.splice(elementIndex, 1);
                if(elementIndex != NumberKrzesla){
                    NumberKrzesla -= 1;
                }
            }
            containerElement.removeChild(element);
            if (element.classList.contains('krzeslo')) {
                currentElementNumber -= 1;

            }
            if (element.className != 'krzeslo'){
                usunElementZListyTekstem(meble,element.className);
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
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '60px';
    containerElement.appendChild(newDraggableElement);
    meble.push('kwadrat' + nastepnyElement(meble,'kwadrat').toString());
    NumberKwadrat += 1;
    makeDraggable(newDraggableElement);
});

addButtonProstokat.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '60px';
    containerElement.appendChild(newDraggableElement);
    meble.push('prostokat' + nastepnyElement(meble,'prostokat').toString());
    NumberProstokat += 1;
    makeDraggable(newDraggableElement);
});

addButtonProstokat90.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat90';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '60px';
    containerElement.appendChild(newDraggableElement);
    meble.push('prostokat90' + nastepnyElement(meble,'prostokat90').toString());
    makeDraggable(newDraggableElement);
});

addButtonkolo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'kolo';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '60px';
    containerElement.appendChild(newDraggableElement);
    meble.push('kolo' + nastepnyElement(meble,'kolo').toString());
    NumberKolo += 1;
    makeDraggable(newDraggableElement);
});

addButtonkrzeslo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'krzeslo';
    newDraggableElement.style.position = 'absolute';

    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '60px';
    containerElement.appendChild(newDraggableElement);
    newDraggableElement.innerHTML = currentElementNumber;
    currentElementNumber = currentElementNumber + 1;
    meble.push('krzeslo' + NumberKrzesla);
    NumberKrzesla += 1;
    makeDraggable(newDraggableElement);
});
makeDraggable(smietnikElement);

function usunElementZListy(nazwaListy, element) {
    if (nazwaListy in window) {
        const index = window[nazwaListy].indexOf(element);
        if (index !== -1) {
            window[nazwaListy].splice(index, 1);
        }
    }
}

function usunElementZListyTekstem(nazwaListy, tekstCzesc) {
    let miejsce = 0;

    for(let i = nazwaListy.length - 1; i >= 0; i--) {
        if(nazwaListy[i].startsWith(tekstCzesc)) {
            miejsce = i;
            break;
        }
    }

    nazwaListy.splice(miejsce, 1);
}

function nastepnyElement(nazwaListy, tekstCzesc) {
    let miejsce = 0;
    if(nazwaListy.length>0) {
        for (let i = nazwaListy.length - 1; i >= 0; i--) {
            if (nazwaListy[i].startsWith(tekstCzesc)) {
                miejsce = i;
                break;
            }
        }

        if(nazwaListy[miejsce].substring(tekstCzesc.length).length==0){
            return 1;
        }else{
            return Number(nazwaListy[miejsce].substring(tekstCzesc.length)) + 1;
        }
    }
    return 1;
}

function pobierzListeElementow() {
    const elements = document.querySelectorAll('.container div');
    const listaElementow = [];

    elements.forEach((element) => {
        const pozycja = {
            x: element.style.left,
            y: element.style.top
        };

        listaElementow.push({
            nazwa: element.className,
            pozycja: pozycja
        });
    });

    return listaElementow;
}

