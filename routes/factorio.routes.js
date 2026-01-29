const express = require("express");
const router = express.Router();
const factorio = require("../service/factorio.service.js");

/**
 * Status do servidor
 */
router.get("/status", (req, res) => {
	res.json({ status: factorio.getStatus() });
});

router.get("/output", (req, res) => {
	res.json({ message: factorio.getConsoleOutput()});
});

/**
 * Iniciar servidor
 */
router.post("/start", async (req, res) => {
	try {
		const msg = await factorio.startServer();
		res.json({ message: msg });
	} catch (e) {
		console.error("[FACTORIO START ERROR]", e);
		res.status(500)
		res.json({
			error: "Erro ao iniciar servidor",
			details: e.message,
		});
	}
});

/**
 * Parar servidor
 */
router.post("/stop", async (req, res) => {
	try {
		const msg = await factorio.stopServer();
		res.json({ message: msg });
	} catch (e) {
		res.status(500);
		res.json({ error: `Erro ao parar servidor`, details: e.message });
	}
});

/**
 * Enviar comando RCON
 */
router.post("/command", async (req, res) => {
	const { command } = req.body;
	const result = await factorio.sendCommand(command);
	res.json({ message: result });
});

module.exports = router;
