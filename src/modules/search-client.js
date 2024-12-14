import ClientInfo from "../services/client-info.js";

import MaskInput from "../utils/mask-convert.js";

import {
  updateClientName,
  updateClientSince,
  updateCutHistory,
  updateFidelityGrid,
  updateFidelityCard,
} from "./inputs-update.js";

const form = document.querySelector(".search-client");
const input = document.querySelector(".search-client #client-id");
const button = document.querySelector(".search-client button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const clientDetails = await ClientInfo({ id: data["client-id"] });
    input.value = "";

    updateClientName(clientDetails.name);
    updateClientSince(clientDetails.clientSince);
    updateCutHistory(
      clientDetails.appointmentHistory,
      clientDetails.loyaltyCard.totalCuts
    );
    updateFidelityGrid(clientDetails.loyaltyCard.totalCuts);
    updateFidelityCard(
      clientDetails.loyaltyCard.cutsRemaining,
      clientDetails.loyaltyCard.cutsNeeded,
      clientDetails.loyaltyCard.totalCuts
    );
  } catch (error) {
    console.error("Erro ao buscar informações do cliente:", error);
  }
});

input.addEventListener("input", (event) => {
  const maskedValue = MaskInput(event.target.value);
  event.target.value = maskedValue;

  button.disabled = maskedValue.length !== 15;
});
