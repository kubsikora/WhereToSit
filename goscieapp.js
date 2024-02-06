const containerElement = document.getElementById('container');

const data = document.getElementById('data');
const storedList = localStorage.getItem('localmebli');
const listaElementow = storedList ? JSON.parse(storedList) : [];
data.innerHTML = JSON.stringify(listaElementow);

function renderElementsFromJSON(jsonData) {

    const elements = JSON.parse(jsonData);

    elements.forEach((elementData) => {
        const newElement = document.createElement('div');
        newElement.style.width = '20px';
        newElement.style.height = '20px';
        newElement.style.backgroundColor = 'red';
        newElement.style.position = 'absolute';
        newElement.style.left = elementData.x + 'px';
        newElement.style.top = elementData.y + 'px';
        containerElement.appendChild(newElement);
    });
}

