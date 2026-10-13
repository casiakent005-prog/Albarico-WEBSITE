/* =========================================================
   index.js
   Home page interactions: hero slider, Best of Cebu carousel,
   chapter accordion, and destination modal.
   ========================================================= */

(function () {
  /* ---------- Hero slider ---------- */
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dot");
  var heroIndex = 0;
  var heroTimer;

  function showHero(index) {
    heroIndex = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === heroIndex);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === heroIndex);
    });
  }

  function startHero() {
    stopHero();
    heroTimer = setInterval(function () {
      showHero(heroIndex + 1);
    }, 6000);
  }

  function stopHero() {
    if (heroTimer) {
      clearInterval(heroTimer);
    }
  }

  document.querySelector(".hero-next").addEventListener("click", function () {
    showHero(heroIndex + 1);
    startHero();
  });

  document.querySelector(".hero-prev").addEventListener("click", function () {
    showHero(heroIndex - 1);
    startHero();
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      showHero(i);
      startHero();
    });
  });

  showHero(0);
  startHero();

  /* ---------- Best of Cebu carousel ---------- */
  var track = document.querySelector(".places-track");
  var cards = document.querySelectorAll(".place-card");
  var placeIndex = 0;
  var bar = document.querySelector(".places-progress span");

  function cardStep() {
    var card = cards[0];
    if (!card) {
      return 296;
    }
    var styles = window.getComputedStyle(track);
    var gap = parseInt(styles.gap, 10) || 16;
    return card.getBoundingClientRect().width + gap;
  }

  function maxIndex() {
    var visible = window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3;
    return Math.max(0, cards.length - visible);
  }

  function updatePlaces() {
    var max = maxIndex();
    if (placeIndex > max) {
      placeIndex = max;
    }
    track.style.transform = "translateX(" + -(placeIndex * cardStep()) + "px)";
    if (bar) {
      bar.style.width = ((placeIndex + 1) / (max + 1)) * 100 + "%";
    }
  }

  document.querySelector(".places-next").addEventListener("click", function () {
    placeIndex = Math.min(placeIndex + 1, maxIndex());
    updatePlaces();
  });

  document.querySelector(".places-prev").addEventListener("click", function () {
    placeIndex = Math.max(placeIndex - 1, 0);
    updatePlaces();
  });

  window.addEventListener("resize", updatePlaces);
  updatePlaces();

  /* ---------- Destination modal (front-end only) ----------
     The original "Read more" control appears to open destination
     details from the office CMS. This demo uses the card's own
     data attributes so students can see a working overlay.
  */
  var modal = document.getElementById("place-modal");
  var modalImg = document.getElementById("modal-img");
  var modalTitle = document.getElementById("modal-title");
  var modalLoc = document.getElementById("modal-loc");
  var modalText = document.getElementById("modal-text");

  function openModal(card) {
    modalImg.src = card.getAttribute("data-image");
    modalImg.alt = card.getAttribute("data-title");
    modalTitle.textContent = card.getAttribute("data-title");
    modalLoc.textContent = card.getAttribute("data-loc");
    modalText.textContent = card.getAttribute("data-text");
    modal.classList.add("is-open");
  }

  function closeModal() {
    modal.classList.remove("is-open");
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card);
    });
  });

  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  /* ---------- Desktop chapter accordion ---------- */
  var panels = document.querySelectorAll(".chapter-panel");

  panels.forEach(function (panel) {
    panel.addEventListener("click", function (event) {
      if (event.target.closest(".chapter-close")) {
        return;
      }
      panels.forEach(function (other) {
        other.classList.toggle("is-open", other === panel);
      });
    });
  });

  document.querySelectorAll(".chapter-close").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      panels.forEach(function (panel) {
        panel.classList.remove("is-open");
      });
    });
  });

  /* ---------- Mobile chapter accordion ---------- */
  document.querySelectorAll(".mobile-chapter > button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".mobile-chapter").forEach(function (other) {
        other.classList.remove("is-open");
      });
      if (!open) {
        item.classList.add("is-open");
      }
    });
  });
})();
