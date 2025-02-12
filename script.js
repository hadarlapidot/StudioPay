"use strict";
const tattooPriceInput = document.getElementById("tattoo-price");
const sessionPriceInput = document.getElementById("session-price");
const firstSessionFeeInput = document.getElementById("first-session-fee");
const secondSessionFeeInput = document.getElementById("second-session-fee");
const totalAmount = document.getElementById("total-amount");
const netWorth = document.getElementById("net-worth");
const bestNetWorth = document.getElementById("best-net-worth");
function checkValidity(tattoo, session) {
  const errorElement = document.getElementById("error-msg");
  // check nulity
  if (errorElement)
    if (tattoo < session) {
      if (errorElement)
        errorElement.textContent =
          "Session price must be less or uqual to the tattoo price";
      return false;
    }
  if (tattoo < 0 || session < 0) {
    if (errorElement) errorElement.textContent = "Prices must be positive";
    return false;
  }
  if (errorElement) errorElement.textContent = "";
  return true;
}
function calculateResults() {
  let tattooPrice = 0;
  let sessionPrice = 0;
  // checks nullity of input fields before assigning
  if (tattooPriceInput && sessionPriceInput) {
    tattooPrice = parseFloat(tattooPriceInput.value) || 0;
    sessionPrice = parseFloat(sessionPriceInput.value) || 0;
  } else throw new Error("Tattoo price or session price is unavailabe");
  // check validity of input
  if (!checkValidity(tattooPrice, sessionPrice))
    throw new Error("Input is invalid");
  // Calculate studio fees
  const firstSessionFee =
    0.3 * sessionPrice < 650
      ? parseFloat((0.3 * sessionPrice).toFixed(2))
      : 650;
  const secondSessionFee =
    0.3 * (tattooPrice - sessionPrice) < 650
      ? parseFloat((0.3 * (tattooPrice - sessionPrice)).toFixed(2))
      : 650;
  if (firstSessionFeeInput && secondSessionFeeInput && totalAmount) {
    firstSessionFeeInput.textContent = String(firstSessionFee);
    secondSessionFeeInput.textContent = String(secondSessionFee);
    totalAmount.textContent = String(tattooPrice); // Total amount should equal tattoo price}
  } else
    throw new Error(
      "TotalAmount, firstSessionFee or secondSessionFee HTML elements are unavailabe"
    );
  // Calculate net worth (Tattoo Price - Fees)
  if (netWorth) {
    const net = (tattooPrice - firstSessionFee - secondSessionFee).toFixed(2);
    netWorth.textContent = net;
  } else throw new Error("Element 'net worth' could not be found...");
  // Best net worth when session price is 0
  if (bestNetWorth) {
    const minFee = Math.min(650, 0.3 * tattooPrice);
    const bestNet = tattooPrice - minFee; // Best net worth when session price is 0 and studio fees are 650
    bestNetWorth.textContent = String(bestNet);
  } else
    throw new Error("could not find element 'netWorth' for some reason...");
}
tattooPriceInput.addEventListener("input", () => {
  calculateResults();
});
sessionPriceInput.addEventListener("input", () => {
  calculateResults();
});
// Initial calculation
document.addEventListener("DOMContentLoaded", () => {
  try {
    calculateResults();
  } catch (error) {
    console.log(error);
  }
});
