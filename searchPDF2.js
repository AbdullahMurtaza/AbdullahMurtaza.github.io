async function searchPDF() {
    // Get the selected PDF file
    const fileInput = document.getElementById("pdfFile");
    const file = fileInput.files[0];
  
    // Object to store page numbers with their corresponding keywords and total page count
    const keywordData = {};
  
    // Iterate through each checkbox and collect selected keywords
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
      const cityName = checkbox.name;
      const keyword = checkbox.value;
  
      // Proceed only if a file and keyword are selected
      if (file) {
        // Create a FileReader object to read the file
        const fileReader = new FileReader();
  
        // When the file is loaded, process it
        fileReader.onload = async function () {
          // Create a typed array from the file data
          const typedArray = new Uint8Array(this.result);
  
          // Load the PDF document using pdf.js library
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
  
          // Iterate through each page of the PDF
          for (let i = 1; i <= pdf.numPages; i++) {
            // Get the page object
            const page = await pdf.getPage(i);
  
            // Extract the text content of the page
            const textContent = await page.getTextContent();
  
            // Convert the text content items into a single string
            const text = textContent.items.map(item => item.str).join('');
  
            // Check if the keyword exists in the page text
            if (text.includes(keyword)) {
              // Add the page number to the result object for the current city
              if (!keywordData[cityName]) {
                keywordData[cityName] = {
                  pageNumbers: [],
                  totalCount: 0
                };
              }
              keywordData[cityName].pageNumbers.push(i);
              keywordData[cityName].totalCount++;
            }
          }
  
          // Display the results on the webpage
          displayResults(keywordData);
        };
  
        // Read the file as an ArrayBuffer
        fileReader.readAsArrayBuffer(file);
      } else {
        alert("Please select a PDF file.");
      }
    });
  }
  