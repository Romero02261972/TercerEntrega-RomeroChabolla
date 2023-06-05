//Primero definí las variables de mi carrito 
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const carrito = [];
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
  // Se limpia la lista del carrito antes de mostrar los artículos
  listaCarrito.innerHTML = '';

  // Función para recorrer los artículos en el carrito y mostrarlos en la lista
  carrito.forEach((articulo) => {
    const nuevoItemCarrito = document.createElement('li');
    nuevoItemCarrito.innerHTML = `${articulo.titulo} - Precio: $${articulo.precio}`;
    listaCarrito.appendChild(nuevoItemCarrito);
  });

  // Función para calcular y mostrar el total del carrito
  const total = carrito.reduce((acumulador, articulo) => acumulador + articulo.precio, 0);
  totalCarrito.textContent = `Total: $${total}`;
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
  