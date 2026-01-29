const API_TOKEN = "teste";

/**
 * Fetch com Authorization
 * @param {string} url
 * @param {RequestInit} options
 * @return {Promise<Response>}
 */
function apiFetch(url, options = {}) {
	return fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${API_TOKEN}`,
			...(options.headers || {}),
		},
	});
}

/**
 * Carrega configuração atual
 * @return {Promise<void>}
 */
async function loadConfig() {
	const res = await apiFetch("/api/config");
	const data = await res.json();

	Object.keys(data).forEach((key) => {
		const el = document.getElementById(key);
		if (el) el.value = data[key];
	});
}

document.getElementById("configForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const config = {
		factorioPath: factorioPath.value,
		savePath: savePath.value,
		serverPort: Number(serverPort.value),
		rconPort: Number(rconPort.value),
		rconPassword: rconPassword.value,
	};

	const res = await apiFetch("/api/config", {
		method: "POST",
		body: JSON.stringify(config),
	});

	const data = await res.json();
	document.getElementById("result").textContent = JSON.stringify(data, null, 2);
});

loadConfig();
