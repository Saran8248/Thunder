const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'client/customer.html');
const tsxPath = path.join(__dirname, 'client-v2/app/page.tsx');

let html = fs.readFileSync(htmlPath, 'utf8');

// Extract the body content
let bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (!bodyMatch) {
    console.error("No body found");
    process.exit(1);
}
let bodyContent = bodyMatch[1];

// Remove script tags
bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Convert class to className
bodyContent = bodyContent.replace(/class=/g, 'className=');

// Fix self closing tags (img, input, hr, br)
bodyContent = bodyContent.replace(/<(img|input|hr|br)([^>]*?)(?<!\/)>/g, '<$1$2 />');

// Basic inline style converter (very rough, only handles simple ones)
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styles = styleString.split(';').filter(s => s.trim().length > 0);
    const reactStyles = styles.map(s => {
        const [key, value] = s.split(':').map(str => str.trim());
        if (!key || !value) return '';
        // camelCase the key
        const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${camelKey}: '${value}'`;
    }).filter(s => s).join(', ');
    return `style={{ ${reactStyles} }}`;
});


const tsxContent = `
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      ${bodyContent}
    </>
  );
}
`;

fs.writeFileSync(tsxPath, tsxContent);
console.log("Converted successfully!");
