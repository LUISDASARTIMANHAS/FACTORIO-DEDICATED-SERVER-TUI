const express = import("express");
const fs = import("fs");
const { freadBin, fwriteBin } = import("npm-package-nodejs-utils-lda");
const path = import("path");
const router = express.Router();
const configFilePath = "./data/factorio-config.bin";

// Verifica se o arquivo users.bin existe
if (!fs.existsSync(configFilePath)) {
  // Se não existir, cria o arquivo users.bin com um array vazio
  const defaultSchema = {
		dirname: __dirname,
    factorioPath: path.resolve(__dirname,"..","..","factorio"),
    factorioPort: "34197",
    factorioRcon: "27015",
    savePath: path.resolve(__dirname,"..","..","factorio","saves","save.zip"),
  };
  fwriteBin(configFilePath, defaultSchema); // Cria um arquivo binário vazio
}

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
