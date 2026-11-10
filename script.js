const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const goalInput = document.querySelector("#goal");
const proteinResult = document.querySelector("#protein-result");
const bmiResult = document.querySelector("#bmi-result");
const calculateButton = document.querySelector("#calculate");

function calculateNutrition() {
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);
  const proteinFactors = { build: 2, maintain: 1.6, lose: 1.8 };

  if (!Number.isFinite(weight) || weight < 25 || weight > 300 ||
      !Number.isFinite(height) || height < 100 || height > 250) {
    weightInput.setAttribute("aria-invalid", String(weight < 25 || weight > 300));
    heightInput.setAttribute("aria-invalid", String(height < 100 || height > 250));
    return;
  }

  weightInput.removeAttribute("aria-invalid");
  heightInput.removeAttribute("aria-invalid");
  proteinResult.textContent = String(Math.round(weight * proteinFactors[goalInput.value]));
  const bmi = weight / ((height / 100) ** 2);
  const bmiLabel = bmi < 18.5 ? "أقل من الطبيعي" : bmi < 25 ? "طبيعي" : bmi < 30 ? "أعلى من الطبيعي" : "مرتفع";
  bmiResult.innerHTML = `${bmi.toFixed(1)} <small>${bmiLabel}</small>`;
}

calculateButton.addEventListener("click", calculateNutrition);
[weightInput, heightInput, goalInput].forEach((input) => {
  input.addEventListener("change", calculateNutrition);
});

const billingOptions = document.querySelectorAll(".billing-option");
billingOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const billing = option.dataset.billing;
    billingOptions.forEach((item) => {
      const active = item === option;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".plan-price strong").forEach((price) => {
      price.textContent = price.dataset[billing];
    });
    document.querySelectorAll(".plan-billing-note").forEach((note) => {
      note.textContent = billing === "yearly" ? "فوترة سنوية مقدمًا — وفّر ٢٥٪" : "تجدد شهريًا، ألغِ في أي وقت";
    });
  });
});

const cartToast = document.querySelector(".cart-toast");
let toastTimeout;
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.closest(".product-card").querySelector("h3").textContent;
    cartToast.textContent = `تمت إضافة ${productName} إلى سلتك 🛒`;
    cartToast.classList.add("visible");
    button.classList.add("added");
    button.setAttribute("aria-pressed", "true");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      cartToast.classList.remove("visible");
      button.classList.remove("added");
      button.removeAttribute("aria-pressed");
    }, 2200);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#join-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#full-name").value.trim();
  document.querySelector("#form-success").textContent = `يا هلا ${name}، وصلتنا بياناتك! فريقنا بيتواصل معك قريبًا.`;
  event.currentTarget.reset();
});
