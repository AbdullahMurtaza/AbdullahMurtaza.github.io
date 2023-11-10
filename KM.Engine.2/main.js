//*****************************************************
//******************Main Function**********************
//*****************************************************


// Event listener for the "Copy All" button
document.addEventListener("DOMContentLoaded", () => {
    // Get the "Copy All" button
    const copyAllButton = document.getElementById("copyAllButton");
    
    // Check if the button exists before adding the event listener
    if (copyAllButton) {
      copyAllButton.addEventListener("click", copyAllResults);
    }
  });
  