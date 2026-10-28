import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio'; 
import Catalogo from './pages/Catalogo';
import Personaliza from './pages/Personaliza';
import Carrito from './pages/Carrito';
import ProductoDetalle from './pages/ProductoDetalle';
 import Favoritos from './pages/Favoritos';

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Inicio />} />
      
      <Route path="/catalogo" element={<Catalogo />} />
      
      <Route path="/personaliza/:idProducto?" element={<Personaliza />} />
    
      <Route path="/carrito" element={<Carrito />} />
      
      <Route path="/producto/:id" element={<ProductoDetalle />} />

      <Route path="/favoritos" element={<Favoritos />} />
      



    </Routes>
);
    }
    

export default App;
