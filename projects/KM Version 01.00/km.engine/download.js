// download.js

// Function to download selected pages
function downloadSelectedPages(selectedPages) {
  const pdfDoc = window.pdfjsLib.getDocument(pdfData);
  pdfDoc.promise
    .then(function (pdf) {
      const numPages = pdf.numPages;
      const pageCount = selectedPages.length;
      const pdfFileName = 'selected_pages.pdf';

      const pdfDocument = window.pdfjsLib.getDocument(pdfData);

      const promises = selectedPages.map((pageNumber) => {
        return pdfDocument.promise.then((pdfDoc_) => {
          return pdfDoc_.getPage(pageNumber);
        });
      });

      Promise.all(promises)
        .then((pages) => {
          return Promise.all(
            pages.map((page, index) => {
              const viewport = page.getViewport({ scale: 1.5 });
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              return page.render({
                canvasContext: ctx,
                viewport: viewport,
              }).promise.then(function () {
                return canvas.toDataURL('image/jpeg');
              });
            })
          );
        })
        .then((pageImages) => {
          const pdf = new window.jspdf.jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
          });

          pageImages.forEach((imageData, index) => {
            if (index > 0) {
              pdf.addPage();
            }
            pdf.addImage(imageData, 'JPEG', 0, 0, 210, 297);
          });

          pdf.save(pdfFileName);
        });
    })
    .catch(function (error) {
      console.error('Error loading PDF:', error);
    });
}
