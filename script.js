const inputNumber = document.getElementById("input-number");
const rangeSlider = document.getElementById("range-slider");
const sliderValue = document.getElementById("slider-value");
const resultA = document.getElementById("result-a");
const resultB = document.getElementById("result-b");
const totalAmount = document.getElementById("total-amount");

function calculateResults() {
  const x = parseFloat(inputNumber.value) || 0;
  const y = parseFloat(rangeSlider.value) || 0;

  const a = 0.3 * y < 650 ? (0.3 * y).toFixed(2) : 650;
  const b = 0.3 * (x - y) < 650 ? (0.3 * (x - y)).toFixed(2) : 650;

  resultA.textContent = a;
  resultB.textContent = b;
  totalAmount.textContent = (parseFloat(a) + parseFloat(b)).toFixed(2);
}

inputNumber.addEventListener("input", () => {
  const x = parseFloat(inputNumber.value) || 0;
  rangeSlider.max = x;
  if (rangeSlider.value > x) {
    rangeSlider.value = x;
    sliderValue.textContent = x;
  }
  calculateResults();
});

rangeSlider.addEventListener("input", () => {
  sliderValue.textContent = rangeSlider.value;
  calculateResults();
});

// Initial calculation
calculateResults();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => {
      console.log("Service Worker registered successfully!");
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}
