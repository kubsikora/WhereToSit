const containerElement = document.querySelector('.container');
const XY = document.getElementById('XY');
const data = document.getElementById('data');
let currentElementNumber = 1, NumberKrzesla = 1, NumberKwadrat = 1, NumberProstokat = 1, NumberProstokat90 = 1, NumberKolo = 1, listaint = 0;
const smietnikElement = document.querySelector('.smietnik');
const localmebli = []; // zawiera kazdy element z lokalizacja
const meble = []; //zawiera ponumerowane meble
let ultimjsonData = "";


function makeDraggable(element) {
    const uniqueId = generateUniqueId();
    element.id = uniqueId;

    let offsetX, offsetY, isDragging = false;
    let mainx = 0, mainy = 0;
    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left + 50;
        offsetY = event.clientY - element.getBoundingClientRect().top + 50;
        element.style.cursor = 'grabbing';
        const listaElementow = pobierzListeElementow();
        const listaElementowString = JSON.stringify(listaElementow, null, 2);
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        const containerRect = containerElement.getBoundingClientRect();
        const maxX = containerRect.width - element.offsetWidth;
        const maxY = containerRect.height - element.offsetHeight;

        mainx = x;
        mainy = y;

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
                if (elementIndex != NumberKrzesla) {
                    NumberKrzesla -= 1;
                }
            }
            containerElement.removeChild(element);
            if (element.classList.contains('krzeslo')) {
                currentElementNumber -= 1;

            }
            usunElementZListyTekstem(meble, element.className);

        }
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        element.style.cursor = 'grab';

        const position = { id: element.id, x: mainx, y: mainy, type: element.className };
        const existingIndex = localmebli.findIndex((item) => item.id === element.id);


        if (existingIndex !== -1) {
            localmebli.splice(existingIndex, 1);
        }

        if (isElementInTrashArea(element)) {
            containerElement.removeChild(element);
        } else {
            localmebli.push(position);
        }
        ultimjsonData = JSON.stringify(localmebli);
        if (listaint === 1) {
            listaramka(JSON.stringify(localmebli));
        }


    });
}
function countOccurrences(list) {
    const occurrences = [];

    for (const element of list) {
        const existingIndex = occurrences.findIndex(item => item.element === element);

        if (existingIndex !== -1) {
            occurrences[existingIndex].count++;
        } else {
            occurrences.push({ element, count: 1 });
        }
    }

    return occurrences;
}
function listaramka(jsonData) {
    const wordsArray = jsonData.split(',');
    const typy = [];

    for (let i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i].includes("type")) {
            if (i === wordsArray.length - 1) {
                typy.push(wordsArray[i].substring(8, wordsArray[i].length - 3))
            } else {
                typy.push(wordsArray[i].substring(8, wordsArray[i].length - 2))
            }
        }
    }

    // Update meble array with current elements on the board
    meble.length = 0;
    const elements = document.querySelectorAll('.container div');
    elements.forEach((element) => {
        meble.push(element.className);
    });

    const sumowaniemebli = countOccurrences(typy);

    if (sumowaniemebli.length === 0) {
        data.innerHTML = 'Here, you will see how many objects you have added to the board.'
    } else {
        // Generate the table based on the sumowaniemebli array
        const tableRows = sumowaniemebli.map((item) => {
            return `<tr style="border: 1px solid rgba(0, 0, 0, 0.98); width: 100px; height: 40px;">
                        <td style="border-right: 1px solid rgba(0, 0, 0, 0.98);">${item.element}</td>
                        <td>${item.count}</td>
                    </tr>`;
        });

        const tableHTML = `<br><center><table style="text-align: center;">
                                <tr style="border: 1px solid rgba(0, 0, 0, 0.98); width: 100px; height: 40px;">
                                    <td style="border-right: 1px solid rgba(0, 0, 0, 0.98);" width="100px">type</td>
                                    <td width="100px">number</td>
                                </tr>
                                ${tableRows.join('')}
                            </table></center>`;

        data.innerHTML = tableHTML;
    }
}
    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9); // Prosta funkcja generująca unikalny identyfikator
    }

