const fs = require('fs');
const https = require('https');

https.get({
  hostname: 'api.github.com',
  path: '/repos/abuahmad2003sudan-del/Kyrosys/git/trees/main?recursive=1',
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      const uniqueTemplates = new Map();

      data.tree.forEach(item => {
        if (!item.path.endsWith('.zip')) return;
        
        const pathParts = item.path.split('/');
        const filename = pathParts[pathParts.length - 1]; // e.g., templatemo_617_pixel_forge.zip
        
        // Remove variants like (1) or (2)
        const cleanFilename = filename.replace(/\s\(\d+\)/g, '');
        
        const match = cleanFilename.match(/^(?:templatemo_)?(\d+)_([^.]+)\.zip$/);
        if (match) {
          const id = match[1];
          const rawName = match[2];
          if (!uniqueTemplates.has(id)) {
            uniqueTemplates.set(id, { id, rawName, originalFilename: filename });
          }
        }
      });

      console.log(`Found ${uniqueTemplates.size} unique templates.`);
      
      let templatesCode = 'export const TEMPLATES: Template[] = [\n';
      
      const categories = ['Business', 'Portfolio', 'SaaS', 'Landing', 'E-commerce'];
      
      Array.from(uniqueTemplates.values()).forEach((t, i) => {
        const title = t.rawName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const cat = categories[i % categories.length];
        const price = 49 + (i % 5) * 10;
        const originalPrice = price + 20;
        const urlIdName = `${t.id}-${t.rawName.replace(/_/g, '-')}`;
        const image = `https://templatemo.com/screenshots/full-template-${urlIdName}.jpg`;
        const downloadUrl = `/templates/${t.originalFilename}`;
        
        templatesCode += `  {
    "id": "${t.id}",
    "title": "${title}",
    "category": "${cat}",
    "price": ${price},
    "originalPrice": ${originalPrice},
    "image": "${image}",
    "thumbnail": "${image}",
    "demoUrl": "#",
    "downloadUrl": "${downloadUrl}",
    "isNiche": false,
    "aiFeatures": [],
    "badge": "${i % 10 === 0 ? 'حصري' : ''}",
    "valueProposition": "استثمر في قالب ${title} ووفر عشرات الساعات من التطوير.",
    "rating": ${(4.5 + (i % 5) * 0.1).toFixed(1)},
    "reviews": ${100 + i * 7},
    "author": "Kyrosys Vault",
    "description": "قالب ممتاز وحصري مصمم بعناية فائقة لتلبية أعلى معايير الجودة."
  }${i === uniqueTemplates.size - 1 ? '' : ','}\n`;
      });
      templatesCode += '];\n';

      // Read constants.ts and replace TEMPLATES
      const constantsPath = 'src/constants.ts';
      let constantsContent = fs.readFileSync(constantsPath, 'utf8');
      
      const regex = /export const TEMPLATES:\s*Template\[\]\s*=\s*\[[\s\S]*?\];/;
      if (regex.test(constantsContent)) {
        constantsContent = constantsContent.replace(regex, templatesCode);
        fs.writeFileSync(constantsPath, constantsContent);
        console.log("Successfully replaced TEMPLATES array with real data.");
      } else {
        console.error("Could not find TEMPLATES array in constants.ts");
      }

    } catch (e) {
      console.error(e);
    }
  });
});
