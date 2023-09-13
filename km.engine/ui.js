// ui.js
function copyText(element) {
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }
  
  function copyAllResults() {
    const resultsDiv = document.getElementById("results");
    copyText(resultsDiv);
  }
  
  function searchPDF() {
    const fileInput = document.getElementById("pdfFile");
    const file = fileInput.files[0];
    const keywordCheckboxes = document.querySelectorAll('input[name="keywords"]:checked');
    const keywords = Array.from(keywordCheckboxes).map((checkbox) => checkbox.value);
  
    if (file && keywords.length > 0) {
      // Call the PDF processing function
      processPDF(file, keywords);
    }
  }
  
  // Attach event listeners
  document.querySelector(".btn-search").addEventListener("click", searchPDF);
  