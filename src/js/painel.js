// src\js\painel.js
const API_TOKEN = "teste";

let lastLogIndex = 0;

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
    const dot = document.getElementById("statusDot");

    el.textContent = status;
    dot.className = "dot me-2"; // reset

    if (status === "ONLINE") {
        el.className = "text-success";
        dot.classList.add("dot-online");
    } else if (status === "OFFLINE") {
        el.className = "text-danger";
        dot.classList.add("dot-offline");
    } else {
        el.className = "text-warning";
    }
}

/**
 * Inicia servidor
 * @return {Promise<void>}
 */
async function startServer() {
	const res = await apiFetch("/api/factorio/start", { method: "POST" });
	const data = await res.json();
	fetchStatus();
	log(`[SYSTEM] ${data.message}`);
}

/**
 * Para servidor
 * @return {Promise<void>}
 */
async function stopServer() {
	const res = await apiFetch("/api/factorio/stop", { method: "POST" });
	const data = await res.json();
	fetchStatus();
	log(`[SYSTEM] ${data.message}`);
}

/**
 * Reinicia servidor
 * @return {Promise<void>}
 */
async function restartServer() {
	await stopServer();
	await startServer();
	fetchStatus();
}

/**
 * Envia comando RCON
 * @return {Promise<void>}
 */
async function sendCommand() {
	const input = document.getElementById("commandInput");
	const cmd = input.value.trim();
	if (!cmd) return;

	log(`> ${cmd}`);
	input.value = "";

	const res = await apiFetch("/api/factorio/command", {
		method: "POST",
		body: JSON.stringify({ command: cmd })
	});

	const data = await res.json();
	log(`[SERVER] ${data.message}`);
}

/**
 * Busca status do servidor
 * @return {Promise<void>}
 */
async function fetchStatus() {
	const res = await apiFetch("/api/factorio/status", { method: "GET" });
	const data = await res.json();
	setStatus(data.status);
}

/**
 * Busca saída do console e renderiza corretamente
 * @return {Promise<void>}
 */
async function fetchConsoleOut() {
	const res = await apiFetch("/api/factorio/output", { method: "GET" });
	const data = await res.json();

	if (!Array.isArray(data.message)) return;

	for (let i = lastLogIndex; i < data.message.length; i++) {
		const entry = data.message[i];
		renderLog(entry);
	}

	lastLogIndex = data.message.length;
}

/**
 * Renderiza uma linha de log formatada
 * @param {{time:string,type:string,message:string}} entry
 * @return {void}
 */
function renderLog(entry) {
	const time = new Date(entry.time).toLocaleTimeString();
	const type = entry.type.toUpperCase();
	log(`[${time}][${type}] ${entry.message}`);
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

/* Init */
fetchStatus();
setInterval(fetchStatus, 15000);
setInterval(fetchConsoleOut, 2000);