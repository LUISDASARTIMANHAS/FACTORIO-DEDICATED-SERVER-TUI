const express = require("express");
const router = express.Router();
const {
  notfound,
} = require("npm-package-nodejs-utils-lda");
const factorioControlRoutes = require("./routes/factorio.routes")
const factorioConfigRoutes = require("./routes/config.routes");


// Rotas de controle do Factorio
router.use("/api/factorio", factorioControlRoutes);

// Rotas de configuração
router.use("/api/factorio/config", factorioConfigRoutes);

// Middleware para lidar com rotas não encontradas (404)
router.use((req, res, next) => {
  notfound(res);
});

module.exports = router;
