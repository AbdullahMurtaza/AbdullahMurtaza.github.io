//Attachment
//***** */

// Function to copy the text content
function copyText(textContent) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = textContent;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select and copy the text from the textarea
  textarea.select();
  document.execCommand('copy');

  // Remove the textarea from the document
  document.body.removeChild(textarea);
}

//************************************* */


/************************************************ */


<!--
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

    // Array to store all page numbers for sorting later
    let allPageNumbers = [];

    // Iterate through each keyword and its corresponding data
    for (const keyword in keywordData) {
      if (keywordData.hasOwnProperty(keyword)) {
        // Get the page numbers and total count for the keyword
        const pageNumbers = keywordData[keyword].pageNumbers;
        const totalCount = keywordData[keyword].totalCount;

        // Create a div for the keyword result
        const keywordDiv = document.createElement("div");
        keywordDiv.classList.add("keyword-result");

        // Create an h3 for the keyword name
        const keywordNameH3 = document.createElement("h3");
        keywordNameH3.textContent = keyword;

        // Create a copy button for the keyword name
        const copyKeywordButton = document.createElement("button");
        copyKeywordButton.textContent = "Copy Name";
        copyKeywordButton.addEventListener("click", () => {
          copyText(keyword);
        });
        // Style the copy button
        copyKeywordButton.style.float = "right";
        copyKeywordButton.style.marginRight = "10px";

        // Append the copy button to the keyword name h3
        keywordNameH3.appendChild(copyKeywordButton);

        // Create a div for the total results
        const totalResultsDiv = document.createElement("div");
        totalResultsDiv.classList.add("total-results");
        totalResultsDiv.innerHTML = `<strong>Total Results:</strong> ${totalCount}`;

        // Create a div for the page numbers
        const pageNumbersDiv = document.createElement("div");
        pageNumbersDiv.classList.add("page-numbers");
        // Set the innerHTML directly to avoid displaying "Page Numbers" text
        pageNumbersDiv.innerHTML = pageNumbers.join(',');

        // Append the keyword name h3 to the keyword div
        keywordDiv.appendChild(keywordNameH3);

        // Append the total results div to the keyword div
        keywordDiv.appendChild(totalResultsDiv);

        //Append Section To Download PDFs
        //sectionsContainer.appendChild(sectionDiv);

        // Append a line break for clean output
        keywordDiv.appendChild(document.createElement("br"));

        // Append the page numbers div to the keyword div
        keywordDiv.appendChild(pageNumbersDiv);

        // Create a copy button for the individual keyword result
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy All";
        copyButton.addEventListener("click", () => {
          copyText(pageNumbersDiv.innerHTML);
        });

        // Append the copy button to the keyword div
        keywordDiv.appendChild(copyButton);

        // Append the keyword div to the results container
        resultsDiv.appendChild(keywordDiv);

        // Add the page numbers to the allPageNumbers array
        allPageNumbers = allPageNumbers.concat(pageNumbers);
      }
    }-->

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

    // Array to store all page numbers for sorting later
    let allPageNumbers = [];

    // Iterate through each keyword and its corresponding data
    for (const keyword in keywordData) {
      if (keywordData.hasOwnProperty(keyword)) {
        // Get the page numbers and total count for the keyword
        const pageNumbers = keywordData[keyword].pageNumbers;
        const totalCount = keywordData[keyword].totalCount;

        // Create a div for the keyword result
        const keywordDiv = document.createElement("div");
        keywordDiv.classList.add("keyword-result");

        // Create an h3 for the keyword name
        const keywordNameH3 = document.createElement("h3");
        keywordNameH3.textContent = keyword;

        // Create a copy button for the keyword name
        const copyKeywordButton = document.createElement("button");
        copyKeywordButton.textContent = "Copy Name";
        copyKeywordButton.addEventListener("click", () => {
          copyText(keyword);
        });
        // Style the copy button
        copyKeywordButton.style.float = "right";
        copyKeywordButton.style.marginRight = "10px";

        // Append the copy button to the keyword name h3
        keywordNameH3.appendChild(copyKeywordButton);

        // Create a div for the total results
        const totalResultsDiv = document.createElement("div");
        totalResultsDiv.classList.add("total-results");
        totalResultsDiv.innerHTML = `<strong>Total Results:</strong> ${totalCount}`;

        // Create a div for the page numbers
        const pageNumbersDiv = document.createElement("div");
        pageNumbersDiv.classList.add("page-numbers");

        // Get unique page numbers by using Set
        const uniquePageNumbers = [...new Set(pageNumbers)];

        // Set the innerHTML to display unique page numbers
        pageNumbersDiv.innerHTML = uniquePageNumbers.join(',');

        // Append the keyword name h3 to the keyword div
        keywordDiv.appendChild(keywordNameH3);

        // Append the total results div to the keyword div
        keywordDiv.appendChild(totalResultsDiv);

        // Append a line break for clean output
        keywordDiv.appendChild(document.createElement("br"));

        // Append the page numbers div to the keyword div
        keywordDiv.appendChild(pageNumbersDiv);

        // Create a copy button for the individual keyword result
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy All";
        copyButton.addEventListener("click", () => {
          copyText(pageNumbersDiv.innerHTML);
        });

        // Append the copy button to the keyword div
        keywordDiv.appendChild(copyButton);

        // Append the keyword div to the results container
        resultsDiv.appendChild(keywordDiv);

        // Add the page numbers to the allPageNumbers array (with uniqueness ensured)
        allPageNumbers = allPageNumbers.concat(uniquePageNumbers);
      }
    }

    // Optional: If you want to sort the combined unique page numbers across all keywords
    allPageNumbers = [...new Set(allPageNumbers)].sort((a, b) => a - b);  // Sorting numerically

    console.log("Unique page numbers from all results:", allPageNumbers); // For debugging
  } else {
    // Handle the case where no results are found
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No results found for your search.";
    resultsDiv.appendChild(noResultsMessage);
  }
}



      //-----------------------------------------

    // Create a div for total results before page numbers in ascending order
    const totalResultsAscDiv = document.createElement("div");
    totalResultsAscDiv.classList.add("total-results-asc");

    // Calculate the total results across all keywords
    const totalResultsAcrossKeywords = allPageNumbers.length;

    // Create an h3 for the total results before page numbers in ascending order
    const totalResultsAscH3 = document.createElement("h3");
    totalResultsAscH3.innerHTML = `<strong>Total Results (Ascending):</strong> ${totalResultsAcrossKeywords}`;

    // Append a line break before the total results asc h3
    resultsDiv.appendChild(document.createElement("br"));

    // Append the total results asc h3 to the results container
    resultsDiv.appendChild(totalResultsAscH3);

    // Create a div for all page numbers in ascending order
    const allPageNumbersDiv = document.createElement("div");
    allPageNumbersDiv.classList.add("all-page-numbers");

    // Sort all page numbers in ascending order
    const sortedPageNumbers = allPageNumbers.sort((a, b) => a - b);

    // Create a paragraph to display sorted page numbers
    const sortedPageNumbersParagraph = document.createElement("p");
    sortedPageNumbersParagraph.textContent = sortedPageNumbers.join(', ');

    // Append the sorted page numbers paragraph to the all page numbers div
    allPageNumbersDiv.appendChild(sortedPageNumbersParagraph);

    // Append a line break before the all page numbers div
    resultsDiv.appendChild(document.createElement("br"));

    // Append the all page numbers div to the results container
    resultsDiv.appendChild(allPageNumbersDiv);

    // Create a copy all button for the sorted page numbers
    const copyAllAscButton = document.createElement("button");
    copyAllAscButton.textContent = "Copy Ascending";
    copyAllAscButton.addEventListener("click", () => {
      copyText(sortedPageNumbersParagraph.innerHTML);
    });

    // Append a line break before the copy all ascending button
    resultsDiv.appendChild(document.createElement("br"));

    // Append the copy all ascending button to the results container
    resultsDiv.appendChild(copyAllAscButton);

    // Create a copy grand button for all original page numbers
    const copyGrandButton = document.createElement("button");
    copyGrandButton.textContent = "Copy Grand";
    copyGrandButton.addEventListener("click", copyAllResults);

    // Append a line break before the copy grand button
    resultsDiv.appendChild(document.createElement("br"));

    // Append the copy grand button to the results container
    resultsDiv.appendChild(copyGrandButton);
  } else {
    // Display a message if no pages were found
    const noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "No pages found with the keyword(s).";
    resultsDiv.appendChild(noResultsMsg);
  }
}

