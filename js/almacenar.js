let estudiantes = [];

function cargarEstudiantes() {
  const nombresGuardados = localStorage.getItem('nombres');
  
  if (nombresGuardados) {
    estudiantes = JSON.parse(nombresGuardados);
  }
  
  mostrarListado(estudiantes);
}

function mostrarListado(array) {
  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = '';  
  
  array.forEach(estudiante => {
    contenedor.innerHTML += `<li class="list-group-item">${estudiante}</li>`;
  });
}

document.getElementById("agregar").addEventListener("click", function() {
  let nuevoNombre = document.getElementById("item").value.trim();
  
  if (nuevoNombre.length > 0) {
    estudiantes.push(nuevoNombre); 
    localStorage.setItem('nombres', JSON.stringify(estudiantes));
    mostrarListado(estudiantes); 
    document.getElementById("item").value = '';  
  } else {
    alert('Por favor, ingrese un nombre válido');
  }
});

document.getElementById("limpiar").addEventListener("click", function() {
  estudiantes = []; 
  localStorage.removeItem('nombres');  
  mostrarListado(estudiantes); 
});

window.onload = cargarEstudiantes;
