
import { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import TarjetaProducto from '../components/TarjetaProducto';
import '../style.css';


function ProductoDetalle() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [relacionados, setRelacionados] = useState([]);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/productos/${id}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Producto no encontrado");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProducto(datos);  
        setCargando(false);  
      })
      .catch((error) => {
        console.error(error);
        setCargando(false);  
      });
  }, [id]); 

  useEffect(() => {
    if (producto) {
      fetch(`${import.meta.env.VITE_API_URL}/productos`)
        .then((respuesta) => respuesta.json())
        .then((todos) => {
            const filtrados = todos.filter(function(p) {
                return p.categoria === producto.categoria && p.id !== producto.id;
            });
            setRelacionados(filtrados.slice(0, 4));
        })
        .catch((error) => console.error("Error cargando relacionados:", error));
    }
  }, [producto]); 


   if (cargando) {
    return (
      <div className='mensaje_carga'> 
        <h2>Cargando el producto...</h2>
        <h3>Agradecemos su paciencia.</h3>
      </div>
    );
  }

  if (!producto) {
    return (
    <div className='mensaje_carga'> 
    <h2>No se encontró el producto</h2>
    <h3>Lo siento por el inconveniente, le invitamos a ver otros amigurumis.</h3>
    </div>
    );
  }


    return (
    <div>
        <header>
        <img src="/logo-sin-texto.png" alt="Logo de historias tejidas, un oso y conejos tejidos abrazando un corazón, con el nombre del emprendimiento en grande."/>

        <nav className='navegador_principal'>
  
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav__a--activo" : ""}
            >
                Inicio
            </NavLink>

            <NavLink 
                to="/catalogo" 
                className={({ isActive }) => isActive ? "nav__a--activo" : ""}
            >
                Catálogo
            </NavLink>

            <NavLink 
                to="/personaliza" 
                className={({ isActive }) => isActive ? "nav__a--activo" : ""}
            >
                Personaliza
            </NavLink>

            <NavLink 
                to="/carrito" 
                id="navegador_carrito-icono"
                className={({ isActive }) => isActive ? "nav__a--activo-carrito" : ""}
            >
                Carrito
            </NavLink>

        </nav>
      </header>

      <div className="producto-pagina">
        

        <section id="producto">

            <img 
            id="imagen" 
            src={`/${producto.imagen.replace("assets/img/", "img/")}`} 
            alt={producto.alt} 
            />

            <div id="producto__container">
            <span id="etiqueta">{producto.etiqueta}</span>
            
            <h1 id="nombre">{producto.nombre}</h1>
            
            <h2 id="precio">
                ${producto.precio.toLocaleString("es-CO")} COP
            </h2>

            <div id="btn__producto">
    
              <button id="favorito"
                  title="Guardar en favoritos"
              >
                  ♡
              </button>
             <Link id="personalizar" to={`/personaliza/${producto.id}`} className="button">
                Personalizar este amigurumi
              </Link>

          </div>

            <div id="producto__container--especificaciones">
                
                <div className="container__especificaciones--elemento">
                <h3>La historia detrás del tejido</h3>
                <p id="historia__p">{producto.historia}</p>
                </div>

                <div className="container__especificaciones--elemento">
                <h4>Materiales del amigurumi</h4>
                <p id="materiales__p">{producto.materiales}</p>
                </div>

            </div>
          </div>
        </section>
        <section>
          <h2>También te podría gustar</h2>
                  
          <div className="tarjeta-container">
            {relacionados.map(function(prod) {
                return (
            <TarjetaProducto 
              key={prod.id}
                id={prod.id}
                nombre={prod.nombre} 
                precio={prod.precio} 
                imagen={prod.imagen}
                alt={prod.alt}
              />
            );
            })}
          </div>
        </section>    
      </div>

      <footer>
        <div className="footer-container">

          <div className="footer-marca">
            <img src="/logo-sin-texto.png" alt="Logo de Historias Tejidas"/>
            <h2>Historias Tejidas</h2>
          </div>

          <div className="cont-columna">

            <div className="footer-columna">
              <h3>Navegación</h3>
              <Link to="/">Inicio</Link>
              <Link to="/catalogo">Catálogo</Link>
              <Link to="/personaliza">Personaliza</Link>
            </div>

            <div className="footer-columna">
              <h3>Ayuda</h3>
              {/* Este se queda como <a> porque apunta a un ancla interna (#pf) */}
              <a href="#pf">Preguntas frecuentes</a>
              <Link to="/contacto">Contacto</Link>
            </div>

            <div className="footer-columna">
              <h3>Información</h3>
              <Link to="/politica-privacidad">Política de privacidad</Link>
              <Link to="/terminos">Términos y condiciones</Link>
            </div>
            
          </div>
        </div>

        <div className="footer-derechos">
          <p>© 2026 Historias Tejidas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>    
  );
}

export default ProductoDetalle;