//Primero definí las variables de mi carrito 
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
let carrito = [];
//incluyo el evento "click"
document.querySelectorAll('.agregar-carrito').forEach((boton) => {
  boton.addEventListener('click', agregarAlCarrito); 
});
function agregarAlCarrito(event) {
    const articulo = event.target.parentNode;
    const titulo = articulo.querySelector('h3').textContent;
    const precioTexto = articulo.querySelector('p').textContent.replace('Precio: $', '');
    const precio = parseFloat(precioTexto);
  
    if (!isNaN(precio)) /* Esto lo incluí porque al darme el total del precio me aparecia NaN */ {
      // Variable para crear artículos
      const nuevoArticulo = { titulo, precio };
  
      // Función para agrega artículos al arreglo carrito
      carrito.push(nuevoArticulo);
             actualizarCarrito();
    }
  }

// Función para actualizar el carrito y mostrar los artículos acumulados
function actualizarCarrito() {

  listaCarrito.innerHTML = '';


  carrito.forEach((articulo) => {
    const nuevoItemCarrito = document.createElement('li');
    nuevoItemCarrito.innerHTML = `${articulo.titulo} - Precio: $${articulo.precio}`;
    listaCarrito.appendChild(nuevoItemCarrito);
  });

   // Eliminar los eventos "click" existentes de los botones "Eliminar"
   document.querySelectorAll('.eliminar-item').forEach((boton) => {
    boton.removeEventListener('click', eliminarDelCarrito);
  });

  // Agregar el evento "click" a los botones "Eliminar"
  document.querySelectorAll('.eliminar-item').forEach((boton) => {
    boton.addEventListener('click', eliminarDelCarrito);
    console.log('Evento de clic agregado al botón "Eliminar"')
  });

 // Agregar el evento "click" al contenedor del carrito para eliminar los artículos
 document.getElementById('lista-carrito').addEventListener('click', eliminarDelCarrito);


  // Función para calcular y mostrar el total del carrito
  function obtenerIndiceArticulo(articulo) {
    const listaArticulos = document.querySelectorAll('.articulo');
    for (let i = 0; i < listaArticulos.length; i++) {
      if (listaArticulos[i] === articulo) {
        return i;
      }
    }
    return -1; // Devolver -1 si no se encuentra el índice del artículo
  }

  const total = carrito.reduce((acumulador, articulo) => acumulador + articulo.precio, 0);
  totalCarrito.textContent = `Total: $${total}`;
} 
  // Función para eliminar un artículo del carrito
  function eliminarDelCarrito(event) {
    if (event.target.classList.contains('eliminar-item')) {
      // Obtener el botón "Eliminar" específico al que se le dio clic
      const botonEliminar = event.target;
      // Obtener el div padre del botón "Eliminar" que contiene el artículo
      const articulo = botonEliminar.parentNode;
      // Obtener el índice del artículo a eliminar
      const indice = obtenerIndiceArticulo(articulo);
  
      // Eliminar el artículo del arreglo carrito
      carrito.splice(indice, 1);
  
      // Actualizar el carrito
      actualizarCarrito();
    }
  }

// Función para guardar el carrito en el localStorage
function guardarCarrito() {
    // Se convierte el arreglo carrito a una cadena JSON
    const carritoJSON = JSON.stringify(carrito);
    
    // Se guarda la cadena JSON en el localStorage con la clave 'carrito'
    localStorage.setItem('carrito', carritoJSON);
  }
  
  // Función para cargar el carrito desde el localStorage
  function cargarCarrito() {
    // Se obtiene la cadena JSON almacenada en el localStorage con la clave 'carrito'
    const carritoJSON = localStorage.getItem('carrito');
  
    // Se utiliza el if para ver si hay una cadena JSON válida en el localStorage y la convierte de nuevo a un arreglo y la asigna a la variable carrito
    if (carritoJSON) {
      carrito = JSON.parse(carritoJSON);
    }
  
    // Función para actualizar el carrito
    actualizarCarrito();
  }
  