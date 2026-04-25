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
      
      const zips = data.tree.filter(i => i.path.startsWith('public/templates/') && i.path.endsWith('.zip'));
      
      const categories = [
        "Business", "Portfolio", "Blog", "E-commerce", "Landing Page", 
        "Admin Dashboard", "Personal", "Entertainment", "Education", 
        "Health", "Tech", "SaaS", "Luxury", "Creative"
      ];
      
      let templatesCode = 'export const TEMPLATES: Template[] = [\n';
      
      zips.forEach((item, index) => {
        const fullFilename = item.path.split('/').pop();
        const fileWithoutZip = fullFilename.replace('.zip', '');
        
        let title = fileWithoutZip.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        
        const numMatch = fileWithoutZip.match(/\d+/);
        const num = numMatch ? numMatch[0] : '0';
        
        const textMatch = fileWithoutZip.match(/[a-zA-Z_]+/g);
        const textStr = textMatch ? textMatch.join('-').toLowerCase() : 'template';
        
        const imageUrl = `https://templatemo.com/screenshots/full-template-${num}-${textStr}.jpg`;
        const downloadUrl = `/templates/${fullFilename}`;
        
        const category = categories[index % categories.length];
        const price = Math.floor(Math.random() * (129 - 39 + 1)) + 39;
        const originalPrice = Math.round(price * 1.3);
        
        templatesCode += `  {
    "id": "${index + 1}",
    "title": "${title}",
    "category": "${category}",
    "price": ${price},
    "originalPrice": ${originalPrice},
    "image": "${imageUrl}",
    "thumbnail": "${imageUrl}",
    "demoUrl": "#",
    "downloadUrl": "${downloadUrl}",
    "isNiche": false,
    "aiFeatures": [],
    "badge": "",
    "valueProposition": "استثمر في قالب ${title} ووفر عشرات الساعات من التطوير.",
    "rating": ${(4.5 + Math.random() * 0.5).toFixed(1)},
    "reviews": ${Math.floor(Math.random() * 500) + 50},
    "author": "Kyrosys Vault",
    "description": "قالب ممتاز وحصري مصمم بعناية فائقة لتلبية أعلى معايير الجودة."
  }${index === zips.length - 1 ? '' : ','}\n`;
      });
      
      templatesCode += '];\n';
      
      const constantsPath = 'src/constants.ts';
      let content = fs.readFileSync(constantsPath, 'utf8');
      
      const contentParts = content.split('export const ALL_TEMPLATES');
      if(contentParts.length < 2) {
          console.error("Could not find ALL_TEMPLATES mapping");
          return;
      }
      
      const newHead = content.substring(0, content.indexOf('export const TEMPLATES'));
      const newContent = newHead + templatesCode + '\nexport const ALL_TEMPLATES' + contentParts[1];
      
      fs.writeFileSync(constantsPath, newContent);
      console.log('Successfully updated TEMPLATES globally with ' + zips.length + ' entities.');
    } catch(e) {
      console.error(e);
    }
  });
});
