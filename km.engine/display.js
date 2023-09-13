// display.js
function displayResults(keywordData) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (Object.keys(keywordData).length > 0) {
    const resultHeading = document.createElement("h2");
    resultHeading.textContent = "Pages with the keyword(s):";
    resultsDiv.appendChild(resultHeading);

    for (const keyword in keywordData) {
      if (keywordData.hasOwnProperty(keyword)) {
        const pageNumbers = keywordData[keyword].pageNumbers;
        const totalCount = keywordData[keyword].totalCount;

        const keywordDiv = document.createElement("div");
        keywordDiv.classList.add("keyword-result");

        const keywordParagraph = document.createElement("p");
        keywordParagraph.innerHTML = `<strong>${keyword}:</strong>`;

        const span = document.createElement("span");
        const formattedString = `${pageNumbers.join(", ")}, Total Pages: ${totalCount}`;
        span.textContent = formattedString;

        keywordParagraph.appendChild(span);
        keywordDiv.appendChild(keywordParagraph);

        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.addEventListener("click", () => {
          copyText(keywordParagraph);
        });

        keywordDiv.appendChild(copyButton);
        resultsDiv.appendChild(keywordDiv);
      }
    }

    const copyAllButton = document.createElement("button");
    copyAllButton.textContent = "Copy All";
    copyAllButton.addEventListener("click", copyAllResults);

    resultsDiv.appendChild(copyAllButton);
  } else {
    const noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "No pages found with the keyword(s).";
    resultsDiv.appendChild(noResultsMsg);
  }
}
