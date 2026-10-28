const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Copy public/index.html into dist/index.html
const publicHtml = path.join(publicDir, 'index.html');
const distHtml = path.join(distDir, 'index.html');
if (fs.existsSync(publicHtml)) {
  fs.copyFileSync(publicHtml, distHtml);
}

// 2. Build bundle.js into dist/bundle.js
esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'src', 'main.jsx')],
  bundle: true,
  minify: true,
  outfile: path.join(distDir, 'bundle.js'),
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

// 3. Also copy bundle.js into public/bundle.js as a fallback
fs.copyFileSync(path.join(distDir, 'bundle.js'), path.join(publicDir, 'bundle.js'));

console.log('Build succeeded! Generated dist/bundle.js and public/bundle.js');
