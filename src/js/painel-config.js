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
  const res = await apiFetch("/api/factorio/config");
  const data = await res.json();

  Object.keys(data).forEach((key) => {
    const el = document.getElementById(key);
    console.log(key, el);
    if (el) {
      if (key == "dirname") {
        el.textContent = data[key];
      }
      el.value = data[key];
    }
  });
}

document.getElementById("configForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const config = {
    dirname: dirname.value,
    factorioPath: factorioPath.value,
    savePath: savePath.value,
    factorioPort: Number(factorioPort.value),
    factorioRcon: Number(factorioRcon.value),
    rconPassword: rconPassword.value,
  };

  const res = await apiFetch("/api/factorio/config", {
    method: "POST",
    body: JSON.stringify(config),
  });

  const data = await res.json();
  document.getElementById("result").textContent = JSON.stringify(data, null, 2);
});

loadConfig();
