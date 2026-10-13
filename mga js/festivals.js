(function () {
  var monthTabs = document.querySelectorAll(".month-tab");
  var festivalCards = document.querySelectorAll(".festival-card");

  monthTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var selectedMonth = tab.getAttribute("data-month");

      monthTabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
      });

      festivalCards.forEach(function (card) {
        var cardMonth = card.getAttribute("data-month");
        if (selectedMonth === "all" || cardMonth === selectedMonth) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();
