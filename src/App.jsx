import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio'; 
import Catalogo from './pages/Catalogo';
import Personaliza from './pages/Personaliza';
import Carrito from './pages/Carrito';
import ProductoDetalle from './pages/ProductoDetalle';
import Favoritos from './pages/Favoritos';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Routes>
      
        <Route path="/" element={<Inicio />} />
        
        <Route path="/catalogo" element={<Catalogo />} />
        
        <Route path="/personaliza/:idProducto?" element={<Personaliza />} />
      
        <Route path="/carrito" element={<Carrito />} />
        
        <Route path="/producto/:id" element={<ProductoDetalle />} />

        <Route path="/favoritos" element={<Favoritos />} />
        
            
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminDashboard />} />


      </Routes>

      <Chatbot />
  </>
);
    }
    

export default App;
