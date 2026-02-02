import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatusHeader from './components/StatusHeader';
import Terminal from './components/Terminal';

const Dashboard = () => {
  const [serverData, setServerData] = useState({ status: 'Verificando...', online: false });
  const [logs, setLogs] = useState([
    { text: 'Iniciando conexão com o núcleo...', type: 'log-system' }
  ]);

  // Simulação de comandos para teste
  const sendCommand = (cmd) => {
    setLogs(prev => [...prev, { text: `[RCON]: ${cmd}`, type: 'log-server' }]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        
        {/* Adicionado offset para compensar a sidebar fixa */}
        <main className="col-md-10 ms-sm-auto p-4 offset-md-2">
          <StatusHeader status={serverData.status} isOnline={serverData.online} />

          <div className="row">
            {/* Coluna de Ações */}
            <div className="col-lg-4 mb-4">
              <div className="card bg-black h-100 border-orange">
                <div className="card-body">
                  <h5 className="card-title mb-4">Ações Rápidas</h5>
                  <div className="d-grid gap-3">
                    <button className="btn btn-outline-success">INICIAR NÚCLEO</button>
                    <button className="btn btn-outline-warning text-orange">REINICIAR</button>
                    <button className="btn btn-outline-danger">DESLIGAR</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna do Console */}
            <div className="col-lg-8 mb-4">
              <Terminal logs={logs} onSend={sendCommand} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;