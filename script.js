document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-login");
  const openBtn = document.querySelector(".forma-login");
  const closeBtn = modal.querySelector(".close-button");

  const phoneInput = modal.querySelector('input[type="tel"]');
  const emailInput = modal.querySelector('input[type="email"]');
  const passwordInput = modal.querySelector('input[type="password"]');
  const submitBtn = modal.querySelector('.login-submit');


  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    checkInputs(); 
  });

  // Закрытие
  closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  function checkInputs() {
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const isValid = phone.length >= 10 && email.includes("@") && password.length >= 8;

    submitBtn.disabled = !isValid;
    submitBtn.style.opacity = isValid ? "1" : "0.5";
    submitBtn.style.cursor = isValid ? "pointer" : "not-allowed";
  }

  [phoneInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener("input", checkInputs);
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const sortToggle = document.querySelector(".sort-toggle");
    const sortOptions = document.querySelector(".sort-options");
    const sortCurrent = document.querySelector(".sort-current");
    const container = document.querySelector(".products-grid");

    sortToggle.addEventListener("click", () => {
      sortOptions.classList.toggle("hidden");
    });

    sortOptions.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const sortType = e.target.dataset.sort;
        sortCurrent.textContent = e.target.textContent;
        sortOptions.classList.add("hidden");
        sortProducts(sortType);
      }
    });

    function sortProducts(type) {
      const cards = Array.from(container.querySelectorAll(".product-card"));
      let sorted;

      if (type === "price-asc") {
        sorted = cards.sort((a, b) => getPrice(a) - getPrice(b));
      } else if (type === "price-desc") {
        sorted = cards.sort((a, b) => getPrice(b) - getPrice(a));
      } else {
        sorted = cards.sort((a, b) => a.dataset.originalIndex - b.dataset.originalIndex);
      }

      container.innerHTML = "";
      sorted.forEach(card => container.appendChild(card));
    }

    function getPrice(card) {
      const priceText = card.querySelector(".product-price").textContent;
      return parseInt(priceText.replace(/\D/g, ""), 10);
    }

    const cards = container.querySelectorAll(".product-card");
    cards.forEach((card, index) => {
      card.setAttribute("data-original-index", index);
    });
  });



document.addEventListener("DOMContentLoaded", function () {
  const applyButton = document.querySelector(".primary-button");
  const resetButton = document.querySelector(".secondary-button");
  const cardsContainer = document.querySelector(".products-grid");
  const allCards = Array.from(cardsContainer.querySelectorAll(".product-card"));

  applyButton.addEventListener("click", function () {
    const selectedCountries = Array.from(document.querySelectorAll('.checkbox-option input:checked'))
      .map(input => input.nextElementSibling.nextElementSibling.textContent.trim());

    const selectedMilkRadio = document.querySelector('input[name="milk"]:checked');
    const selectedMilk = selectedMilkRadio ? selectedMilkRadio.nextElementSibling.nextElementSibling.textContent.trim() : "Неважливо";

    const filtered = allCards.filter(card => {
      const cardCountry = card.dataset.country;
      const cardMilk = card.dataset.milk;

      const matchCountry = selectedCountries.length === 0 || selectedCountries.includes(cardCountry);
      const matchMilk = selectedMilk === "Неважливо" || selectedMilk === cardMilk;

      return matchCountry && matchMilk;
    });

    cardsContainer.innerHTML = "";
    filtered.forEach(card => cardsContainer.appendChild(card));
  });

  resetButton.addEventListener("click", function () {
    document.querySelectorAll('.checkbox-option input').forEach(chk => chk.checked = false);
    document.querySelectorAll('input[name="milk"]').forEach(r => r.checked = false);
    document.querySelector('input[name="milk"]').checked = true; 
    cardsContainer.innerHTML = "";
    allCards.forEach(card => cardsContainer.appendChild(card));
  });
});