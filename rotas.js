import express from "express";
const router = express.Router();
import { notfound } from "npm-package-nodejs-utils-lda";
import factorioControlRoutes from "./routes/factorio.routes.js";
import factorioConfigRoutes from "./routes/config.routes.js";
// gerenciador de rotas central
// não adicione logica aqui diretamente,
// crie um arquivo de rota separado em /routes e importe aqui

// Rotas de controle do Factorio, "/api/factorio" isso força no use a usar por padrão essa rota base
router.use("/api/factorio", factorioControlRoutes);

// Rotas de configuração,"/api/factorio/config" isso força no use a usar por padrão essa rota base
router.use("/api/factorio/config", factorioConfigRoutes);

// Middleware para lidar com rotas não encontradas (404)
router.use((req, res, next) => {
  notfound(res);
});

export default router;
