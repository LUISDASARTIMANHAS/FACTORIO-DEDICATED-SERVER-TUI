const { exec } = require("child_process");
const { freadBin } = require("npm-package-nodejs-utils-lda");
const configFilePath = "./data/factorio-config.bin";

let factorioProcess = null;

/**
 * Lê configuração atual
 * @return {object}
 */
function getConfig() {
	return freadBin(configFilePath);
}

/**
 * Inicia o servidor Factorio usando config do usuário
 * @return {Promise<string>}
 */
function startServer() {
	return new Promise((resolve, reject) => {
		if (factorioProcess) {
			return resolve("Servidor já está em execução");
		}
		const cfg = getConfig();

		// 🔴 validação mínima (OBRIGATÓRIA)
		if (!cfg.factorioPath || !cfg.savePath) {
			return reject(new Error("Caminho do Factorio ou Save não configurado"));
		}

		factorioProcess = exec(`${cfg.factorioPath} --start-server ${cfg.savePath} --port ${cfg.serverPort}`
		);

		factorioProcess.on("error", (err) => {
			factorioProcess = null;
			reject(err);
		});

		resolve("Servidor iniciado");
	});
}

/**
 * Para o servidor Factorio
 * @return {Promise<string>}
 */
function stopServer() {
	return new Promise((resolve) => {
		if (!factorioProcess) {
			return resolve("Servidor já está parado");
		}

		process.kill(-factorioProcess.pid);
		factorioProcess = null;

		resolve("Servidor parado");
	});
}

/**
 * Retorna status do servidor
 * @return {string}
 */
function getStatus() {
	return factorioProcess ? "ONLINE" : "OFFLINE";
}

module.exports = {
	startServer,
	stopServer,
	getStatus,
};
