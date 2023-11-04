// Function to add a button for creating a PDF of a keyword's output
function addCreatePDFButton(keyword, pages) {
  const createPDFButton = document.createElement("button");
  createPDFButton.textContent = `Create PDF for "${keyword}"`;
  createPDFButton.addEventListener("click", async () => {
    // Add the functionality to create a PDF here
  });
  return createPDFButton;
}

// Function to download a PDF
function downloadPDF(pdfURL, filename) {
  const a = document.createElement("a");
  a.href = pdfURL;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Add buttons for creating PDFs for each keyword
function addPDFButtons(keywordData) {
  for (const keyword in keywordData) {
    if (keywordData.hasOwnProperty(keyword)) {
      const data = keywordData[keyword];
      const outputSection = document.querySelector(
        `.output-section:has(p:contains(${data.pageNumbers.join(", ")}))`
      );
      const createPDFButton = addCreatePDFButton(
        keyword,
        data.pageNumbers
      );
      outputSection.appendChild(createPDFButton);
    }
  }
}

// Function to search the PDF
function searchPDF() {
  // Get the selected PDF file and checked keywords
  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];
  const keywords = Array.from(
    document.querySelectorAll('input[name="keywords"]:checked')
  );
  const keywordData = {};

  // Check if a PDF file and keywords are selected
  if (!file || keywords.length === 0) {
    alert("Please select a PDF file and at least one keyword.");
    return;
  }

  // Create a FileReader to read the selected PDF file
  const reader = new FileReader();

  reader.onload = function () {
    // Create a typed array from the PDF file
    const typedArray = new Uint8Array(reader.result);

    // Load the PDF document using pdf.js
    pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
      const numPages = pdf.numPages;

      // Iterate through each page of the PDF
      for (let i = 1; i <= numPages; i++) {
        pdf.getPage(i).then((page) => {
          page.getTextContent().then((content) => {
            // Extract text content from the page
            const text = content.items.map((item) => item.str).join(" ");

            // Check each selected keyword in the page text
            keywords.forEach((keywordInput) => {
              const keyword = keywordInput.value;

              // If the keyword is found, store the page information
              if (text.includes(keyword)) {
                if (!keywordData[keyword]) {
                  keywordData[keyword] = {
                    pageNumbers: [],
                    totalCount: 0,
                  };
                }
                keywordData[keyword].pageNumbers.push(i);
                keywordData[keyword].totalCount++;
              }
            });

            // Display the results when all pages are processed
            if (i === numPages) {
              displayResults(keywordData);
            }
          });
        });
      }
    });
  };

  // Read the selected PDF file as an ArrayBuffer
  reader.readAsArrayBuffer(file);
}

// Function to display search results
function displayResults(keywordData) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  // If no results are found, display a message
  if (Object.keys(keywordData).length === 0) {
    resultsDiv.textContent = "No pages found with the selected keyword(s).";
    return;
  }

  // Iterate through each keyword and display the results
  for (const keyword in keywordData) {
    if (keywordData.hasOwnProperty(keyword)) {
      const data = keywordData[keyword];
      const resultSection = document.createElement("div");
      resultSection.classList.add("result-section");

      // Create a section for the keyword
      const keywordSection = document.createElement("div");
      keywordSection.classList.add("keyword-section");

      // Create a paragraph with the keyword
      const keywordParagraph = document.createElement("p");
      keywordParagraph.innerHTML = `<strong>${keyword}:</strong>`;
      keywordSection.appendChild(keywordParagraph);

      // Create a section for the total results
      const totalResultsSection = document.createElement("div");
      totalResultsSection.classList.add("total-results-section");

      // Create a paragraph with the total results
      const totalResultsParagraph = document.createElement("p");
      totalResultsParagraph.textContent = `Total Results: ${data.totalCount}`;
      totalResultsSection.appendChild(totalResultsParagraph);

      // Create a section for the output
      const outputSection = document.createElement("div");
      outputSection.classList.add("output-section");

      // Create a paragraph with the page numbers
      const outputParagraph = document.createElement("p");
      outputParagraph.textContent = `${data.pageNumbers.join(", ")}`;
      outputSection.appendChild(outputParagraph);

      // Create a "Copy" button for the output
      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy";
      copyButton.addEventListener("click", function () {
        copyText(outputParagraph);
      });
      outputSection.appendChild(copyButton);

      // Append elements to the result section
      keywordSection.appendChild(totalResultsSection);
      totalResultsParagraph.appendChild(outputSection);
      resultSection.appendChild(keywordSection);
      resultSection.appendChild(totalResultsSection);
      resultSection.appendChild(outputSection);

      // Append the result section to the results container
      resultsDiv.appendChild(resultSection);
    }
  }

  // Create a "Copy All" button
  const copyAllButton = document.createElement("button");
  copyAllButton.textContent = "Copy All";
  copyAllButton.addEventListener("click", function () {
    copyAll(resultsDiv);
  });
  resultsDiv.appendChild(copyAllButton);

  // Create a "Copy All Results Only" button
  const copyResultsOnlyButton = document.createElement("button");
  copyResultsOnlyButton.textContent = "Copy All Results Only";
  copyResultsOnlyButton.addEventListener("click", function () {
    copyResultsOnly(resultsDiv);
  });
  resultsDiv.appendChild(copyResultsOnlyButton);
}

// Function to copy text to clipboard
function copyText(element) {
  const range = document.createRange();
  range.selectNode(element);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

// Function to copy all sections
function copyAll(resultsDiv) {
  copyText(resultsDiv);
}

// Function to copy only the output sections
function copyResultsOnly(resultsDiv) {
  const outputSections = resultsDiv.querySelectorAll(".output-section p");

  // Extract and sort page numbers
  const pageNumbers = Array.from(outputSections)
    .map((section) => section.textContent.trim().split(","))
    .flat()
    .map((pageNumber) => parseInt(pageNumber))
    .sort((a, b) => a - b);

  const sortedPageNumbersText = pageNumbers.join(", ");

  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = sortedPageNumbersText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

// Initialize the PDF.js library
const pdfjsLib = window["pdfjs-dist/build/pdf"];
