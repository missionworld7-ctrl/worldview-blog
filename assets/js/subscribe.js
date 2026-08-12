(function () {
  const forms = document.querySelectorAll("[data-subscribe-form]");
  const storageKey = "worldview-blog-subscribers";

  function getSubscribers() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch (_error) {
      return [];
    }
  }

  function saveSubscriber(email) {
    const subscribers = getSubscribers();
    const normalized = email.trim().toLowerCase();
    if (!subscribers.includes(normalized)) {
      subscribers.push(normalized);
      localStorage.setItem(storageKey, JSON.stringify(subscribers));
    }
  }

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const status = form.querySelector("[data-form-status]");

      if (!input || !status) return;
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }

      saveSubscriber(input.value);
      status.textContent = "已記錄訂閱。正式上線時可把這裡接到你的電子報服務。";
      status.classList.add("success");
      form.reset();
    });
  });
})();
