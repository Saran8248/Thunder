const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, 'client-v2/app/page.tsx');
let content = fs.readFileSync(tsxPath, 'utf8');

// Convert HTML comments to JSX comments
content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Also fix standard attribute names that React complains about
content = content.replace(/for=/g, 'htmlFor=');
content = content.replace(/readonly=/g, 'readOnly=');
content = content.replace(/maxlength=/g, 'maxLength=');

fs.writeFileSync(tsxPath, content);
console.log("JSX issues fixed!");
