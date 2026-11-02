import { Link } from 'react-router-dom';
import '../css/componentes/tarjeta-producto.css';

function TarjetaProducto(props) {
    return (
        <article className='tarjeta'>
            
            <img src={`/${props.imagen.replace("assets/img/", "")}`} alt={props.alt} />
            
            <div className='tarjeta_informacion'>
                <h3>{props.nombre}</h3>
                <p className="precio">
                    ${props.precio.toLocaleString("es-CO")} COP
                </p>
                
                <div className="tarjeta-botones">
                    <Link className="button" to={`/producto/${props.id}`}>
                        Ver Más
                    </Link>
                </div>
            </div>
        </article>
    )
}


export default TarjetaProducto;