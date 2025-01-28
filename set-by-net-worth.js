const desiredIncome = document.getElementById("desired-income");
const firstSessionPrice = document.getElementById("first-session-price");
const firstSessionPriceFee = document.getElementById("first-session-price-fee");
const secondSessionPriceFee = document.getElementById(
  "second-session-price-fee"
);
const totalPrice = document.getElementById("total-price");
const netIncome = document.getElementById("net-income");

function calculateResults() {
  const desired = parseFloat(desiredIncome.value) || 0;
  const firstSession = parseFloat(firstSessionPrice.value) || 0;

  // Calculate the first session price including fee
  const firstSessionWithFee = firstSession + Math.min(0.3 * firstSession, 650);
  firstSessionPriceFee.textContent = firstSessionWithFee.toFixed(2);

  // Calculate the second session price to reach desired income
  const remainingIncome = desired - firstSession;
  const secondSessionWithFee =
    Math.max(0, remainingIncome) + Math.min(0.3 * remainingIncome, 650);
  secondSessionPriceFee.textContent = secondSessionWithFee.toFixed(2);

  // Total price is the sum of both sessions including fees
  const total = firstSessionWithFee + secondSessionWithFee;
  totalPrice.textContent = total.toFixed(2);

  // Net income is the desired income
  netIncome.textContent = desired.toFixed(2);
}

desiredIncome.addEventListener("input", calculateResults);
firstSessionPrice.addEventListener("input", calculateResults);

// Initial calculation
calculateResults();
