(function () {
  const forms = document.querySelectorAll("[data-subscribe-form]");
  const storageKey = "worldview-blog-subscribers";
  const syncedStorageKey = "worldview-blog-subscribers-synced";
  const endpointMeta = document.querySelector('meta[name="worldview-subscribe-endpoint"]');
  const subscribeEndpoint = endpointMeta ? endpointMeta.content : "/api/subscribe";

  function getSubscribers() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch (_error) {
      return [];
    }
  }

  function getSyncedSubscribers() {
    try {
      return JSON.parse(localStorage.getItem(syncedStorageKey) || "[]");
    } catch (_error) {
      return [];
    }
  }

  function normalizeEmail(email) {
    return email.trim().toLowerCase();
  }

  function saveSubscriber(email) {
    const subscribers = getSubscribers();
    const normalized = normalizeEmail(email);
    if (!subscribers.includes(normalized)) {
      subscribers.push(normalized);
      localStorage.setItem(storageKey, JSON.stringify(subscribers));
    }
    return normalized;
  }

  function markSubscribersSynced(emails) {
    const synced = new Set(getSyncedSubscribers().map(normalizeEmail));
    emails.forEach((email) => synced.add(normalizeEmail(email)));
    localStorage.setItem(syncedStorageKey, JSON.stringify(Array.from(synced)));
  }

  function unsyncedSubscribers() {
    const synced = new Set(getSyncedSubscribers().map(normalizeEmail));
    return getSubscribers()
      .map(normalizeEmail)
      .filter((email) => email && !synced.has(email));
  }

  async function syncSubscribers(emails) {
    const normalizedEmails = Array.from(new Set(emails.map(normalizeEmail).filter(Boolean)));
    if (!normalizedEmails.length) return true;

    try {
      const response = await fetch(subscribeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emails: normalizedEmails })
      });
      if (response.ok) {
        markSubscribersSynced(normalizedEmails);
        return true;
      }
      return false;
    } catch (_error) {
      return false;
    }
  }

  syncSubscribers(unsyncedSubscribers());

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const status = form.querySelector("[data-form-status]");

      if (!input || !status) return;
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }

      const email = saveSubscriber(input.value);
      const synced = await syncSubscribers([email]);
      status.textContent = synced ? "已完成訂閱。" : "已在此瀏覽器記錄訂閱，待同步寄送清單。";
      status.classList.add("success");
      form.reset();
    });
  });
})();
