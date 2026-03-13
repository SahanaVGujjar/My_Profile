// Minimal enhancements: current year and optional location inference hook.

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Scroll reveal for interactive, motion-rich sections
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.16,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything if IntersectionObserver is unavailable
    revealElements.forEach((el) => el.classList.add("reveal--visible"));
  }

  // Smooth-scroll for in-page navigation (for browsers without native support)
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Role carousel in hero to showcase your range of interests
  const roleSpan = document.querySelector(".hero-meta span:nth-child(2)");
  const roles = [
    "Open to Data Scientist roles",
    "Open to Data Engineer roles",
    "Open to Database Administrator roles",
    "Open to Data Privacy Analyst roles",
    "Open to Data Steward roles",
    "Open to SQL Developer roles",
    "Open to Software Engineer roles",
    "Open to Machine Learning Engineer roles",
  ];

  if (roleSpan) {
    let index = 0;
    const updateRole = () => {
      roleSpan.textContent = roles[index];
      index = (index + 1) % roles.length;
    };

    updateRole();
    // Even faster rotation through open-to roles
    setInterval(updateRole, 900);
  }

  // Contact smiley on focus
  const contactForm = document.querySelector(".contact-form");
  const contactSmiley = document.getElementById("contact-smiley");

  if (contactForm && contactSmiley) {
    contactForm.addEventListener("focusin", () => {
      contactSmiley.classList.add("contact-smiley--visible");
    });

    contactForm.addEventListener("focusout", () => {
      // Slight delay so clicking between fields doesn't flicker
      setTimeout(() => {
        if (!contactForm.contains(document.activeElement)) {
          contactSmiley.classList.remove("contact-smiley--visible");
        }
      }, 80);
    });
  }

  // Recommendations carousel (one card visible with arrows)
  const recommendCards = document.querySelectorAll(".recommend-card");
  const prevBtn = document.getElementById("recommend-prev");
  const nextBtn = document.getElementById("recommend-next");

  if (recommendCards.length > 0 && prevBtn && nextBtn) {
    const carousel = document.querySelector(".recommend-carousel");
    let current = 0;
    let autoTimer;

    const setActiveCard = (index) => {
      recommendCards.forEach((card, i) => {
        if (i === index) {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }
      });
    };

    const gotoNext = () => {
      current = (current + 1) % recommendCards.length;
      setActiveCard(current);
    };

    const gotoPrev = () => {
      current = (current - 1 + recommendCards.length) % recommendCards.length;
      setActiveCard(current);
    };

    const startAuto = () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(gotoNext, 5200);
    };

    const pauseAuto = () => {
      clearInterval(autoTimer);
      autoTimer = null;
    };

    setActiveCard(current);
    startAuto();

    if (carousel) {
      carousel.addEventListener("mouseenter", () => {
        pauseAuto();
      });

      carousel.addEventListener("mouseleave", () => {
        startAuto();
      });
    }

    prevBtn.addEventListener("click", () => {
      gotoPrev();
      startAuto();
    });

    nextBtn.addEventListener("click", () => {
      gotoNext();
      startAuto();
    });
  }
});

