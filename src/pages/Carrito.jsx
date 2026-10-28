import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style.css';
import Calendario from "../components/Calendario";

function Carrito() {
  // 1. Estados del carrito
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carritoHT");
    return guardado ? JSON.parse(guardado) : [];
  });

  // 2. Estados del formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");

  // 3. Funciones del carrito
  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carritoHT", JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    actualizarCarrito(nuevoCarrito);
  };

  const cambiarCantidad = (index, delta) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += delta;
    
    if (nuevoCarrito[index].cantidad <= 0) {
      eliminarProducto(index);
    } else {
      actualizarCarrito(nuevoCarrito);
    }
  };
  
  // 4. Total
  let total = 0;
  carrito.forEach(item => {
    total += item.precioFinal * item.cantidad;
  });

  // 5. Función para enviar el pedido
  const procesarPedido = (e) => {
    e.preventDefault();

    const datosPedido = {
      nombre,
      whatsapp,
      fecha,
      lugar,
      productos: carrito,
      total: total
    };

    fetch(`${import.meta.env.VITE_API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosPedido),
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          setEnviado(true);
          localStorage.removeItem("carritoHT");
          setCarrito([]);
        } else {
          alert("Hubo un error al enviar el pedido.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <header>
        <img src="/logo-sin-texto.png" alt="Logo" />
        <nav className='navegador_principal'>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav__a--activo" : ""}>Inicio</NavLink>
          <NavLink to="/catalogo" className={({ isActive }) => isActive ? "nav__a--activo" : ""}>Catálogo</NavLink>
          <NavLink to="/personaliza" className={({ isActive }) => isActive ? "nav__a--activo" : ""}>Personaliza</NavLink>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? "nav__a--activo" : ""}>Carrito</NavLink>
        </nav>
      </header>

      <main className="pagina-carrito">
        <h1>Tu Carrito de Compras</h1>

       
        {enviado ? (
          <div className="carrito-vacio">
            <h2>¡Pedido enviado con éxito!</h2>
            <p>Nos pondremos en contacto por WhatsApp pronto para coordinar el pago y la entrega.</p>
            <Link to="/catalogo" className="button">Volver al catálogo</Link>
          </div>
        ) : 
        
        /* 2. FORMULARIO DE DATOS */
        mostrarFormulario ? (
          <form onSubmit={procesarPedido} className="checkout-form">
            <h2>Datos de contacto</h2>
            <p>Total a pagar: <strong>${total.toLocaleString("es-CO")} COP</strong></p>

            <label>Nombre completo:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

            <label>WhatsApp:</label>
            <Calendario fecha={fecha} setFecha={setFecha} />

            <label>Fecha deseada de entrega:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

            <label>Lugar de entrega:</label>
            <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)} required />

            <div className="checkout-botones">
              <button type="button" className="button" onClick={() => setMostrarFormulario(false)}>Volver al carrito</button>
              <button type="submit" className="button btn-finalizar">Confirmar Pedido</button>
            </div>
          </form>
        ) :

        /* 3. CARRITO VACÍO */
        carrito.length === 0 ? (
          <div className="carrito-vacio">
            <h2>Aún te faltan Historias por Contar...</h2>
            <Link to="/catalogo" className="button">Ir a ver productos</Link>
            <Link to="/personaliza" className="button">Crear mi Historia</Link>
          </div>
        ) : 
        
        /* 4. CARRITO CON PRODUCTOS */
        (
          <div>
            <div className="lista-carrito">
              {carrito.map((item, index) => (
                <div key={index} className="item-carrito">
                  
                  <img src={`/${item.imagen.replace("assets/img/", "")}`} alt={item.alt} className="item-carrito-imagen" />
                  
                  <div className="item-carrito-detalles">
                    <h3>{item.nombre}</h3>
                    
                    {item.selecciones && Object.keys(item.selecciones).length > 0 && (
                      <p className="item-carrito-opciones">
                        {Object.values(item.selecciones).map(sel => sel.nombre).join(" | ")}
                      </p>
                    )}
                    
                    <p className="item-carrito-precio">${item.precioFinal.toLocaleString("es-CO")} COP</p>
                    
                    <div className="item-carrito-cantidad">
                      <button onClick={() => cambiarCantidad(index, -1)} className="button">-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => cambiarCantidad(index, 1)} className="button">+</button>
                    </div>
                  </div>

                  <button onClick={() => eliminarProducto(index)} className="item-carrito-eliminar" title="Eliminar">🗑️</button>
                </div>
              ))}
            </div> 
            <div className="carrito-resumen">
              <h2>Total: ${total.toLocaleString("es-CO")} COP</h2>
              <button className="button btn-finalizar" onClick={() => setMostrarFormulario(true)}>
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-derechos">
          <p>© 2026 Historias Tejidas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Carrito;