const fs = require('fs');
const path = require('path');

const root = __dirname;
const output = path.join(root, 'dist');
const entries = ['index.html', 'wechat-compat.js', 'video-hero.html', 'video-hero.css', 'video-hero.js', 'assets', 'front', 'public', 'world'];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) throw new Error(`Missing required build input: ${entry}`);
  fs.cpSync(source, path.join(output, entry), { recursive: true });
}

fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`CloneX static build created at ${output}`);
