// pdf.js
async function processPDF(file, keywords) {
    const fileReader = new FileReader();
  
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const keywordData = {};
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join("");
        const foundKeywords = keywords.filter((keyword) => text.includes(keyword));
  
        if (foundKeywords.length > 0) {
          foundKeywords.forEach((keyword) => {
            if (!keywordData[keyword]) {
              keywordData[keyword] = {
                pageNumbers: [],
                totalCount: 0,
              };
            }
            keywordData[keyword].pageNumbers.push(i);
            keywordData[keyword].totalCount++;
          });
        }
      }
  
      // Call the display function
      displayResults(keywordData);
    };
  
    fileReader.readAsArrayBuffer(file);
  }
  