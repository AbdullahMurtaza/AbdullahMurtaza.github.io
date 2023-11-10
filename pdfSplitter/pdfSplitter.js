// script.js

async function extractPages(button) {
    const pdfFileInput = document.getElementById('pdfFileInput');
    const section = button.closest('div');
    const outputFileNameInput = section.querySelector('.outputFileName');
    const pageNumbersInput = section.querySelector('.pageNumbers');

    if (!pdfFileInput.files[0]) {
        alert('Please select a PDF file.');
        return;
    }

    const file = pdfFileInput.files[0];
    const outputFileName = outputFileNameInput.value.trim();
    const pageRanges = pageNumbersInput.value.split(',').map(range => range.trim());

    if (!outputFileName || !pageNumbersInput.value) {
        alert('Please fill in all the required fields for this section.');
        return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

    const newPdfDoc = await PDFLib.PDFDocument.create();

    for (const pageRange of pageRanges) {
        const [start, end] = pageRange.split('-').map(Number);

        if (start >= 1 && end <= pdfDoc.getPageCount() && start <= end) {
            for (let pageNum = start; pageNum <= end; pageNum++) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
                newPdfDoc.addPage(copiedPage);
            }
        } else {
            alert(`Invalid page range: ${pageRange} for section with output file name: ${outputFileName}.`);
            return;
        }
    }

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

    // Clear input fields
    // outputFileNameInput.value = '';
    // pageNumbersInput.value = '';
}

function addSection() {
    const sectionsContainer = document.getElementById('sectionsContainer');
    const sectionDiv = document.createElement('div');

    sectionDiv.innerHTML = `
        <hr>
        <label for="outputFileName">Output File Name:</label>
        <input type="text" class="outputFileName">
        <br>
        <label for="pageNumbers">Enter Page Numbers (comma-separated or ranges):</label>
        <textarea class="pageNumbers" rows="4"></textarea>
        <br>
        <button onclick="extractPages(this)">Extract Pages</button>
    `;

    sectionsContainer.appendChild(sectionDiv);
}

async function extractAll() {
    const pdfFileInput = document.getElementById('pdfFileInput');
    const sections = document.querySelectorAll('#sectionsContainer > div');

    if (!pdfFileInput.files[0] || sections.length === 0) {
        alert('Please select a PDF file and add at least one section.');
        return;
    }

    for (const section of sections) {
        const outputFileNameInput = section.querySelector('.outputFileName');
        const pageNumbersInput = section.querySelector('.pageNumbers');

        const file = pdfFileInput.files[0];
        const outputFileName = outputFileNameInput.value.trim();
        const pageRanges = pageNumbersInput.value.split(',').map(range => range.trim());

        if (!outputFileName || !pageNumbersInput.value) {
            alert('Please fill in all the required fields for each section.');
            return;
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

        const newPdfDoc = await PDFLib.PDFDocument.create();

        for (const pageRange of pageRanges) {
            const [start, end] = pageRange.split('-').map(Number);

            if (start >= 1 && end <= pdfDoc.getPageCount() && start <= end) {
                for (let pageNum = start; pageNum <= end; pageNum++) {
                    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
                    newPdfDoc.addPage(copiedPage);
                }
            } else {
                alert(`Invalid page range: ${pageRange} for section with output file name: ${outputFileName}.`);
                return;
            }
        }

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
    }
}
