const express = require("express");
const router = express.Router();
const configService = require("../service/config.service.js");

/**
 * Retorna configuração atual
 */
router.get("/", (req, res) => {
	res.json(configService.getConfig());
});

/**
 * Atualiza configuração
 */
router.post("/", (req, res) => {
	configService.saveConfig(req.body);
	res.json({ success: true });
});

module.exports = router;
