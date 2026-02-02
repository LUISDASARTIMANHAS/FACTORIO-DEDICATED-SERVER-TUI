import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/global.css'; // Tenha certeza que esse arquivo existe ou remova a linha
import Dashboard from './Dashboard.jsx'; // Este é o seu componente de Dashboard em React

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
);