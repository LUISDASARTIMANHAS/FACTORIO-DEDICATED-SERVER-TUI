import express from "express";
import { getConsoleOutput, getStatus, startServer, stopServer } from "../service/factorio.js";
const router = express.Router();

/**
 * Status do servidor
 */
router.get("/status", (req, res) => {
	res.json({ status: getStatus() });
});

router.get("/output", (req, res) => {
	res.json({ message: getConsoleOutput()});
});

/**
 * Iniciar servidor
 */
router.post("/start", async (req, res) => {
	try {
		const msg = await startServer();
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
		const msg = await stopServer();
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
	// const { command } = req.body;
	// const result = await factorio.sendCommand(command);
	// res.json({ message: result });
	res.sendStatus(501); // Not implemented
});

export default router;
