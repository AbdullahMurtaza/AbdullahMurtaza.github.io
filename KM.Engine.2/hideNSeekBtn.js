function hideNSeek() {
    let tagSelectors = document.getElementsByTagName("label");

    if (tagSelectors[0].style.display === "none") {
        for (let i = 0; i < tagSelectors.length; i++) {
            tagSelectors[i].style.display = "block";
        }
    } else {
        for (let i = 0; i < tagSelectors.length; i++) {
            tagSelectors[i].style.display = "none";
        }
    }
}


