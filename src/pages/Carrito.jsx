import '../style.css'
import { Link, NavLink } from 'react-router-dom'; 

function Carrito() {
  return (
    <div>
      <header>
        <img src="/logo-sin-texto.png" alt="Logo de historias tejidas" />

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
            className={({ isActive }) => isActive ? "nav__a--activo" : ""}
          >
            Carrito
          </NavLink>
        </nav>
      </header>

      <main>

      </main>

      <footer>
        <div className="footer-container">

          <div className="footer-marca">
            <img src="/logo-sin-texto.png" alt="Logo de Historias Tejidas" />
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
  )
}


export default Carrito;
