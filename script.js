const services = {
  two: {
    img: "images/yellow-scooter.png",
    points: [
      ["No Fuel / No Maintenance", "Ride freely and earn more"],
      ["Extra Incentives & Savings", "Get top payouts and rewards"],
      ["Insurance", "Accidental cover up to ₹5 Lakhs"],
      ["24×7 Customer Support", "Chat & ticket support"],
      ["Weekly / Monthly Payouts", "Flexible payment options"],
      ["Growth", "Career growth after 12 months"]
    ]
  },

  three: {
    img: "images/three-wheeler.png",
    points: [
      ["High Load Capacity", "Perfect for bulk deliveries"],
      ["Zero Emission", "Eco-friendly transport"],
      ["Low Maintenance", "Reduced operational costs"],
      ["Dedicated Support", "24×7 assistance"],
      ["Stable Income", "Consistent earnings"],
      ["Business Growth", "Expand logistics operations"]
    ]
  },

  ads: {
    img: "images/advertising.png",
    points: [
      ["Mobile Advertising", "City-wide brand exposure"],
      ["High Visibility", "Seen by thousands daily"],
      ["Cost Effective", "Better ROI than billboards"],
      ["Targeted Routes", "High traffic locations"],
      ["Brand Recall", "Strong visual impact"],
      ["Campaign Tracking", "Monitor performance"]
    ]
  }
};

function showService(type, btn) {

  // BUTTON ACTIVE STATE
  document.querySelectorAll(".service-tabs button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // IMAGE CHANGE
  document.getElementById("serviceImg").src = services[type].img;

  // POINTS RENDER
  const container = document.getElementById("servicePoints");
  container.innerHTML = "";

  services[type].points.forEach(item => {
    const card = document.createElement("div");
    card.className = "point-card";
    card.innerHTML = `
      <h3>${item[0]}</h3>
      <p>${item[1]}</p>
    `;
    container.appendChild(card);
  });
}


// ================= FAQ ACCORDION (FRANCHISE SAFE) =================
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;

      // close others
      document.querySelectorAll(".faq-item").forEach((el) => {
        if (el !== item) el.classList.remove("active");
      });

      // toggle current
      item.classList.toggle("active");
    });
  });
});


// ================================
// HOME PAGE FAQ TOGGLE (SAFE)
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const homeFaqs = document.querySelectorAll(
    ".home-page .faq-question"
  );

  homeFaqs.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".faq-icon");

      if (!answer) return;

      // Toggle answer
      if (answer.style.display === "block") {
        answer.style.display = "none";
        if (icon) icon.textContent = "+";
      } else {
        answer.style.display = "block";
        if (icon) icon.textContent = "−";
      }
    });
  });
});



// ABOUT PAGE FAQ TOGGLE (SAFE & ISOLATED)
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("about-page")) return;

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    question.addEventListener("click", () => {
      const isOpen = answer.style.display === "block";

      // close all
      document.querySelectorAll(".about-page .faq-answer")
        .forEach(a => a.style.display = "none");
      document.querySelectorAll(".about-page .faq-icon")
        .forEach(i => i.textContent = "+");

      // open clicked
      if (!isOpen) {
        answer.style.display = "block";
        icon.textContent = "−";
      }
    });
  });
});
