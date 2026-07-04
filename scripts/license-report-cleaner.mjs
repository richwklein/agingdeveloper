/* eslint-disable no-undef */
import fs from 'fs'
import sanitizeHtml from 'sanitize-html'

const inputFile = process.argv[2] // Take input file as a command-line argument

if (!inputFile) {
  console.error('Error: Input file not specified.')
  process.exit(1)
}

try {
  // Read the HTML content from the input file
  const htmlContent = fs.readFileSync(inputFile, 'utf8')

  // Sanitize the HTML
  const cleanedHtml = sanitizeHtml(htmlContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter((tag) => tag !== 'style'), // Remove <style> tags
    allowedAttributes: false, // Remove all attributes
  }).trim()

  // Output the sanitized HTML to stdout
  console.log(cleanedHtml)
} catch (error) {
  console.error('Error processing file:', error.message)
  process.exit(1)
}
