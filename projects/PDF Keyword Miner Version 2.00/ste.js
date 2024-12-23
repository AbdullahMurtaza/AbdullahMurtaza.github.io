// JavaScript code for PDF search functionality

// Function to copy the Results of one keyword.
function copyText(element) {
  const range = document.createRange();
  range.selectNode(element);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

// Function to copy all search results
function copyAllResults() {
  const resultsDiv = document.getElementById("results");
  copyText(resultsDiv);
}

// Actuall function to handle the search functionality
async function searchPDF() {
  // Get PDF file and selected keywords
  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];
  const keywordCheckboxes = document.querySelectorAll('input[name="keywords"]:checked');
  const keywords = Array.from(keywordCheckboxes).map(checkbox => checkbox.value);

    if (file && keywords.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
            const typedArray = new Uint8Array(this.result);

      
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      // Object to store page numbers with their keywords and total page count
      const keywordData = {};

      // Iterate through each page of the PDF
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join('');
        const foundKeywords = keywords.filter(keyword => text.includes(keyword));

        if (foundKeywords.length > 0) {
          foundKeywords.forEach(keyword => {
            if (!keywordData[keyword]) {
              keywordData[keyword] = {
                pageNumbers: [],
                totalCount: 0
              };
            }
            keywordData[keyword].pageNumbers.push(i);
            keywordData[keyword].totalCount++;
          });
        }
      }

      // Display the results on the webpage
      displayResults(keywordData);
    };

    // Read the file as an ArrayBuffer
    fileReader.readAsArrayBuffer(file);
  }
}

// Function to display the search results on the webpage
function displayResults(keywordData) {
  //results container element
  const resultsDiv = document.getElementById("results");

  // Clearing previous results
  resultsDiv.innerHTML = "";

  // message based on the search results
  if (Object.keys(keywordData).length > 0) {
    //heading for the results
    const resultHeading = document.createElement("h2");
    resultHeading.textContent = "Pages with the keyword(s):";
    resultsDiv.appendChild(resultHeading);

    // Iterating through each keyword in pdf.
    for (const keyword in keywordData) {
      if (keywordData.hasOwnProperty(keyword)) {
        // Page numbers and total count for the keyword
        const pageNumbers = keywordData[keyword].pageNumbers;
        const totalCount = keywordData[keyword].totalCount;

        // Div for the keyword result
        const keywordDiv = document.createElement("div");
        keywordDiv.classList.add("keyword-result");

        // Paragraph for the keyword
        const keywordParagraph = document.createElement("p");
        keywordParagraph.innerHTML = `<strong>${keyword}:</strong>`;

        const span = document.createElement("span");

        const formattedString = `${pageNumbers.join(', ')}`;

        span.textContent = formattedString;

        keywordParagraph.appendChild(span);

        keywordDiv.appendChild(keywordParagraph);

        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.addEventListener("click", () => {
          copyText(keywordParagraph);
        });

        keywordDiv.appendChild(copyButton);

        resultsDiv.appendChild(keywordDiv);
      }
    }

    const copyAllButton = document.createElement("button");
    copyAllButton.textContent = "Copy All";
    copyAllButton.addEventListener("click", copyAllResults);

    resultsDiv.appendChild(copyAllButton);
  } else {

    const noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "No pages found with the keyword(s).";
    resultsDiv.appendChild(noResultsMsg);
  }
}