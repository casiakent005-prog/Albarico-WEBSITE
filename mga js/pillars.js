(function () {
  var modal = document.getElementById("pdf-modal");
  var modalTitle = document.getElementById("pdf-modal-title");
  var modalClose = document.querySelector(".pdf-modal-close");
  var pdfViewer = document.getElementById("pdf-viewer");
  var pdfUploadArea = document.getElementById("pdf-upload-area");
  var pdfFileInput = document.getElementById("pdf-file-input");
  var pdfUploadBtn = document.querySelector(".pdf-upload-btn");
  var pdfDownloadBtn = document.getElementById("pdf-download-btn");
  var zoomOutBtn = document.querySelector(".pdf-zoom-out");
  var zoomInBtn = document.querySelector(".pdf-zoom-in");
  var zoomLevel = document.getElementById("pdf-zoom-level");
  
  var currentZoom = 100;
  var currentPdfUrl = null;
  var currentPdfBlob = null;

  var brochureButtons = document.querySelectorAll(".pillar-btn[data-brochure]");

  brochureButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var brochureType = btn.getAttribute("data-brochure");
      var card = btn.closest(".pillar-card");
      var pillarTitle = card.querySelector(".pillar-title").textContent;
      
      modalTitle.textContent = pillarTitle + " Brochure";
      currentPdfUrl = null;
      currentPdfBlob = null;
      
      pdfViewer.style.display = "none";
      pdfUploadArea.style.display = "block";
      pdfDownloadBtn.style.display = "none";
      currentZoom = 100;
      zoomLevel.textContent = "100%";
      
      modal.classList.add("is-open");
    });
  });

  modalClose.addEventListener("click", function () {
    modal.classList.remove("is-open");
    if (pdfViewer.src) {
      URL.revokeObjectURL(pdfViewer.src);
      pdfViewer.src = "";
    }
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("is-open");
      if (pdfViewer.src) {
        URL.revokeObjectURL(pdfViewer.src);
        pdfViewer.src = "";
      }
    }
  });

  pdfUploadBtn.addEventListener("click", function () {
    pdfFileInput.click();
  });

  pdfFileInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      currentPdfBlob = file;
      var fileUrl = URL.createObjectURL(file);
      currentPdfUrl = fileUrl;
      
      pdfViewer.src = fileUrl;
      pdfViewer.style.display = "block";
      pdfUploadArea.style.display = "none";
      pdfDownloadBtn.style.display = "inline-block";
    } else {
      alert("Please select a PDF file.");
    }
  });

  pdfDownloadBtn.addEventListener("click", function () {
    if (currentPdfBlob) {
      var link = document.createElement("a");
      link.href = URL.createObjectURL(currentPdfBlob);
      link.download = currentPdfBlob.name;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  });

  zoomInBtn.addEventListener("click", function () {
    if (currentZoom < 200) {
      currentZoom += 10;
      updateZoom();
    }
  });

  zoomOutBtn.addEventListener("click", function () {
    if (currentZoom > 50) {
      currentZoom -= 10;
      updateZoom();
    }
  });

  function updateZoom() {
    zoomLevel.textContent = currentZoom + "%";
    if (pdfViewer.src) {
      pdfViewer.style.transform = "scale(" + (currentZoom / 100) + ")";
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
      if (pdfViewer.src) {
        URL.revokeObjectURL(pdfViewer.src);
        pdfViewer.src = "";
      }
    }
  });
})();
