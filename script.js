document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".service-btn");
  const formSection = document.getElementById("booking-form");
  const confirmationSection = document.getElementById("confirmation");
  const nameInput = document.getElementById("userName");
  const addressInput = document.getElementById("userAddress");
  const timeInput = document.getElementById("userTime");

  let selectedService = "General";

  // Handle service button click
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Highlight selected button
      buttons.forEach(b => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");

      selectedService = btn.getAttribute("data-service") || "General";

      formSection.style.display = "block";
      confirmationSection.style.display = "none";
    });
  });

  // Booking form submission
  window.submitBooking = () => {
    const name = nameInput.value.trim();
    const address = addressInput.value.trim();
    const time = timeInput.value;

    if (!name || !address || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const booking = { name, address, time, service: selectedService };

    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    })
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(() => {
      formSection.style.display = "none";
      confirmationSection.style.display = "block";

      // Clear form inputs
      nameInput.value = "";
      addressInput.value = "";
      timeInput.value = "";

      // Reset button highlights
      buttons.forEach(b => b.classList.remove("btn-primary"));
    })
    .catch(err => {
      console.error(err);
      alert("Failed to book service. Please try again later.");
    });
  };
});
