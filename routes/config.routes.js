const express = require("express");
const { freadBin, fwriteBin } = require("npm-package-nodejs-utils-lda");
const router = express.Router();
const configFilePath = "../data/factorio-config.bin";

/**
 * Retorna configuração atual
 */
router.get("/", (req, res) => {
  const data = freadBin(configFilePath);
  res.json(data);
});

/**
 * Atualiza configuração
 */
router.post("/", (req, res) => {
  const payload = req.body;
  let status = fwriteBin(configFilePath, payload);
  res.json({ success: status });
});

module.exports = router;
