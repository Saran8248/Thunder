const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, 'client-v2/app/customer/page.tsx');
let content = fs.readFileSync(path.join(__dirname, 'client-v2/app/style.css'), 'utf8'); // dummy read just to make sure we don't crash
// Actually I will just modify my previous convert.js to write to app/customer/page.tsx
let htmlPath = path.join(__dirname, 'client/customer.html');

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
        const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${camelKey}: '${value}'`;
    }).filter(s => s).join(', ');
    return `style={{ ${reactStyles} }}`;
});

// Fix JSX comments and attributes
bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
bodyContent = bodyContent.replace(/readonly=/g, 'readOnly=');
bodyContent = bodyContent.replace(/maxlength=/g, 'maxLength=');

// Fix image paths
bodyContent = bodyContent.replace(/src="assets\/images\//g, 'src="/assets/images/');
bodyContent = bodyContent.replace(/href="#/g, 'href="/customer#');

const tsxContent = `
import React from 'react';
import Link from 'next/link';

export default function Customer() {
  return (
    <>
      ${bodyContent}
    </>
  );
}
`;

fs.writeFileSync(tsxPath, tsxContent);
console.log("Converted customer.html to /customer/page.tsx successfully!");
