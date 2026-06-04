const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      // skip admin
      if (f === 'admin') return;
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  // skip admin
  if (filePath.includes('\\admin\\') || filePath.includes('/admin/')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('import Link from "next/link";') || content.includes("import Link from 'next/link';")) {
    content = content.replace(/import Link from ["']next\/link["'];?/g, 'import { Link } from "@/i18n/routing";');
    changed = true;
  }

  if (content.includes('from "next/navigation"')) {
    // replace useRouter
    if (content.match(/import\s+{([^}]*useRouter[^}]*)}\s+from\s+["']next\/navigation["'];?/)) {
      // We will just do a hacky regex for now or simple replace
      // If it's `import { useRouter } from "next/navigation";`
      if (content.includes('import { useRouter } from "next/navigation";')) {
         content = content.replace('import { useRouter } from "next/navigation";', 'import { useRouter } from "@/i18n/routing";');
         changed = true;
      }
      // If it contains other imports too, we leave them in next/navigation and add a new line
      else if (content.includes('useRouter')) {
         content = content.replace(/useRouter,?\s*/g, '');
         content = 'import { useRouter } from "@/i18n/routing";\n' + content;
         changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed:", filePath);
  }
});
