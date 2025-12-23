// Initialize AOS animations
document.addEventListener("DOMContentLoaded", function () {
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }

  // Typed text effect for hero sub-heading
  const typedElement = document.getElementById("typedText");
  const roles = [
    "PHP Developer",
    "Web Designer",
    "UI/UX Enthusiast",
  ];
  let currentRoleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typedElement) return;

    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = 120;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1500; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 400;
    } else if (isDeleting) {
      typingSpeed = 60;
    }

    setTimeout(type, typingSpeed);
  }

  type();

  // Smooth scroll for nav links and buttons
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const yOffset = -74; // fixed navbar height offset
      const y =
        targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      // Close navbar on mobile after click
      const navbarCollapse = document.getElementById("navbarNav");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true,
        });
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop");
  const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop);

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});


