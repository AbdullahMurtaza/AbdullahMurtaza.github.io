//*************************Search Func****************************
// Function to handle the PDF search functionality.

async function searchPDF() {
  // Get the selected PDF file and selected keywords from the checkboxes
  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];
  // Get the checkboxes for selected keywords
 
  const keywordCheckboxes = document.querySelectorAll('input[name="keywords"]:checked');

 
  // Create an array of selected keywords
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
  else {
    alert("Please select a PDF file OR a keyword(s).")
    //document.write("Please select a PDF file OR a keyword.")
  }
}
