<?php
// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the PDF file is uploaded successfully
    if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] === UPLOAD_ERR_OK) {
        // Get the file and keywords from the POST data
        $file = $_FILES['pdfFile'];
        $keywords = isset($_POST['keywords']) ? $_POST['keywords'] : [];

        // Directory to store the uploaded PDF files
        $uploadDirectory = 'uploads/';
        $uploadedFilePath = $uploadDirectory . basename($file['name']);

        // Move the uploaded file to the specified directory
        if (move_uploaded_file($file['tmp_name'], $uploadedFilePath)) {
            // Use pdftotext utility to extract text from the PDF
            $pdfText = extractTextFromPDF($uploadedFilePath);

            // Search for keywords in the extracted text
            $searchResults = searchKeywords($pdfText, $keywords);

            // Respond to the client-side JavaScript with the search results
            echo json_encode(['success' => true, 'results' => $searchResults]);

            // Clean up: Remove the uploaded PDF file
            unlink($uploadedFilePath);
        } else {
            // Respond to the client-side JavaScript with an error
            echo json_encode(['success' => false, 'error' => 'Failed to move the uploaded PDF file.']);
        }
    } else {
        // Respond to the client-side JavaScript with an error
        echo json_encode(['success' => false, 'error' => 'Failed to upload the PDF file.']);
    }
}

// Function to extract text from the PDF using pdftotext
function extractTextFromPDF($filePath) {
    // Use shell_exec to run pdftotext and capture its output
    return shell_exec("pdftotext -q \"$filePath\" -");
}

// Function to search for keywords in the extracted text
function searchKeywords($text, $keywords) {
    $foundKeywords = [];

    // Convert text to lowercase for case-insensitive search
    $lowercaseText = strtolower($text);

    foreach ($keywords as $keyword) {
        $lowercaseKeyword = strtolower($keyword);

        // Check if the keyword exists in the text
        if (strpos($lowercaseText, $lowercaseKeyword) !== false) {
            $foundKeywords[] = $keyword;
        }
    }

    return $foundKeywords;
}
?>
