// PRODUCTOS
const productos = [
    // DELINEADOR
    {
        id: "delineador-001",
        titulo: "Delineador 001",
        imagen: "./img/delineador/delineador-1.webp",
        categoria: {
            nombre: "Delineador",
            id: "delineador"
        },
        precio: 2500
    },
    {
        id: "delineador-002",
        titulo: "Delineador 002",
        imagen: "./img/delineador/delineador-2.webp",
        categoria: {
            nombre: "Delineador",
            id: "delineador"
        },
        precio: 2500
    },
    {
        id: "delineador-003",
        titulo: "Delineador 003",
        imagen: "./img/delineador/delineador-3.webp",
        categoria: {
            nombre: "Delineador",
            id: "delineador"
        },
        precio: 2500
    },
    {
        id: "delineador-004",
        titulo: "Delineador 004",
        imagen: "./img/delineador/delineador-4.webp",
        categoria: {
            nombre: "Delineador",
            id: "delineador"
        },
        precio: 2500
    },


    //LABIALES
    
    {
        id: "labial-001",
        titulo: "Labial 001",
        imagen: "./img/labiales/labial-1.webp",
        categoria: {
            nombre: "Labiales",
            id: "labiales"
        },
        precio: 1000
    },
    {
        id: "labial-002",
        titulo: "Labial 002",
        imagen: "./img/labiales/labial-2.webp",
        categoria: {
            nombre: "Labiales",
            id: "labiales"
        },
        precio: 1000
    },
    {
        id: "labial-003",
        titulo: "Labial 003",
        imagen: "./img/labiales/labial-3.webp",
        categoria: {
            nombre: "Labiales",
            id: "labiales"
        },
        precio: 1000
    },
    {
        id: "labial-004",
        titulo: "Labial 004",
        imagen: "./img/labiales/labial-4.webp",
        categoria: {
            nombre: "Labiales",
            id: "labiales"
        },
        precio: 1000
    },
    {
        id: "labial-005",
        titulo: "Labial 005",
        imagen: "./img/labiales/labial-5.webp",
        categoria: {
            nombre: "Labiales",
            id: "labiales"
        },
        precio: 1000
    },


    //MASCARA DE PESTAÑAS

    {
        id: "mascara-de-pestañas-001",
        titulo: "Mascara de pestaña 001",
        imagen: "./img/mascara-pestanas/mascara-pestanas-1.webp",
        categoria: {
            nombre: "Mascara de pestaña",
            id: "mascara-de-pestañas"
        },
        precio: 4500
    },
    {
        id: "mascara-de-pestañas-002",
        titulo: "Mascara de pestaña 002",
        imagen: "./img/mascara-pestanas/mascara-pestanas-2.webp",
        categoria: {
            nombre: "Mascara de pestaña",
            id: "mascara-de-pestañas"
        },
        precio: 4500
    },
    {
        id: "mascara-de-pestañas-003",
        titulo: "Mascara de pestaña 003",
        imagen: "./img/mascara-pestanas/mascara-pestanas-3.webp",
        categoria: {
            nombre: "Mascara de pestaña",
            id: "mascara-de-pestañas"
        },
        precio: 4500
    },
    {
        id: "mascara-de-pestañas-004",
        titulo: "Mascara de pestaña 004",
        imagen: "./img/mascara-pestanas/mascara-pestanas-4.webp",
        categoria: {
            nombre: "Mascara de pestaña",
            id: "mascara-de-pestañas"
        },
        precio: 4500
    },
    {
        id: "mascara-de-pestañas-005",
        titulo: "Mascara de pestaña 005",
        imagen: "./img/mascara-pestanas/mascara-pestanas-5.webp",
        categoria: {
            nombre: "Mascara de pestaña",
            id: "mascara-de-pestañas"
        },
        precio: 4500
    },


    //SOMBRA DE OJOS

    {
        id: "sombra-de-ojos-001",
        titulo: "Sombra de ojos 001",
        imagen: "./img/sombra-de-ojos/sombra-de-ojos-1.webp",
        categoria: {
            nombre: "Sombra de ojos",
            id: "sombra-de-ojos"
        },
        precio: 9000
    },
    {
        id: "sombra-de-ojos-002",
        titulo: "Sombra de ojos 002",
        imagen: "./img/sombra-de-ojos/sombra-de-ojos-2.webp",
        categoria: {
            nombre: "Sombra de ojos",
            id: "sombra-de-ojos"
        },
        precio: 9000
    },
    {
        id: "sombra-de-ojos-003",
        titulo: "Sombra de ojos 003",
        imagen: "./img/sombra-de-ojos/sombra-de-ojos-3.webp",
        categoria: {
            nombre: "Sombra de ojos",
            id: "sombra-de-ojos"
        },
        precio: 9000
    },
];




const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio.toLocaleString("es-AR")}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>`;

        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar ();
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
            
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        

    })
})

function actualizarBotonesAgregar () {

    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let  productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();

} else {
    productosEnCarrito = [];

}

function agregarAlCarrito (e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {

    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}