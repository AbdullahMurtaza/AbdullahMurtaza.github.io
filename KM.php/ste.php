<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="files/CSS/headerStyle.css">
    <link rel="stylesheet" href="projects/PDF Keyword Miner Version 2.00/ste.css">

    <title>Abdullah Murtaza</title>
    <title>Sale Tax Invoices Extractor</title>
</head>

<header>
    <!-- Your existing header code here -->
</header>

<body>
    <div class="container">
        <h1>Sale Tax Invoices Extractor</h1>
        <form id="pdfSearchForm" action="" method="post" enctype="multipart/form-data">
            <label for="pdfFile">Select PDF File:</label>
            <input type="file" id="pdfFile" name="pdfFile" accept=".pdf">
            <br>

            <!-- Include checkboxes for keywords here -->

            <button type="submit" id="searchButton" name="searchPDF">Search PDF</button>
        </form>

        <!-- Display results container -->
        <div id="results">
            <?php
            // Check if the form was submitted and perform the PDF search
            if (isset($_POST['searchPDF'])) {
                // Function to extract text from the PDF using pdftotext
                function extractTextFromPDF($filePath) {
                    return shell_exec("pdftotext -q \"$filePath\" -");
                }

                // Function to search for keywords in the extracted text
                function searchKeywords($text, $keywords) {
                    $foundKeywords = [];
                    $lowercaseText = strtolower($text);

                    foreach ($keywords as $keyword) {
                        $lowercaseKeyword = strtolower($keyword);

                        if (strpos($lowercaseText, $lowercaseKeyword) !== false) {
                            $foundKeywords[] = $keyword;
                        }
                    }

                    return $foundKeywords;
                }

                // Check if the PDF file is uploaded successfully
                if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] === UPLOAD_ERR_OK) {
                    $file = $_FILES['pdfFile'];
                    $keywords = isset($_POST['keywords']) ? $_POST['keywords'] : [];
                    $uploadDirectory = 'uploads/';
                    $uploadedFilePath = $uploadDirectory . basename($file['name']);

                    // Move the uploaded file to the specified directory
                    if (move_uploaded_file($file['tmp_name'], $uploadedFilePath)) {
                        $pdfText = extractTextFromPDF($uploadedFilePath);
                        $searchResults = searchKeywords($pdfText, $keywords);

                        // Display the search results
                        if (!empty($searchResults)) {
                            echo '<h2>Search Results:</h2>';
                            echo '<ul>';
                            foreach ($searchResults as $result) {
                                echo '<li>' . htmlspecialchars($result) . '</li>';
                            }
                            echo '</ul>';
                        } else {
                            echo '<p>No results found.</p>';
                        }

                        // Clean up: Remove the uploaded PDF file
                        unlink($uploadedFilePath);
                    } else {
                        echo '<p>Failed to move the uploaded PDF file.</p>';
                    }
                } else {
                    echo '<p>Failed to upload the PDF file.</p>';
                }
            }
            ?>
        </div>
    </div>

    <!-- ... Your existing style links ... -->

</body>

</html>
