const API_TOKEN = "teste";

/**
 * Fetch padrão da API com Authorization
 * @param {string} url
 * @param {RequestInit} options
 * @return {Promise<Response>}
 */
function apiFetch(url, options = {}) {
	return fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${API_TOKEN}`,
			...(options.headers || {})
		}
	});
}

/**
 * Atualiza status visual
 * @param {string} status
 * @return {void}
 */
function setStatus(status) {
	const el = document.getElementById("serverStatus");
	el.textContent = status;
	el.className =
		status === "ONLINE"
			? "text-success"
			: status === "OFFLINE"
			? "text-danger"
			: "text-warning";
}

/**
 * Inicia servidor
 * @return {Promise<void>}
 */
async function startServer() {
	const res = await apiFetch("/api/factorio/start", { method: "POST" });
	const data = await res.json();

	setStatus("ONLINE");
	log("[SYSTEM] " + data.message);
}

/**
 * Para servidor
 * @return {Promise<void>}
 */
async function stopServer() {
	const res = await apiFetch("/api/factorio/stop", { method: "POST" });
	const data = await res.json();

	setStatus("OFFLINE");
	log("[SYSTEM] " + data.message);
}

/**
 * Reinicia servidor
 * @return {Promise<void>}
 */
async function restartServer() {
	await stopServer();
	await startServer();
}

/**
 * Envia comando RCON
 * @return {Promise<void>}
 */
async function sendCommand() {
	const input = document.getElementById("commandInput");
	const cmd = input.value.trim();
	if (!cmd) return;

	log("> " + cmd);
	input.value = "";

	const res = await apiFetch("/api/factorio/command", {
		method: "POST",
		body: JSON.stringify({ command: cmd })
	});

	const data = await res.json();
	log("[SERVER] " + data.message);
}

/**
 * Log no painel
 * @param {string} msg
 * @return {void}
 */
function log(msg) {
	const el = document.getElementById("chatLog");
	el.textContent += msg + "\n";
	el.scrollTop = el.scrollHeight;
}