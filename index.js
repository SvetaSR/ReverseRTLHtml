const fs = require('fs');
const cheerio = require('cheerio');

// Function to check if a string contains Hebrew characters
function containsHebrew(str) {
    return /[\u0590-\u05FF]/.test(str);
}

// Function to reverse a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Read the HTML file
fs.readFile('input.html', 'utf8', (err, data) => {
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

        if (containsHebrew(text)) {
            // Reverse the text content
            const reversedText = reverseString(text);

            // Replace the text content while keeping the HTML structure intact
            $element.contents().filter(function() {
                return this.nodeType === 3; // Text nodes only
            }).each(function() {
                this.nodeValue = reverseString(this.nodeValue);
            });
        }
    });

    // Write the modified HTML to a new file
    fs.writeFile('output.html', $.html(), (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log('File processed successfully. Output saved to output.html');
        }
    });
});