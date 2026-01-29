const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "../data/factorio.config.json");

/**
 * Lê configuração
 * @return {object}
 */
function getConfig() {
	return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

/**
 * Salva configuração
 * @param {object} config
 * @return {void}
 */
function saveConfig(config) {
	fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

module.exports = {
	getConfig,
	saveConfig,
};
