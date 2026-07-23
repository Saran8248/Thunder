const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, 'client-v2/app/page.tsx');
let content = fs.readFileSync(tsxPath, 'utf8');

// Fix image src paths to be absolute from public folder
content = content.replace(/src="assets\/images\//g, 'src="/assets/images/');
content = content.replace(/href="#/g, 'href="/#');

fs.writeFileSync(tsxPath, content);
console.log("Image paths fixed!");
