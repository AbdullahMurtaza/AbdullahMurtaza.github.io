// JavaScript code for PDF search functionality

// Function to copy the text content of a given element
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
  
  // Function to handle the search functionality
  async function searchPDF() {
    // Get the selected PDF file and selected keywords from the checkboxes
    const fileInput = document.getElementById("pdfFile");
    const file = fileInput.files[0];
    const keywordCheckboxes = document.querySelectorAll('input[name="keywords"]:checked');
    const keywords = Array.from(keywordCheckboxes).map(checkbox => checkbox.value);
  
    // Proceed only if a file and keywords are selected
    if (file && keywords.length > 0) {
      // Create a FileReader object to read the file
      const fileReader = new FileReader();
  
      // When the file is loaded, process it
      fileReader.onload = async function () {
        // Create a typed array from the file data
        const typedArray = new Uint8Array(this.result);
  
        // Load the PDF document using pdf.js library
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
  
        // Object to store page numbers with their corresponding keywords and total page count
        const keywordData = {};
  
        // Iterate through each page of the PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          // Get the page object
          const page = await pdf.getPage(i);
  
          // Extract the text content of the page
          const textContent = await page.getTextContent();
  
          // Convert the text content items into a single string
          const text = textContent.items.map(item => item.str).join('');
  
          // Check if any of the keywords exist in the page text
          const foundKeywords = keywords.filter(keyword => text.includes(keyword));
  
          // Add the page number and keyword to the result object if any keyword is found
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
    // Get the results container element
    const resultsDiv = document.getElementById("results");
  
    // Clear previous results
    resultsDiv.innerHTML = "";
  
    // Display the appropriate message based on the search results
    if (Object.keys(keywordData).length > 0) {
      // Create a heading for the results
      const resultHeading = document.createElement("h2");
      resultHeading.textContent = "Pages with the keyword(s):";
      resultsDiv.appendChild(resultHeading);
  
      // Iterate through each keyword and its corresponding data
      for (const keyword in keywordData) {
        if (keywordData.hasOwnProperty(keyword)) {
          // Get the page numbers and total count for the keyword
          const pageNumbers = keywordData[keyword].pageNumbers;
          const totalCount = keywordData[keyword].totalCount;
  
          // Create a div for the keyword result
          const keywordDiv = document.createElement("div");
          keywordDiv.classList.add("keyword-result");
  
          // Create a paragraph for the keyword
          const keywordParagraph = document.createElement("p");
          keywordParagraph.innerHTML = `<strong>${keyword}:</strong>`;
  
          // Create a span element for the page numbers string
          const span = document.createElement("span");
  
          // Create a formatted string with comma-separated page numbers and total count
          const formattedString = `${pageNumbers.join(', ')}`;
  
          span.textContent = formattedString;
  
          // Append the span to the keyword paragraph
          keywordParagraph.appendChild(span);
  
          // Append the keyword paragraph to the keyword div
          keywordDiv.appendChild(keywordParagraph);
  
          // Create a copy button for the individual keyword result
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy";
          copyButton.addEventListener("click", () => {
            copyText(keywordParagraph);
          });
  
          // Append the copy button to the keyword div
          keywordDiv.appendChild(copyButton);
  
          // Append the keyword div to the results container
          resultsDiv.appendChild(keywordDiv);
        }
      }
  
      // Create a copy all button
      const copyAllButton = document.createElement("button");
      copyAllButton.textContent = "Copy All";
      copyAllButton.addEventListener("click", copyAllResults);
  
      // Append the copy all button to the results container
      resultsDiv.appendChild(copyAllButton);
    } else {
      // Display a message if no pages were found
      const noResultsMsg = document.createElement("p");
      noResultsMsg.textContent = "No pages found with the keyword(s).";
      resultsDiv.appendChild(noResultsMsg);
    }
  }
  