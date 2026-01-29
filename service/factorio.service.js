const { exec } = require("child_process");
const configService = require("./config.service.js");

const cfg = configService.getConfig();
// usa cfg.factorioPath, cfg.savePath etc

let serverStatus = "OFFLINE";

/**
 * Retorna status atual do servidor
 * @return {string}
 */
function getStatus() {
	return serverStatus;
}

/**
 * Inicia o servidor Factorio
 * @return {Promise<string>}
 */
function startServer() {
	return new Promise((resolve, reject) => {
		if (serverStatus === "ONLINE") {
			return resolve("Servidor já está online");
		}

		exec("factorio --start-server save.zip", (err) => {
			if (err) return reject(err);
			serverStatus = "ONLINE";
			resolve("Servidor iniciado");
		});
	});
}

/**
 * Para o servidor Factorio
 * @return {Promise<string>}
 */
function stopServer() {
	return new Promise((resolve, reject) => {
		if (serverStatus === "OFFLINE") {
			return resolve("Servidor já está offline");
		}

		exec("taskkill /IM factorio.exe /F", (err) => {
			if (err) return reject(err);
			serverStatus = "OFFLINE";
			resolve("Servidor parado");
		});
	});
}

/**
 * Envia comando via RCON
 * @param {string} command
 * @return {Promise<string>}
 */
function sendCommand(command) {
	// Aqui entra RCON real depois
	return Promise.resolve(`Comando executado: ${command}`);
}

module.exports = {
	getStatus,
	startServer,
	stopServer,
	sendCommand
};
