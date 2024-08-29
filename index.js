const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Function to check if a string contains Hebrew characters
function containsHebrew(str) {
    return /[\u0590-\u05FF]/.test(str);
}

function containsArabic(str) {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(str);
}

// Function to reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}


const inputFolder = 'input'; // Replace with your input folder path
const outputFolder = 'output'; // Replace with your output folder path

// Ensure the output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Error reading the directory:', err);
        return;
    }

    // Filter to get only .html files
    const htmlFiles = files.filter((file) => path.extname(file).toLowerCase() === '.html');

    htmlFiles.forEach((file) => {
        const inputFilePath = path.join(inputFolder, file);
        const outputFilePath = path.join(outputFolder, file);
        // Read the HTML file
        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }

            // Load the HTML content
            const $ = cheerio.load(data);

            // Find all elements with class starting with "calibre"
            $('[class^="calibre"]').each((index, element) => {
                const $element = $(element);
                const text = $element.text();

                if (containsHebrew(text) || containsArabic(text)) {
                    // Reverse the text content
                    const reversedText = reverseString(text);

                    // Replace the text content while keeping the HTML structure intact
                    $element.contents().filter(function () {
                        return this.nodeType === 3; // Text nodes only
                    }).each(function () {
                        this.nodeValue = reverseString(this.nodeValue);
                    });
                }
            });

            // Write the modified HTML to a new file
            fs.writeFile(outputFilePath, $.html(), (err) => {
                if (err) {
                    console.error('Error writing the file:', err);
                } else {
                    console.log('File processed successfully. Output saved to output.html');
                }
            });
        });
    })
})