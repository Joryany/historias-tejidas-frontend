import { Routes, Route } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import ProductoDetalle from './pages/ProductoDetalle';

function App() {
  return (
    <Routes>
    <Route path="/catalogo" element={<Catalogo />} />
    
    <Route path="/" element={<Catalogo />} />

    <Route path="/producto/:id" element={<ProductoDetalle />} />
  </Routes>
  );
}

export default App;