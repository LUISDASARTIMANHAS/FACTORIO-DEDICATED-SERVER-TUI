const { spawn } = require("child_process");
const { freadBin } = require("npm-package-nodejs-utils-lda");

const configFilePath = "./data/factorio-config.bin";

let factorioProcess = null;

/**
 * Buffer de saída do console
 */
const OUTPUT_LIMIT = 1000;
const consoleOutput = [];

/**
 * Adiciona linha ao console
 * @param {"stdout"|"stderr"|"system"|"error"} type
 * @param {string} message
 * @returns {void}
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
 * @returns {Array}
 */
function getConsoleOutput() {
	return consoleOutput;
}

/**
 * Lê configuração atual
 * @returns {object}
 */
function getConfig() {
	return freadBin(configFilePath);
}

/**
 * Inicia o servidor Factorio
 * @returns {Promise<string>}
 */
function startServer() {
	return new Promise((resolve, reject) => {
		if (factorioProcess && factorioProcess.pid) {
			return resolve(`Servidor já está em execução PID: ${factorioProcess.pid}`);
		}

		const cfg = getConfig();

		if (!cfg.factorioPath || !cfg.savePath) {
			return reject(new Error("Caminho do Factorio ou Save não configurado"));
		}

		const command =
			`"${cfg.factorioPath}" --start-server "${cfg.savePath}" --port ${cfg.serverPort}`;

		pushOutput("system", "Iniciando servidor Factorio");

		factorioProcess = spawn("cmd.exe", ["/c", command], {
			windowsHide: true,
			stdio: ["pipe", "pipe", "pipe"],
		});

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
			if (!factorioProcess || !factorioProcess.pid) {
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
 * @returns {Promise<string>}
 */
function stopServer() {
	return new Promise((resolve, reject) => {
		if (!factorioProcess || !factorioProcess.pid) {
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
 * @returns {string}
 */
function getStatus() {
	return factorioProcess && factorioProcess.pid
		? `ONLINE PID: ${factorioProcess.pid}`
		: "OFFLINE";
}

module.exports = {
	startServer,
	stopServer,
	getStatus,
	getConsoleOutput,
};