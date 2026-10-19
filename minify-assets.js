const fs = require("node:fs/promises");
const path = require("node:path");
const CleanCSS = require("clean-css");
const { minify: minifyJavaScript } = require("terser");

const outputDirectory = path.join(__dirname, "_site");

async function getAssetFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return getAssetFiles(entryPath);
    }
    return /\.(css|js)$/i.test(entry.name) ? [entryPath] : [];
  }));

  return files.flat();
}

async function minifyAssets() {
  const assetFiles = await getAssetFiles(outputDirectory);


  for (const filePath of assetFiles) {
    const source = await fs.readFile(filePath, "utf8");
    let minified;

    if (path.extname(filePath).toLowerCase() === ".css") {
      const result = new CleanCSS({ level: 2 }).minify(source);
      if (result.errors.length > 0) {
        throw new Error(`CSS minification failed for ${filePath}: ${result.errors.join("; ")}`);
      }
      minified = result.styles;
    } else {
      const result = await minifyJavaScript(source, { compress: true, mangle: true });
      if (!result.code) {
        throw new Error(`JavaScript minification produced no output for ${filePath}`);
      }
      minified = result.code;
    }

    await fs.writeFile(filePath, minified);
    console.log(`Minified ${path.relative(outputDirectory, filePath)}`);
  }
}

module.exports = minifyAssets;

if (require.main === module) {
  minifyAssets().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
