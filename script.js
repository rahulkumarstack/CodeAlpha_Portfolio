

(() => {
  "use strict";

  /* ---------------------------------------------------------
     1. Sticky nav background on scroll
  --------------------------------------------------------- */
  const nav = document.getElementById("nav");

  function handleNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---------------------------------------------------------
     2. Mobile menu toggle
  --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after a link is tapped
  navLinks.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     3. Typing animation in the hero
  --------------------------------------------------------- */
  const typingEl = document.getElementById("typingText");
  const phrases = [
    "responsive websites.",
    "clean user interfaces.",
    "interactive web apps.",
    "accessible experiences.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = currentPhrase.slice(0, charIndex);

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of a full phrase before deleting
      delay = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();

  /* ---------------------------------------------------------
     4. Scroll-reveal animations (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     5. Animated skill progress bars (fires once, on view)
  --------------------------------------------------------- */
  const skillBars = document.querySelectorAll(".skill__bar");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.dataset.width || "0";
          // Small timeout lets the reveal transition start first
          setTimeout(() => {
            bar.style.width = `${targetWidth}%`;
          }, 150);
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* ---------------------------------------------------------
     6. Animated stat counters (About section)
  --------------------------------------------------------- */
  const statEls = document.querySelectorAll(".about__stat-num");

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  statEls.forEach((el) => statObserver.observe(el));

  /* ---------------------------------------------------------
     7. Back-to-top button
  --------------------------------------------------------- */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 600) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    },
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------
     8. Highlight active nav link based on scroll position
  --------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav__link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((anchor) => {
            anchor.classList.toggle(
              "is-active",
              anchor.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------------------------------------------------------
     9. Footer year
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();