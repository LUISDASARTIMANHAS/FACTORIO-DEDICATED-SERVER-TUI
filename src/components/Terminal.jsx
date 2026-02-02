import React, { useEffect, useRef, useState } from 'react';

/**
 * Console Central com Auto-scroll e cores dinâmicas
 * @param {Object} props - logs (array de objetos {text, type}) e onSend (função)
 */
const Terminal = ({ logs, onSend }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  // Efeito para descer o scroll automaticamente
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="card bg-black border-secondary shadow-lg">
      <div className="card-header bg-dark d-flex justify-content-between border-secondary py-2">
        <span className="small fw-bold text-secondary text-uppercase">Console Central</span>
        <span className="text-success small">● RCON ATIVO</span>
      </div>
      
      <div className="card-body p-0">
        {/* Janela de Logs */}
        <div className="terminal-window" ref={scrollRef}>
          {logs.length === 0 && <div className="text-muted italic">Aguardando logs do servidor...</div>}
          {logs.map((log, index) => (
            <div key={index} className={`${log.type} mb-1 animate-fadeIn`}>
              <span className="opacity-50 me-2">[{new Date().toLocaleTimeString()}]</span>
              {log.text}
            </div>
          ))}
        </div>

        {/* Input de Comando */}
        <div className="input-group p-2 bg-dark border-top border-secondary">
          <span className="input-group-text bg-transparent border-0 text-success fw-bold">
            &gt;_
          </span>
          <input
            id="commandInput"
            type="text"
            className="form-control bg-transparent border-0 text-light shadow-none"
            placeholder="Digite um comando para o Factorio..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            autoComplete="off"
          />
          <button 
            className="btn btn-primary rounded-pill px-4 ms-2" 
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terminal;