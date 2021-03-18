const listaCursos = document.querySelector('.lista-cursos');
const carrito = document.querySelector('.final-lista');
const contenedorCarrito = document.querySelector('.final-lista');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {

  // Cuando agregas un curso presionando Agregar al Carrito
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito

  carrito.addEventListener('click', eliminarCurso);

}

//Funciones

function agregarCurso(e) {
  if(e.target.classList.contains('agregar-carrito') ) {
    const cursoSeleccionado = e.target.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if(e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    
    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}


// Leer el contenido html

function leerDatosCurso (curso) {

  // Crear objeto con contenido curso actual

  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h3').textContent,
    precio: curso.querySelector('p').textContent,
    id: curso.querySelector('button').getAttribute('data-id'),
    cantidad: 1,

  }

  // Revisa si un elemento ya existe en el carrito

  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

  if(existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna objeto actualizado
      } else {
        return curso;  // retorna objetos que no son duplicados
      }
    });

    articulosCarrito = [...cursos];
  } else {
    // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  // Agregar elementos al array carrito

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra carrito compras en html

function carritoHTML() {

  // Limpiar el HTML
    limpiarHTML();

  // Recorre carrito y genera HTML
  articulosCarrito.forEach( curso => {
    // Simplificamos el innerHTML agregando el .curso en una variable
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100";
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
      </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);

  })
}

// Elimina los cursos del tbody

function limpiarHTML() {

  // forma lenta
  // contenedorCarrito.innerHTML = '';

  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)

  }
}