import fs from 'fs';
import path from 'path';

function replaceInDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/الإمبراطوري(?:ة)?/g, 'الاحترافية');
      content = content.replace(/الإمبراطوري/g, 'الاحترافي');
      content = content.replace(/إمبراطورية/g, 'منصة');
      content = content.replace(/سيادي/g, 'حصري');
      content = content.replace(/سيادية/g, 'حصرية');
      content = content.replace(/القرن الـ 22/g, 'المستقبل');
      
      content = content.replace(/Sovereign/g, 'Premium');
      content = content.replace(/sovereign/g, 'premium');
      content = content.replace(/Imperial/g, 'Elite');
      content = content.replace(/imperial/g, 'elite');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

replaceInDir(path.join(process.cwd(), 'src'));
let serverContent = fs.readFileSync('server.ts', 'utf8');
serverContent = serverContent.replace(/Imperial/g, 'Elite')
                             .replace(/imperial/g, 'elite')
                             .replace(/Sovereign/g, 'Premium')
                             .replace(/sovereign/g, 'premium');
fs.writeFileSync('server.ts', serverContent, 'utf8');
console.log('Replacements completed.');
