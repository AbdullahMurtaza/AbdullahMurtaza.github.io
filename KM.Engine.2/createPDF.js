async function createPDF(file, pageNumbers, keyword) {
    const fileReader = new FileReader();
  
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
  
      const newPdf = await PDFDocument.create();
  
      // Iterate through each page of the PDF
      for (const pageNumber of pageNumbers) {
        // Get the page object
        const page = await pdf.getPage(pageNumber);
  
        // Extract the page content
        const { width, height } = page.getSize();
        const [newPage] = await newPdf.addPage([width, height]);
        const contentStream = await newPdf.createContentStream(
          ...(await page.getContentStream())
        );
        newPage.addContentStreams([contentStream]);
      }
  
      // Save the new PDF
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
  
      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${keyword}_Pages.pdf`;
      link.click();
    };
  
    fileReader.readAsArrayBuffer(file);
  }
  