// download.js

// Function to download selected pages of the PDF
function downloadPages(pageNumbers) {
  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];

  if (file) {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      const pdfDoc = await pdfjsLib.getDocument({ data: typedArray }).promise;
      const pdfPages = [];

      for (const pageNumber of pageNumbers) {
        const page = await pdfDoc.getPage(pageNumber);
        const pdfPage = await page.getData();
        pdfPages.push(pdfPage);
      }

      const blob = new Blob(pdfPages, { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "selected_pages.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    fileReader.readAsArrayBuffer(file);
  }
}
