export function updateClientName(name) {
  const clientNameElement = document.querySelector(".profile-area h1");
  clientNameElement.textContent = name;
}

export function updateClientSince(clientSince) {
  const clientSinceElement = document.querySelector(
    ".profile-area .client-date"
  );
  clientSinceElement.textContent = clientSince;
}

export function updateCutHistory(appointmentHistory, totalCuts) {
  console.log(appointmentHistory);
  const clientCutHistoryElement = document.querySelector(
    ".cuts-history .client-history"
  );
  clientCutHistoryElement.textContent = `${totalCuts} ${
    totalCuts === 1 ? "corte" : "cortes"
  }`;

  const historyList = document.querySelector(".cuts-history .history-list");

  historyList.innerHTML = "";

  function createHistoryItem(appointment) {
    const listItem = document.createElement("li");
    listItem.className = "history-item grid";

    const cutContent = document.createElement("div");
    cutContent.className = "cut-content";

    const dateParagraph = document.createElement("p");
    dateParagraph.className = "subtitle-sm text-base-gray-600";
    dateParagraph.textContent = appointment.date;

    const timeParagraph = document.createElement("p");
    timeParagraph.className = "text-xs text-base-gray-500";
    timeParagraph.textContent = appointment.time;

    cutContent.appendChild(dateParagraph);
    cutContent.appendChild(timeParagraph);

    const checkContent = document.createElement("div");
    checkContent.className =
      "check-content flex justify-content-center items-center";

    const checkIcon = document.createElement("i");
    checkIcon.className = "ph ph-seal-check";

    checkContent.appendChild(checkIcon);

    listItem.appendChild(cutContent);
    listItem.appendChild(checkContent);

    return listItem;
  }

  appointmentHistory.forEach((appointment) => {
    const historyItem = createHistoryItem(appointment);
    historyList.appendChild(historyItem);
  });
}

export function updateFidelityGrid(totalCuts) {
  const fidelityTextElement = document.querySelector(
    ".fidelity-area .fidelity-text"
  );
  if (totalCuts === 10) {
    fidelityTextElement.textContent =
      "Parabéns! Seu próximo corte sairá de graça!";
  } else {
    fidelityTextElement.textContent =
      "Ao fazer cortes de cabelo, o décimo sai de graça!";
  }
}

export function updateFidelityCard(cutsRemaining, cutsNeeded, totalCuts) {
  const fidelityGrid = document.querySelector(".grid-fidelity");

  function createFidelityItem(isLastItem, isActive, isFilled) {
    const fidelityItem = document.createElement("div");
    fidelityItem.className = isLastItem
      ? "fidelity-item gift-item"
      : "fidelity-item";

    if (isLastItem) {
      const icon = document.createElement("i");
      icon.className = `ph-fill ph-gift ${isActive ? "active" : ""}`;
      fidelityItem.appendChild(icon);
    } else if (isFilled) {
      const img = document.createElement("img");
      img.src = "./src/assets/confirm-icon.png";
      img.alt = "Verificado";
      fidelityItem.appendChild(img);
    }

    return fidelityItem;
  }

  fidelityGrid.innerHTML = "";
  Array.from({ length: 10 }).forEach((_, index) => {
    const isLastItem = index === 9;
    const isActive = isLastItem && totalCuts === 10;
    const isFilled = index < totalCuts;

    const fidelityItem = createFidelityItem(isLastItem, isActive, isFilled);
    fidelityGrid.appendChild(fidelityItem);
  });

  const cutsRemainingElement = document.querySelector(".gift-reach h3");
  cutsRemainingElement.textContent = cutsRemaining.toString();

  const progressTextElement = document.querySelector(
    ".gift-reach .progress-text span"
  );
  progressTextElement.textContent = totalCuts;

  const progressBar = document.querySelector(
    ".gift-reach .progress-bar .progress"
  );
  const progressWidth = (cutsNeeded - cutsRemaining) * 10;
  progressBar.style.width = `${progressWidth}%`;
}
