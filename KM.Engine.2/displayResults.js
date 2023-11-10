//*************************New Func****************************
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
  
          // Create an h2 for the keyword name
          const keywordNameH2 = document.createElement("h3");
          keywordNameH2.textContent = keyword;
  
          // Create a div for the total results
          const totalResultsDiv = document.createElement("div");
          totalResultsDiv.classList.add("total-results");
          totalResultsDiv.innerHTML = `<strong>Total Results:</strong> ${totalCount}`;
  
          // Create a div for the page numbers
          const pageNumbersDiv = document.createElement("div");
          pageNumbersDiv.classList.add("page-numbers");
          // Set the innerHTML directly to avoid displaying "Page Numbers" text
          pageNumbersDiv.innerHTML = pageNumbers.join(', ');
  
          // Append the keyword name h2 to the keyword div
          keywordDiv.appendChild(keywordNameH2);
  
          // Append the total results div to the keyword div
          keywordDiv.appendChild(totalResultsDiv);
  
          // Append a line break for clean output
          keywordDiv.appendChild(document.createElement("br"));
  
          // Append the page numbers div to the keyword div
          keywordDiv.appendChild(pageNumbersDiv);
  
          // Create a copy button for the individual keyword result
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy";
          copyButton.addEventListener("click", () => {
            copyText(pageNumbersDiv);
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
  
      // Append a line break before the copy all button
      resultsDiv.appendChild(document.createElement("br"));
  
      // Append the copy all button to the results container
      resultsDiv.appendChild(copyAllButton);
    } else {
      // Display a message if no pages were found
      const noResultsMsg = document.createElement("p");
      noResultsMsg.textContent = "No pages found with the keyword(s).";
      resultsDiv.appendChild(noResultsMsg);
    }
  }
  