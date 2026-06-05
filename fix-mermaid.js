const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && f !== 'node_modules' && f !== '.git' && f !== '.gemini' && f !== 'dist') {
      walkDir(dirPath, callback);
    } else if (f.endsWith('.lesson.md')) {
      callback(dirPath);
    }
  });
}

let count = 0;
walkDir(__dirname, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/subgraph "(.*?)"/g, (match, p1) => {
      count++;
      return `subgraph sg_${count} ["${p1}"]`;
    })
    .replace(/--> \|/g, '-->|');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed ${filePath}`);
  }
});
