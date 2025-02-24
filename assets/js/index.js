// Select all navbar links
const navLinks = document.querySelectorAll('nav a');

// Add click event listener to each link
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    // Get the target section class from the data-target attribute
    const targetClass = this.getAttribute('data-target');
    const targetSection = document.querySelector(`.${targetClass}`);

    // Scroll to the target section
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start' // Align to the top of the section
      });
    } else {
      console.error(`Section with class "${targetClass}" not found.`);
    }
  });
});


// Add form submission event listener
// Initialize EmailJS with your Public Key from the environment variable
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY); // Replace with your .env variable

function sendEmail(event) {
  event.preventDefault(); // Prevent the default form submission

  // Show the spinner
  document.getElementById("spinner").style.display = "block";

  // Collect form data
  const form = document.getElementById("contactForm");
  const formData = {
    name: form.name.value,
    email: form.email.value,
    project_description: form.project_description.value,
  };

  // Send the email using EmailJS
  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID from .env
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID from .env
      formData
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);

      // Hide the spinner
      document.getElementById("spinner").style.display = "none";

      // Show success message in the modal
      document.getElementById("responseModalLabel").innerText = "Success!";
      document.getElementById("modalMessage").innerText =
        "Your message has been sent successfully!";
      new bootstrap.Modal(document.getElementById("responseModal")).show();

      // Reset the form
      form.reset();
    })
    .catch((error) => {
      console.error("FAILED...", error);

      // Hide the spinner
      document.getElementById("spinner").style.display = "none";

      // Show error message in the modal
      document.getElementById("responseModalLabel").innerText = "Error!";
      document.getElementById("modalMessage").innerText =
        "Something went wrong. Please try again later.";
      new bootstrap.Modal(document.getElementById("responseModal")).show();
    });
}
