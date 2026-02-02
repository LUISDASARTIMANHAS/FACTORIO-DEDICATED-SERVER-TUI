import { spawn } from "child_process"
import { freadBin } from "npm-package-nodejs-utils-lda"

const configFilePath = "./data/factorio-config.bin";

let factorioProcess = null;

const OUTPUT_LIMIT = 1000;
const consoleOutput = [];

/**
 * Adiciona saída ao buffer
 * @param {"stdout"|"stderr"|"system"|"error"} type
 * @param {string} message
 * @return {void}
 */
function pushOutput(type, message) {
	consoleOutput.push({
		time: new Date().toISOString(),
		type,
		message: message.trimEnd(),
	});

	if (consoleOutput.length > OUTPUT_LIMIT) {
		consoleOutput.shift();
	}
}

/**
 * Retorna saída completa do console
 * @return {Array}
 */
export function getConsoleOutput() {
	return consoleOutput;
}

/**
 * Lê configuração atual
 * @return {object}
 */
function getConfig() {
	return freadBin(configFilePath);
}

/**
 * Inicia o servidor Factorio (WINDOWS SAFE)
 * @return {Promise<string>}
 */
export function startServer() {
	return new Promise((resolve, reject) => {
		if (factorioProcess?.pid) {
			return resolve(`Servidor já está em execução PID: ${factorioProcess.pid}`);
		}

		const cfg = getConfig();

		if (!cfg.factorioPath || !cfg.savePath) {
			return reject(new Error("Caminho do Factorio ou Save não configurado"));
		}

		pushOutput("system", "Iniciando servidor Factorio");

		// ✅ EXECUTÁVEL DIRETO
		factorioProcess = spawn(
			cfg.factorioPath,
			[
				"--start-server",
				cfg.savePath,
				"--port",
				String(cfg.factorioPort),
			],
			{
				windowsHide: true,
				stdio: ["pipe", "pipe", "pipe"],
			}
		);

		factorioProcess.stdout.on("data", (data) => {
			const msg = data.toString();
			pushOutput("stdout", msg);
			process.stdout.write(msg);
		});

		factorioProcess.stderr.on("data", (data) => {
			const msg = data.toString();
			pushOutput("stderr", msg);
			process.stderr.write(msg);
		});

		factorioProcess.on("exit", (code) => {
			pushOutput("system", `Servidor finalizado (code=${code})`);
			factorioProcess = null;
		});

		factorioProcess.on("error", (err) => {
			pushOutput("error", err.message);
			factorioProcess = null;
			reject(err);
		});

		setTimeout(() => {
			if (!factorioProcess?.pid) {
				pushOutput("error", "Factorio não iniciou (PID inexistente)");
				factorioProcess = null;
				return reject(new Error("Factorio não iniciou"));
			}

			pushOutput("system", `Servidor iniciado PID ${factorioProcess.pid}`);
			resolve(`Servidor iniciado PID: ${factorioProcess.pid}`);
		}, 500);
	});
}

/**
 * Para o servidor Factorio
 * @return {Promise<string>}
 */
export function stopServer() {
	return new Promise((resolve, reject) => {
		if (!factorioProcess?.pid) {
			pushOutput("system", "Servidor já estava parado");
			factorioProcess = null;
			return resolve("Servidor já está parado");
		}

		try {
			process.kill(factorioProcess.pid, "SIGTERM");
			pushOutput("system", `SIGTERM enviado PID ${factorioProcess.pid}`);
			factorioProcess = null;
			resolve("Servidor parado");
		} catch (err) {
			pushOutput("error", err.message);
			reject(err);
		}
	});
}

/**
 * Retorna status do servidor
 * @return {string}
 */
export function getStatus() {
	return factorioProcess?.pid
		? `ONLINE PID: ${factorioProcess.pid}`
		: "OFFLINE";
}