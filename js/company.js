let data = [];

// Cargar desde localstorage
document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("data")) {
    const req = await fetch("../data/data.json");
    data = await req.json();
  } else {
    data = JSON.parse(localStorage.getItem("data"));
  }

  updateData();
});

// Agregar personajes
const form = document.querySelector("#register");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const characterId = formData.get("character-id"); 
  const characterName = formData.get("character-name"); 

  const itemExists = data.find((item) => {
    return item.id == characterId && item.name == characterName;
  });

  if (itemExists) {
    alert("This Character is Already registered");
    return;
  }

  data.push({
    id: characterId,
    name: characterName,
    appearances: 1,  
  });

  updateData();
});

// Funcion que debe ser ejecutada cada vez que se modifique el arreglo
function updateData() {
  // Guardar Cambios
  localStorage.setItem("data", JSON.stringify(data));

  // Mostrar cambios en pantalla
  printData();
}

// Mostrar Datos
function printData() {
  const imgContainer = document.querySelector("#img-characters");
  const table = document.querySelector("#table-characters");

  imgContainer.innerHTML = "";
  table.innerHTML = "";

  // Ordenar por número de apariciones
  data.sort((a, b) => b.appearances - a.appearances);

  for (const item of data) {
    addCharacterToTable(item);
  }

  // Ordenar por ID
  data.sort((a, b) => b.id - a.id);

  for (const item of data) {
    addCharacterImg(item);
  }
}

function addCharacterImg(item) {
  const imgContainer = document.querySelector("#img-characters");
  const img = document.createElement("img");
  img.src = `../img/${item.name}-${item.id}.jpg`;  // Cambiado para usar nombre de personaje
  imgContainer.appendChild(img);
  img.classList.add("image-section__img");

  img.addEventListener("click", () => {
    item.appearances++;  // Incrementa las apariciones

    updateData();
  });
}

function addCharacterToTable(item) {
  const table = document.querySelector("#table-characters");
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.appearances}</td>
  `;

  table.appendChild(tr);
}
