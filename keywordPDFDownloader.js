async function extractKeywordPages() {
    // Get the selected PDF file and selected keywords from the checkboxes
    const fileInput = document.getElementById("pdfFile");
    const file = fileInput.files[0];
    const keywordCheckboxes = document.querySelectorAll('input[name="keywords"]:checked');
    const keywords = Array.from(keywordCheckboxes).map(checkbox => checkbox.value);

    // Proceed only if a file and keywords are selected
    if (file && keywords.length > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

        const newPdfDoc = await PDFLib.PDFDocument.create();

        for (let i = 1; i <= pdfDoc.getPageCount(); i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const text = textContent.items.map(item => item.str).join('');

            // Check if any of the keywords exist in the page text
            const foundKeywords = keywords.filter(keyword => text.includes(keyword));

            // If any keyword is found on the page, add the page to the new PDF document
            if (foundKeywords.length > 0) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i - 1]);
                newPdfDoc.addPage(copiedPage);
            }
        }

        // Generate a filename based on the selected keywords
        const outputFileName = keywords.join('_');

        // Save the new PDF document
        const newPdfBytes = await newPdfDoc.save();
        const blob = new Blob([newPdfBytes], { type: 'application/pdf' });

        // Create a download link for the extracted PDF
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${outputFileName}.pdf`;
        link.textContent = `Download ${outputFileName}.pdf`;

        // Append the link to the output container
        const outputContainer = document.getElementById('outputContainer');
        outputContainer.appendChild(link);

        // Trigger the click event on the link to initiate download
        link.click();
    } else {
        alert("Please select a PDF file and at least one keyword.");
    }
}
