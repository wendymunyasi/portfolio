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

      // Update the URL path without reloading the page
      const newPath = `/${targetClass}`;
      window.history.pushState(null, null, newPath);
    } else {
      console.error(`Section with class "${targetClass}" not found.`);
    }
  });
});