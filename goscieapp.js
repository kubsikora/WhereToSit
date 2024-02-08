const containerElement = document.getElementById('container');
const data = document.getElementById('data');
const storedList = localStorage.getItem('localmebli');
const listaElementow = storedList ? JSON.parse(storedList) : [];
let ilosc_miejsc = 1;

//data.innerHTML = JSON.stringify(listaElementow);

if (containerElement) {
    renderElementsFromJSON(containerElement, listaElementow);
}

function renderElementsFromJSON(container, jsonData) {
    const elements = jsonData;

    elements.forEach((elementData) => {
        if(elementData.type=="krzeslo"){
            const newElement = document.createElement('div');
            newElement.style.width = '20px';
            newElement.style.height = '20px';
            newElement.style.backgroundColor = 'red';
            newElement.style.position = 'absolute';
            newElement.style.left = elementData.x + 'px';
            newElement.style.top = elementData.y + 100 + 'px';
            newElement.innerHTML = ilosc_miejsc;
            ilosc_miejsc += 1;
            container.appendChild(newElement);
        }
        if(elementData.type=="prostokat"){
            const newElement = document.createElement('div');
            newElement.style.width = '120px';
            newElement.style.height = '60px';
            newElement.style.backgroundColor = 'white';
            newElement.style.position = 'absolute';
            newElement.style.left = elementData.x - 20 +'px';
            newElement.style.top = elementData.y - 10 + 100 + 'px';
            newElement.style.border = '1px solid black';
            container.appendChild(newElement);
        }
        if(elementData.type=="prostokat90"){
            const newElement = document.createElement('div');
            newElement.style.width = '60px';
            newElement.style.height = '120px';
            newElement.style.backgroundColor = 'white';
            newElement.style.position = 'absolute';
            newElement.style.left = elementData.x - 20 +'px';
            newElement.style.top = elementData.y + 100 - 10 + 'px';
            newElement.style.border = '1px solid black';
            container.appendChild(newElement);
        }
        if(elementData.type=="kolo"){
            const newElement = document.createElement('div');
            newElement.style.width = '60px';
            newElement.style.height = '60px';
            newElement.style.backgroundColor = 'white';
            newElement.style.position = 'absolute';
            newElement.style.left = elementData.x - 20 +'px';
            newElement.style.top = elementData.y + 100 - 10 + 'px';
            newElement.style.border = '1px solid black';
            newElement.style.borderRadius = '50%';
            container.appendChild(newElement);
        }
        if(elementData.type=="kwadrat"){
            const newElement = document.createElement('div');
            newElement.style.width = '60px';
            newElement.style.height = '60px';
            newElement.style.backgroundColor = 'white';
            newElement.style.position = 'absolute';
            newElement.style.left = elementData.x - 20 +'px';
            newElement.style.top = elementData.y + 100 - 10 + 'px';
            newElement.style.border = '1px solid black';
            container.appendChild(newElement);
        }

    });
}

document.getElementById('fileInput').addEventListener('change', handleFile);
let pobranyJSON = [];
function handleFile() {
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const fileContent = JSON.parse(e.target.result);
                data.innerHTML = JSON.stringify(fileContent);
                containerElement.innerHTML = '';
                ilosc_miejsc = 1;
                renderElementsFromJSON(containerElement, fileContent);
                pobranyJSON.push(JSON.stringify(fileContent));
            } catch (error) {
                console.error('Error parsing JSON:', error);
                data.innerHTML = 'Invalid JSON file';
            }
        };

        reader.readAsText(file);
    } else {
        data.innerHTML = 'No file selected';
    }
}

const wczytajbutton = document.getElementById('wczytaj');
const zapiszbutton = document.getElementById('zapisz');
const savesystem = document.getElementById('savesystem');

wczytajbutton.addEventListener('click', () => {
    wczytajbutton.style.color = 'red';
    zapiszbutton.style.color = 'black';
    savesystem.innerHTML = '<input type="file" id="fileInput"><button onclick="handleFile()">Load File</button>\n' +
        '    <div id="fileContent"></div>';
});

zapiszbutton.addEventListener('click', () => {
    wczytajbutton.style.color = 'black';
    zapiszbutton.style.color = 'red';

    const downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.textContent = 'Download Layout';
    downloadButton.addEventListener('click', downloadTextFile);

    savesystem.innerHTML = '';
    savesystem.appendChild(downloadButton);
});

