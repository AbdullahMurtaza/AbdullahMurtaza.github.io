//*************************New Func****************************
// Function to copy the text content of a given HTML element.
function copyText(element) {
    // Create a range object
    const range = document.createRange();
    // Select the content of the element
    range.selectNode(element);
    // Clear existing selections
    window.getSelection().removeAllRanges();
    // Add the range to the selection
    window.getSelection().addRange(range);
    // Execute the copy command
    document.execCommand("copy");
    // Clear the selection
    window.getSelection().removeAllRanges();
  }
  