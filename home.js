const steps = document.querySelectorAll(".steps-list li");
const phoneImage = document.getElementById("phoneImage");

let currentStep = 0;

// 👉 IMPORTANT: Replace image paths
const images = [
  "images/securityamount.png",
  "images/token.png",
  "images/securityamount.png",
  "images/profile.png",
  "images/token.png",
  "images/profile.png"
];

// Change step function
function changeStep(index) {
  // Remove active class
  steps.forEach(step => step.classList.remove("active"));

  // Add active class
  steps[index].classList.add("active");

  // Animate image
  phoneImage.classList.add("fade-out");

  setTimeout(() => {
    phoneImage.src = images[index];
    phoneImage.classList.remove("fade-out");
  }, 300);
}

// Auto loop
function autoPlay() {
  currentStep++;
  if (currentStep >= steps.length) {
    currentStep = 0;
  }
  changeStep(currentStep);
}

// Start auto animation
setInterval(autoPlay, 2500); // speed change here

// Click support (premium UX)
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    currentStep = index;
    changeStep(index);
  });
});