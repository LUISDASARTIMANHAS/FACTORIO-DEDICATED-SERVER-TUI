import React from 'react';

/**
 * Cabeçalho com indicador de status
 * @param {Object} props - status e online (boolean)
 * @returns {JSX.Element}
 */
const StatusHeader = ({ status, isOnline }) => (
  <header className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-light">
      Server <span className="text-orange">Dashboard</span>
    </h2>
    <div className="status-indicator p-2 px-3 rounded-pill bg-black border border-secondary d-flex align-items-center">
      <span className={`dot me-2 ${isOnline ? 'dot-online' : 'dot-offline'}`}></span>
      <small id="serverStatus">{status}</small>
    </div>
  </header>
);

export default StatusHeader;