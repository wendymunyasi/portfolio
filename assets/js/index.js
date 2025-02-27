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
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Show the spinner
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'inline-block';

  // Reference to the modal elements
  const modal = new bootstrap.Modal(document.getElementById('responseModal'));
  const modalMessage = document.getElementById('modalMessage');
  const modalTitle = document.getElementById('responseModalLabel');

  // Display the modal immediately with a "Sending..." message
  modalTitle.textContent = 'Sending...';
  modalMessage.textContent = 'Your message is being sent. Please wait.';
  modal.show();

  // Collect form data
  const form = document.getElementById('contactForm');
  const formData = {
    name: form.name.value,
    email: form.email.value,
    project_description: form.project_description.value,
  };

  try {
    // Send the data to the Django API
    const response = await fetch('https://portfolio-emails-api.onrender.com/api/submit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Handle the response
    if (response.ok) {
      const result = await response.json();
      modalMessage.textContent = result.message; // Set success message
      modal.show(); // Show the modal

      // Clear the form after successful submission
      document.getElementById('contactForm').reset();
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      modalMessage.textContent = errorData.message || 'Failed to send message. Please try again.';
      modal.show(); // Show the modal
    }
  } catch (error) {
    // Handle both HTTP and network errors here
    console.error('Error:', error);

    // Reference to the modal elements
    const modal = new bootstrap.Modal(document.getElementById('responseModal'));
    const modalMessage = document.getElementById('modalMessage');

    // Display a generic error message in the modal
    modalMessage.textContent = 'An error occurred. Please try again later.';
    modal.show(); // Show the modal
  } finally {
    // Hide the spinner after the process is complete
    spinner.style.display = 'none';
  }
});