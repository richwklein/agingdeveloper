/* eslint-disable no-undef */
import sanitizeHtml from 'sanitize-html';

async function sanitizeHtmlInput() {
  try {
    let htmlContent = '';

    // Read from stdin
    process.stdin.on('data', (chunk) => {
      htmlContent += chunk;
    });

    process.stdin.on('end', () => {
      // Sanitize the HTML
      const cleanedHtml = sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.filter(tag => tag !== 'style'), // Remove <style> tags
        allowedAttributes: false, // Remove all attributes (optional, customize as needed)
      }).trim();

      // Write cleaned HTML to stdout
      process.stdout.write(cleanedHtml);
    });
  } catch (error) {
    console.error('Error sanitizing HTML input:', error);
    process.exit(1);
  }
}

// Run the sanitization process
sanitizeHtmlInput();
