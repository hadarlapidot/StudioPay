const tattooPrice = document.getElementById("tattoo-price");
const sessionPrice = document.getElementById("session-price");
const firstSessionPay = document.getElementById("first-session-pay");
const secondSessionPay = document.getElementById("second-session-pay");
const totalAmount = document.getElementById("total-amount");
const netWorth = document.getElementById("net-worth");
const bestNetWorth = document.getElementById("best-net-worth");

function calculateResults() {
  const x = parseFloat(tattooPrice.value) || 0;
  const y = parseFloat(sessionPrice.value) || 0;

  // Calculate studio fees
  const firstSession = 0.3 * y < 650 ? (0.3 * y).toFixed(2) : 650;
  const secondSession = 0.3 * (x - y) < 650 ? (0.3 * (x - y)).toFixed(2) : 650;

  firstSessionPay.textContent = firstSession;
  secondSessionPay.textContent = secondSession;
  totalAmount.textContent = x; // Total amount should equal tattoo price

  // Calculate net worth (Tattoo Price - Fees)
  const net = (
    x -
    parseFloat(firstSession) -
    parseFloat(secondSession)
  ).toFixed(2);
  netWorth.textContent = net;

  // Best net worth when session price is 0
  const bestNet = (x - 650).toFixed(2); // Best net worth when session price is 0 and studio fees are 650
  bestNetWorth.textContent = bestNet;
}

tattooPrice.addEventListener("input", () => {
  const x = parseFloat(tattooPrice.value) || 0;
  sessionPrice.max = x;
  if (sessionPrice.value > x) {
    sessionPrice.value = x;
  }
  calculateResults();
});

sessionPrice.addEventListener("input", () => {
  calculateResults();
});

// Initial calculation
calculateResults();
