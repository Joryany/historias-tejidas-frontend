import { useState, useEffect } from 'react';
import TarjetaProducto from '../components/TarjetaProducto';
import '../style.css'
import { Routes, Route, Link } from 'react-router-dom';
import ProductoDetalle from './ProductoDetalle';

function App() {

 const [productos, setProductos] = useState([]);   

 const [cargando, setCargando] = useState(true); 

 const [categoriaActual, setCategoriaActual] = useState("todos");

 useEffect(() => {
  
  fetch(`${import.meta.env.VITE_API_URL}/productos`)
    .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);  
        setCargando(false);    
 })
  .catch((error) => {
    console.error("Error al cargar los productos", error);
    setCargando(false);
    });
  }, []); // ejecutalo al inicio

  if (cargando) {
    return <div className='mensaje_carga'> 
    <h2>Cargando los productos...</h2>
    <h3>Agradecemos su paciencia.</h3>
    </div>
  }

  let productosAMostrar = productos;

  if (categoriaActual !== "todos") {
    productosAMostrar = productos.filter(function(producto) {
      return producto.categoria === categoriaActual;
    });
  }

  return (
    <div>
      <header>
        <img src="public/logo-sin-texto.png" alt="Logo de historias tejidas, un oso y conejos tejidos abrazando un corazón, con el nombre del emprendimiento en grande."/>

        <nav className='navegador_principal'>
          <a href="/">Inicio</a>
          <a href="/catalogo" id="nav__a--activo">Catálogo</a>
          <a href="/personaliza">Personaliza</a>
          <a href="/carrito" id="navegador_carrito-icono">Carrito</a>
        </nav>
      </header>

       <main>
        <section className="hero">
            <img src="public/flores-de-cerezo.png"
                alt="En un fondo rosado claro en la zona derecha hay flores de cerezo repartidas por dicha zona."/>
            <div className="hero-overlay"></div>
            <div className="container">
                <h2>Nuestras creaciones</h2>
                <h1>Encuentra algo que cuente tu historia</h1>
                <p>Explora nuestro trabajo y encuentra ese detalle que estabas buscando.</p>
            </div>
        </section>

        <div className='catalogo'>
            <section className="catalogo__buscadores">
              <div className="nav__catalogo">
                <button className={categoriaActual === "todos" ? "boton-categoria activo" : "boton-categoria"} onClick={() => setCategoriaActual("todos")}>Todos</button>
                  <button className={categoriaActual === "animales" ? "boton-categoria activo" : "boton-categoria"} onClick={() => setCategoriaActual("animales")}>Animales</button>
                  <button className={categoriaActual === "personajes" ? "boton-categoria activo" : "boton-categoria"}  onClick={() => setCategoriaActual("personajes")}>Personajes</button>
                  <button className={categoriaActual === "parejas" ? "boton-categoria activo" : "boton-categoria"} onClick={() => setCategoriaActual("parejas")}>Parejas</button>
                  <button className={categoriaActual === "regalo" ? "boton-categoria activo" : "boton-categoria"} onClick={() => setCategoriaActual("regalo")}>Regalos</button>
              </div>
            </section>

          <section className='tarjeta-container'>
            {productosAMostrar.map(function(producto) {
            return (
              <TarjetaProducto 
                key={producto.id}
                id={producto.id}
                nombre={producto.nombre} 
                precio={producto.precio} 
                imagen={producto.imagen}
                alt={producto.alt}
              />
            );  
            })}
          </section>
        </div>
      </main>

      <footer>
      <div className="footer-container">

        <div className="footer-marca">
          <img src="public/logo-sin-texto.png" alt="Logo de Historias Tejidas"/>
          <h2>Historias Tejidas</h2>
        </div>

        <div className="cont-columna">

          <div className="footer-columna">

            <h3>Navegación</h3>

              <a href="index.html">Inicio</a>
              <a href="catalogo.html">Catálogo</a>
              <a href="personaliza.html">Personaliza</a>

          </div>

          <div className="footer-columna">

            <h3>Ayuda</h3>
              <a href="#pf">Preguntas frecuentes</a>
              <a href="contacto.html">Contacto</a>
          </div>

          <div className="footer-columna">
            <h3>Información</h3>

              <a href="politica-privacidad.html">
                Política de privacidad
             </a>

              <a href="terminos.html">
                 Términos y condiciones
              </a>
          </div>
        </div>
      </div>

        <div className="footer-derechos">

          <p>
              © 2026 Historias Tejidas. Todos los derechos reservados.
          </p>

        </div>

    </footer>
    </div>
  )
}


export default App;