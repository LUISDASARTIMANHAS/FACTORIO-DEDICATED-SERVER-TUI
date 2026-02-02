/* eslint-disable no-unused-vars */
import express from "express";
const router = express.Router();
import fs from "fs";
import os from "os";
import path from "path";
import {
	getRandomInt,
	getRandomBin,
	getRandomHex,
	generateToken,
	ordenarUsuario,
	validadeApiKey,
	unauthorized,
	forbidden,
	formatDate,
	conversorSimEnao,
	landingPage,
	sanitizeNetworkInterfaces,
	exposeFolders
} from "npm-package-nodejs-utils-lda";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = __dirname + "/src/";
const path_css = files + "css/";
const path_js = files + "js/";
const path_pages = files + "pages/";

exposeFolders(router, files);
console.log("LOAD STATIC ITENS: " + path_css);
console.log("LOAD STATIC ITENS: " + path_js);
console.log("LOAD STATIC ITENS: " + path_pages);

router.get("/", (req, res) => {
	console.log("SISTEMA <OBTER> <SITE>: " + req.url);
	landingPage(res);
});

router.get("/painel", (req, res) => {
	console.log("SISTEMA <OBTER> <SITE>: " + req.url);
	res.sendFile(path.join(path_pages + "painel.html"));
});

router.get("/painel/config", (req, res) => {
	console.log("SISTEMA <OBTER> <SITE>: " + req.url);
	res.sendFile(path.join(path_pages + "painel-config.html"));
});

router.get("/status", (req, res) => {
	try {
		const rawInterfaces = os.networkInterfaces();

		res.json({
			uptime: process.uptime(),
			message: "OK",
			timestamp: Date.now(),
			cpuUsage: os.loadavg(),
			memoryUsage: process.memoryUsage(),
			platform: os.platform(),
			cpuCores: os.cpus().length,
			totalMemory: os.totalmem(),
			freeMemory: os.freemem(),
			network: sanitizeNetworkInterfaces(rawInterfaces),
		});
	} catch (e) {
		res.status(503).json({ message: "ERROR" });
	}
});

router.get("/debugger", (req, res) => {
	console.log("SISTEMA <OBTER> <SITE>: " + req.url);
	res.status(200);
});

export default router;
