import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';
import '../css/paginas/admin.css';

function AdminDashboard() {
  const [pestana, setPestana] = useState("pedidos");
  const [pedidos, setPedidos] = useState([]);
  const [personalizados, setPersonalizados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  // 1. Verificar que el admin esté logueado y cargar datos
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate('/admin'); // Si no hay token, fuera
      return;
    }

    // Traemos los pedidos y personalizados
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/pedidos`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/personalizados`).then(r => r.json())
    ]).then(([datosPedidos, datosPersonalizados]) => {
      setPedidos(datosPedidos);
      setPersonalizados(datosPersonalizados);
      setCargando(false);
    }).catch(err => {
      console.error(err);
      setCargando(false);
    });
  }, [navigate]);

  // 2. Función para cambiar estado
  const cambiarEstado = (id, nuevoEstado, tipo) => {
    const ruta = tipo === "pedido" ? "pedidos" : "personalizados";
    
    fetch(`${import.meta.env.VITE_API_URL}/${ruta}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado })
    }).then(res => {
      if (res.ok) {
        // Actualizamos la vista sin recargar
        if (tipo === "pedido") {
          setPedidos(pedidos.map(p => p._id === id ? { ...p, estado: nuevoEstado } : p));
        } else {
          setPersonalizados(personalizados.map(p => p._id === id ? { ...p, estado: nuevoEstado } : p));
        }
      }
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("adminToken");
    navigate('/admin');
  };

  if (cargando) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Cargando base de datos...</h2>;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Dashboard - Historias Tejidas</h1>
        <div>
          <Link to="/" className="button" style={{ marginRight: "10px" }}>Ir a la Tienda</Link>
          <button onClick={cerrarSesion} className="btn-pestana" style={{ background: "white", color: "var(--rosa-principal)" }}>Cerrar Sesión</button>
        </div>
      </header>

      <main className="admin-contenido">
        <div className="admin-pestanas">
          <button className={pestana === "pedidos" ? "btn-pestana activo" : "btn-pestana"} onClick={() => setPestana("pedidos")}>
            Pedidos del Carrito ({pedidos.length})
          </button>
          <button className={pestana === "personalizados" ? "btn-pestana activo" : "btn-pestana"} onClick={() => setPestana("personalizados")}>
            Personalizados ({personalizados.length})
          </button>
        </div>

        {pestana === "pedidos" && (
          <div className="tabla-contenedor">
            <h2>Pedidos de Carrito</h2>
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>WhatsApp</th>
                  <th>Dirección</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido._id}>
                    <td>{pedido.nombre}</td>
                    <td>{pedido.whatsapp}</td>
                    <td>{pedido.lugar}</td>
                    <td>
                      {pedido.productos.map((prod, i) => (
                        <div key={i} style={{ fontSize: "0.85rem", marginBottom: "5px" }}>
                          • {prod.cantidad}x {prod.nombre}
                          {prod.selecciones && Object.values(prod.selecciones).length > 0 && 
                            ` (${Object.values(prod.selecciones).map(s => s.nombre).join(", ")})`
                          }
                        </div>
                      ))}
                    </td>
                    <td>${pedido.total.toLocaleString("es-CO")}</td>
                    <td>
                      <span style={{ color: pedido.estado === "pendiente" ? "orange" : (pedido.estado === "aprobado" ? "green" : "red"), fontWeight: "bold" }}>
                        {pedido.estado.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {pedido.estado === "pendiente" ? (
                        <>
                          <button onClick={() => cambiarEstado(pedido._id, "aprobado", "pedido")} className="btn-whatsapp" style={{ marginRight: "5px" }}>Aprobar</button>
                          <button onClick={() => cambiarEstado(pedido._id, "rechazado", "pedido")} className="btn-quitar-favorito">Rechazar</button>
                        </>
                      ) : (
                        <a href={`https://wa.me/${pedido.whatsapp.replace("+", "")}?text=Hola ${pedido.nombre}, tu pedido en Historias Tejidas ha sido ${pedido.estado}.`} target="_blank" rel="noreferrer" className="btn-whatsapp">WhatsApp</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pestana === "personalizados" && (
          <div className="tabla-contenedor">
            <h2>Solicitudes Personalizadas</h2>
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personalizados.map((pedido) => (
                  <tr key={pedido._id}>
                    <td>{pedido.nombre}</td>
                    <td>{pedido.descripcion}</td>
                    <td>
                      <span style={{ color: pedido.estado === "pendiente" ? "red" : (pedido.estado === "aprobado" ? "" :white "red"), fontWeight: "bold" }}>
                        {pedido.estado.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {pedido.estado === "pendiente" ? (
                        <>
                          <button onClick={() => cambiarEstado(pedido._id, "aprobado", "personalizado")} className="btn-whatsapp" style={{ marginRight: "5px" }}>Aprobar</button>
                          <button onClick={() => cambiarEstado(pedido._id, "rechazado", "personalizado")} className="btn-quitar-favorito">Rechazar</button>
                        </>
                      ) : (
                        <a href={`https://wa.me/${pedido.whatsapp.replace("+", "")}?text=Hola ${pedido.nombre}, hablemos de tu diseño personalizado.`} target="_blank" rel="noreferrer" className="btn-whatsapp">WhatsApp</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;