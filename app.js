
let stockProductos = [
    {id: 1, nombre: "Humahuaca", tipo: "", cantidad: 1, desc: "Tu Proximo Destino", precio: 20400, Distancia: "M", img: './img/001.jpg'},
    {id: 2, nombre: "Purmamarca", tipo: "", cantidad: 1, desc: "Tu Proximo Destino", precio: 16500, Distancia: "C", img: './img/002.jpg'},
    {id: 3, nombre: "Iruya", tipo: "", cantidad: 1, desc: "Tu Proximo Destino", precio: 24700, Distancia: "L", img: './img/003.jpg'},
    {id: 4, nombre: "Cafayate", tipo: "", cantidad: 1, desc: "Tu Proximo Destino", precio: 31500, Distancia: "L", img: './img/004.jpg'},
    {id: 5, nombre: "Cabra Corral", tipo: "", cantidad: 1, desc: "Tu Proximo Destino", precio: 26200, Distancia: "M", img: './img/005.jpg'},
    {id: 6, nombre: "La Cienaga", tipo: "", cantidad: 1, desc: "Tu Proximo Destino", precio: 11000, Distancia: "C", img: './img/006.jpg'},   
]



const contenedorProductos = document.getElementById('contenedor-productos')


// INYECTAR EL HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Distancia: ${producto.Distancia}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    // EL HTML EN EL DOM:
    const boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        
    })
})



//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)//Trabajamos con las ID

        carrito.push(item)
    }

    actualizarCarrito() 
}



const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {

    //LOS APPENDS SE VAN ACUMULANDO 
    contenedorCarrito.innerHTML = "" 


    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //
    contadorCarrito.innerText = carrito.length 

    //
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //
}



const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')
//MODIFICA LOS CONTADORES
const contadorCarrito = document.getElementById('contadorCarrito')

//
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
