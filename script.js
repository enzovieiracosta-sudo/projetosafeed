document.addEventListener("DOMContentLoaded", () => {

  // 1. Alternador de Abas do App
  const appTabs = document.querySelectorAll(".app-tab");
  const simAppTitle = document.getElementById("sim-app-title");

  const appTitles = {
    video: "Modo: App de Vídeo / Lives (TikTok, YouTube, Reels)",
    chat: "Modo: App de Mensagens (WhatsApp, Telegram, Direct)",
    social: "Modo: Rede Social (Feed e Comentários)"
  };

  appTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      appTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const appType = tab.getAttribute("data-app");
      simAppTitle.textContent = appTitles[appType];
    });
  });

  // 2. Lógica Estrita de Análise e Apagamento
  const simInput = document.getElementById("sim-input");
  const btnSend = document.getElementById("btn-send-sim");
  const simFeed = document.getElementById("sim-feed");

  const barRacism = document.getElementById("bar-racism");
  const barHate = document.getElementById("bar-hate");
  const barTox = document.getElementById("bar-tox");

  const valRacism = document.getElementById("val-racism");
  const valHate = document.getElementById("val-hate");
  const valTox = document.getElementById("val-tox");

  const verdict = document.getElementById("audit-verdict");

  // Banco de palavras proibidas (Racismo, Xenofobia, Ofensas)
  const forbiddenTerms = [
    "macaco", "preto feio", "escravo", "raça inferior", "odeio essa raça",
    "volta pra sua terra", "lixo", "se mata", "sócio do mal","feio", "bobo", "vagabunda", "maldito","viado", "desgraçada", "orfão",
  ];

  function processMessage(text) {
    if (!text.trim()) return;

    const lowerText = text.toLowerCase();
    let isViolation = false;
    let racismScore = 0;
    let hateScore = 0;

    // Detecta palavras proibidas
    forbiddenTerms.forEach(term => {
      if (lowerText.includes(term)) {
        isViolation = true;
        racismScore = 95;
        hateScore = 90;
      }
    });

    const toxScore = isViolation ? 98 : 5;

    // Atualiza barras de auditoria
    barRacism.style.width = racismScore + "%";
    barHate.style.width = hateScore + "%";
    barTox.style.width = toxScore + "%";

    valRacism.textContent = racismScore + "%";
    valHate.textContent = hateScore + "%";
    valTox.textContent = toxScore + "%";

    [barRacism, barHate, barTox].forEach(bar => {
      bar.className = "bar-fill " + (isViolation ? "red" : "green");
    });

    const msgDiv = document.createElement("div");

    if (isViolation) {
      // COMENTÁRIO APAGADO / BLOQUEADO
      msgDiv.className = "chat-msg deleted";
      msgDiv.innerHTML = `<strong>@usuario:</strong> 🛑 <em>[Comentário apagado pelo SAFEED por conter racismo/ofensa]</em>`;
      
      verdict.className = "audit-verdict deleted-verdict";
      verdict.textContent = "🗑️ APAGADO: O comentário continha discurso racista ou ofensivo e foi removido instantaneamente!";
    } else {
      // COMENTÁRIO PERMITIDO
      msgDiv.className = "chat-msg safe";
      msgDiv.innerHTML = `<strong>@usuario:</strong> ${text}`;

      verdict.className = "audit-verdict safe-verdict";
      verdict.textContent = "✅ APROVADO: O comentário é respeitoso e livre de preconceito.";
    }

    simFeed.appendChild(msgDiv);
    simFeed.scrollTop = simFeed.scrollHeight;
    simInput.value = "";
  }

  btnSend.addEventListener("click", () => processMessage(simInput.value));
  simInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") processMessage(simInput.value);
  });

  // Presets
  document.querySelectorAll(".btn-preset").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-text");
      simInput.value = text;
      processMessage(text);
    });
  });

  // Botão Navbar
  document.getElementById("btn-api-key").addEventListener("click", () => {
    alert("🛡️ Filtro Anti-Ódio e Racismo ativado com sucesso para o seu dispositivo!");
  });
});