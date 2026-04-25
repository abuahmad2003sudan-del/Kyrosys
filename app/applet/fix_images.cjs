const fs = require('fs');
const lines = fs.readFileSync('src/constants.ts', 'utf8').split('\n');

let lastImageIndex = -1;
let changesMade = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"image":')) {
    lastImageIndex = i;
  }
  if (lines[i].includes('"downloadUrl":') && lines[i].includes('templatemo_')) {
    const match = lines[i].match(/templatemo_(\d+)_([^.]+)\.zip/);
    if (match && lastImageIndex !== -1 && i - lastImageIndex < 15) {
      const num = match[1];
      const name = match[2];
      
      // Convert underscores to dashes as requested:
      const formattedName = name.replace(/_/g, '-');
      const newUrl = `https://templatemo.com/screenshots/full-template-${num}-${formattedName}.jpg`;
      
      lines[lastImageIndex] = lines[lastImageIndex].replace(/"image":\s*"[^"]*"/, `"image": "${newUrl}"`);
      lastImageIndex = -1;
      changesMade++;
    }
  }
}

fs.writeFileSync('src/constants.ts', lines.join('\n'));
console.log(`Replaced images successfully. Updated ${changesMade} templates.`);