function downloadTextFile() {
    const content = storedList;
    const fileName = 'WhereToSitLayout.txt';

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

const editableList = document.getElementById('inputright');
const List = document.getElementById('List');
const Group = document.getElementById('Group');

Listinput();

Group.addEventListener('click', () => {
    Group.style.color = 'red';
    List.style.color = '';
    editableList.innerHTML = '';
    if(pobranyJSON.length > 10){
        editableList.innerHTML = JSON.stringify(znajdzElementyDoStolu(pobranyJSON));
    }else{
        editableList.innerHTML = JSON.stringify(countChairsAtTables(znajdzElementyDoStolu(storedList)));
    }

});

List.addEventListener('click', () => {
    List.style.color = 'red';
    Group.style.color = '';
    editableList.innerHTML = '';
    Listinput();
});

function countChairsAtTables(data) {
    const tableChairsCount = {}; // Obiekt do przechowywania liczby krzeseł przy każdym stole

    // Iteruj po kluczach obiektu (założenie: klucze to nazwy pokojów)
    Object.keys(data).forEach(roomKey => {
        const roomData = data[roomKey];
        const chairs = Array.isArray(roomData.krzeslo) ? roomData.krzeslo : [roomData.krzeslo]; // Sprawdź, czy chairs jest tablicą
        const tables = roomData.stoly || []; // Pobierz listę stołów w danym pokoju

        tables.forEach(table => {
            const tableId = table.id;
            tableChairsCount[tableId] = 0; // Inicjalizuj liczbę krzeseł przy danym stole na 0

            chairs.forEach(chair => {
                const chairX = chair.x;
                const chairY = chair.y;
                const chairType = chair.type;

                // Sprawdź, czy krzesło znajduje się w obszarze stołu (załóżmy prostokątny obszar stołu)
                if (
                    chairX > table.x && chairX < (table.x + table.width) &&
                    chairY > table.y && chairY < (table.y + table.height)
                ) {
                    tableChairsCount[tableId]++;
                }
            });
        });
    });

    return tableChairsCount;
}


function Listinput(){
    // Dodaj początkowe elementy do listy
    for(let i = 1; i < ilosc_miejsc; i++){
        addListItem(`${i}`);
    }

// Funkcja do dodawania nowego elementu do listy
    function addListItem(text) {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<span><h3 style="float: left; margin-top: 15px; margin-left: 10px;">${text}</h3></span> 
    <input type="text" id="name${text}" name="name${text}" style="float: left; margin-top: 20px; width: 300px; margin-left: 20px;">`;
        listItem.style.border = '1px solid black';
        listItem.style.height = '70px';
        editableList.appendChild(listItem);
    }
}

function Groupinput(){
    // Dodaj początkowe elementy do listy
    for(let i = 1; i < ilosc_miejsc; i++){
        addListItem(`${i}`);
    }

// Funkcja do dodawania nowego elementu do listy
    function addListItem(text) {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<span><h3 style="float: left; margin-top: 15px; margin-left: 10px;">${text}</h3></span> 
    <input type="text" id="name${text}" name="name${text}" style="float: left; margin-top: 20px; width: 300px; margin-left: 20px;">`;
        listItem.style.border = '1px solid black';
        listItem.style.height = '70px';
        editableList.appendChild(listItem);
    }
}


function znajdzElementyDoStolu(elementy, progOdleglosci = 30) {
    try {
        const parsedElementy = JSON.parse(elementy);

        if (!Array.isArray(parsedElementy)) {
            console.error("Sparsowany obiekt nie jest tablicą.");
            return [];
        }

        const stoly = parsedElementy.filter(element => ['prostokat90', 'prostokat', 'kolo', 'kwadrat'].includes(element.type));
        const krzesla = parsedElementy.filter(element => element.type === 'krzeslo');

        if (stoly.length === 0) {
            console.error("Nie znaleziono stołów w elementach.");
            return [];
        }

        const krzeslaDoStolu = [];

        for (const krzeslo of krzesla) {
            const stolyBliskoKrzesla = stoly.filter(stol => {
                const szerokoscStolu = (stol.type === 'kolo') ? 60 : (stol.type === 'kwadrat' ? 60 : 120);
                const wysokoscStolu = (stol.type === 'kolo') ? 60 : (stol.type === 'kwadrat' ? 60 : 120);

                // Obliczanie granic stołu
                const lewaGranicaStolu = stol.x - szerokoscStolu / 2;
                const prawaGranicaStolu = stol.x + szerokoscStolu / 2;
                const gornaGranicaStolu = stol.y - wysokoscStolu / 2;
                const dolnaGranicaStolu = stol.y + wysokoscStolu / 2;

                // Obliczanie granic krzesła
                const promienKola = 30; // Dla krzesła typu kolo
                const lewaGranicaKrzesla = krzeslo.x - ((krzeslo.type === 'kolo') ? promienKola : 10);
                const prawaGranicaKrzesla = krzeslo.x + ((krzeslo.type === 'kolo') ? promienKola : 10);
                const gornaGranicaKrzesla = krzeslo.y - ((krzeslo.type === 'kolo') ? promienKola : 10);
                const dolnaGranicaKrzesla = krzeslo.y + ((krzeslo.type === 'kolo') ? promienKola : 10);

                // Sprawdzanie czy krzesło jest w odpowiedniej odległości od stołu
                return lewaGranicaKrzesla < prawaGranicaStolu &&
                    prawaGranicaKrzesla > lewaGranicaStolu &&
                    gornaGranicaKrzesla < dolnaGranicaStolu &&
                    dolnaGranicaKrzesla > gornaGranicaStolu;
            });

            krzeslaDoStolu.push({
                krzeslo: krzeslo,
                stoly: stolyBliskoKrzesla,
            });
        }

        return krzeslaDoStolu;
    } catch (error) {
        console.error("Błąd podczas parsowania elementów:", error);
        return [];
    }
}


const krzeslaDoStolu = znajdzElementyDoStolu(storedList);

data.innerHTML = JSON.stringify(krzeslaDoStolu);


