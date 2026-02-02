import React from 'react';

/**
 * Menu lateral do sistema
 * @returns {JSX.Element}
 */
const Sidebar = () => (
  <nav className="col-md-2 d-none d-md-block sidebar bg-black border-end border-secondary vh-100 p-3 position-fixed">
    <h4 className="text-orange mb-4 fw-bold">⚙️ FACTORIO</h4>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <a href="#" className="nav-link active text-orange">Dashboard</a>
      </li>
      <li className="nav-item mb-2">
        <a href="#" className="nav-link text-secondary">Mundos / Saves</a>
      </li>
      <li className="nav-item mb-2">
        <a href="#" className="nav-link text-secondary">Configurações</a>
      </li>
    </ul>
  </nav>
);

export default Sidebar;