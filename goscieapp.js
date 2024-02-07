const containerElement = document.getElementById('container');
const data = document.getElementById('data');
const storedList = localStorage.getItem('localmebli');
const listaElementow = storedList ? JSON.parse(storedList) : [];
let ilosc_miejsc = 1;

data.innerHTML = JSON.stringify(listaElementow);

if (containerElement) {
    renderElementsFromJSON(containerElement, listaElementow);
} else {
    console.error("Element with id 'container' not found.");
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
