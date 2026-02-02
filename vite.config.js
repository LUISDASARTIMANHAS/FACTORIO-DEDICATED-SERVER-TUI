import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 34191, // Porta padrão do Vite para o Front-end
    strictPort: true, // Se a porta 3000 estiver ocupada, o Vite para em vez de tentar outra
    proxy: {
      // Quando o React chamar '/status', o Vite desvia para o Node
      '/status': {
        target: 'http://localhost:34190',
        changeOrigin: true,
      },
      // Quando você criar rotas de API (ligar/desligar server), use o prefixo /api
      '/api': {
        target: 'http://localhost:34190',
        changeOrigin: true,
      },
      // Rota para o seu debugger se precisar
      '/debugger': {
        target: 'http://localhost:34190',
        changeOrigin: true,
      }
    }
  }
});