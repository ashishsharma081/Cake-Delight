(function () {
  const QUERY_KEY = "cakeDelightContactQueriesV1";

  function safeParse(value) {
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveQuery(payload) {
    const existing = safeParse(localStorage.getItem(QUERY_KEY));
    const next = [{ ...payload, createdAt: new Date().toISOString() }, ...existing].slice(0, 20);
    localStorage.setItem(QUERY_KEY, JSON.stringify(next));
  }

  function initContactPage() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill your name, email and message so we can help properly.";
        return;
      }

      saveQuery({ name, email, subject, message });

      const supportEmail = window.CartService?.supportEmail || "info@cakedelight.in";
      const supportNumber = window.CartService?.supportNumber || "919336002651";
      const emailSubject = subject || `Cake Delight support request from ${name}`;
      const emailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
        "",
        `WhatsApp support: +${supportNumber}`
      ].join("\n");

      status.textContent = "Your query is ready to send. We are opening your email draft now.";
      if (window.CartService) {
        window.CartService.showToast("Opening support email");
      }

      window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      form.reset();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactPage);
  } else {
    initContactPage();
  }
})();
