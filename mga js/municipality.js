(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var slug = urlParams.get("slug");

  if (!slug) {
    window.location.href = "explore.html";
    return;
  }

  fetch("lgus.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var municipality = data.find(function (item) {
        return item.slug === slug;
      });

      if (!municipality) {
        window.location.href = "explore.html";
        return;
      }

      document.title = municipality.name + " - Cebu Tourism";
      document.getElementById("municipality-breadcrumb").textContent = municipality.name;
      document.getElementById("municipality-title").textContent = municipality.name;
      document.getElementById("municipality-overview-text").textContent = municipality.overview;
      document.getElementById("municipality-location").textContent = municipality.where_located;
      document.getElementById("municipality-culture").textContent = municipality.culture_heritage;
      document.getElementById("municipality-transport").textContent = municipality.how_to_get_there;
      document.getElementById("municipality-season").textContent = municipality.best_time_to_visit;
      document.getElementById("municipality-food").textContent = municipality.food_specialties;
      document.getElementById("municipality-attractions").textContent = municipality.top_attractions;
      document.getElementById("municipality-officer").textContent = municipality.tourism_officer || "Not specified";
      
      var phoneEl = document.getElementById("municipality-phone");
      phoneEl.textContent = municipality.contact_number;
      phoneEl.href = "tel:" + municipality.contact_number.replace(/[^0-9+]/g, "");
      
      var emailEl = document.getElementById("municipality-email");
      emailEl.textContent = municipality.contact_email;
      emailEl.href = "mailto:" + municipality.contact_email;

      var heroImg = document.getElementById("municipality-hero");
      if (municipality.cover) {
        heroImg.src = "https://tourism.cebu.gov.ph" + municipality.cover;
        heroImg.alt = municipality.name;
      } else {
        heroImg.src = "https://tourism.cebu.gov.ph/images/localized/6ce2cff1-copy-of-cebu-1.jpg";
        heroImg.alt = municipality.name;
      }
    })
    .catch(function (error) {
      console.error("Error loading municipality data:", error);
      window.location.href = "explore.html";
    });
})();