function isElementInTrashArea(element) {
        const elementRect = element.getBoundingClientRect();
        const trashRect = smietnikElement.getBoundingClientRect();

        return (
            elementRect.left >= trashRect.left &&
            elementRect.right <= trashRect.right &&
            elementRect.top >= trashRect.top &&
            elementRect.bottom <= trashRect.bottom
        );
    }

    function restoreBlocksFromLocalStorage() {
        const savedBlocks = localStorage.getItem('savedBlocks');
        if (savedBlocks) {
            const parsedBlocks = JSON.parse(savedBlocks);
            parsedBlocks.forEach((position) => {
                const newDraggableElement = document.createElement('div');
                newDraggableElement.className = position.type;
                newDraggableElement.style.position = 'absolute';
                newDraggableElement.style.left = position.x + 'px';
                newDraggableElement.style.top = position.y + 'px';
                containerElement.appendChild(newDraggableElement);
                makeDraggable(newDraggableElement);
            });
        }
    }


    restoreBlocksFromLocalStorage();

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
    newDraggableElement.style.top = '70px';
    containerElement.appendChild(newDraggableElement);
    meble.push('kwadrat');
    NumberKwadrat += 1;
    makeDraggable(newDraggableElement);
});

addButtonProstokat.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '70px';
    containerElement.appendChild(newDraggableElement);
    meble.push('prostokat');
    NumberProstokat += 1;
    makeDraggable(newDraggableElement);
});

addButtonProstokat90.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'prostokat90';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '70px';
    containerElement.appendChild(newDraggableElement);
    meble.push('prostokat90');
    makeDraggable(newDraggableElement);
});

addButtonkolo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'kolo';
    newDraggableElement.style.position = 'absolute';
    newDraggableElement.style.left = '60px';
    newDraggableElement.style.top = '70px';
    containerElement.appendChild(newDraggableElement);
    meble.push('kolo');
    NumberKolo += 1;
    makeDraggable(newDraggableElement);
});

addButtonkrzeslo.addEventListener('click', () => {
    const newDraggableElement = document.createElement('div');
    newDraggableElement.className = 'krzeslo';
    newDraggableElement.style.position = 'absolute';

    newDraggableElement.style.left = '80px';
    newDraggableElement.style.top = '80px';
    containerElement.appendChild(newDraggableElement);
    newDraggableElement.innerHTML = currentElementNumber;
    currentElementNumber = currentElementNumber + 1;
    meble.push('krzeslo');
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

const info = document.getElementById('info');
const infoprint = document.getElementById('infoprint');
const lista = document.getElementById('lista');
const listaprint = document.getElementById('listaprint');
const dalej = document.getElementById('dalej');
const dalejprint = document.getElementById('dalejprint');

info.addEventListener('click', () => {
    listaint = 0;
    /*infoprint.style.visibility = 'visible';
    listaprint.style.visibility = 'hidden';
    dalejprint.style.visibility = 'hidden';*/
    data.innerHTML = "Hello! This is your simple and convenient tool for organizing guest seating at your event. Below, you can find tables and seats that you can use on the board. " +
        "If you add too much, don't worry. All you need to do is drag it to the 'DROP' at the top right corner to delete it. In the 'List' category above, " +
        "you can check how many seats or tables of each kind you have in your project. When you've finalized everything and are ready to proceed, click the " +
        "'Next' button. Have fun!";
});

lista.addEventListener('click', () => {
    listaint = 1;
    /*infoprint.style.visibility = 'hidden';
    listaprint.style.visibility = 'visible';
    dalejprint.style.visibility = 'hidden';*/
    listaramka(ultimjsonData);
});

dalej.addEventListener('click', () => {
    listaint = 0;
    /*infoprint.style.visibility = 'hidden';
    listaprint.style.visibility = 'hidden';
    dalejprint.style.visibility = 'visible';*/
    data.innerHTML = JSON.stringify(localmebli);
});


