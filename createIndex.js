const fs = require("fs");
const path = require("path");

function createIndexFiles(directoryPath) {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, directories) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    const entries = directories.reduce((acc,directory) => {
      const dirPath = path.join(directoryPath, directory.name);
      if (directory.isDirectory()) {
        createIndexFiles(dirPath); // Recursive call for nested directories
      }
      if(dirPath.endsWith(".test.tsx")) return acc;
      if(dirPath.endsWith(".test.ts")) return acc;
      if(dirPath.endsWith(".stories.tsx")) return acc;
      if(directory.name === "index.ts") return acc;

      if (
        [".ts", ".tsx"].includes(path.extname(dirPath))
      ) {
        const baseName = path.basename(dirPath, path.extname(dirPath));
        acc.push(`export { default as ${baseName} } from "./${baseName}";`);
      }
      return acc;
    },[]);
    const indexPath = path.join(directoryPath, "index.ts");
    fs.writeFile(indexPath, entries.join('\n') + "\n", (err) => {
      if (err) {
        console.log("Error creating file:", err);
      } else {
        console.log("Created index.ts in", directoryPath);
      }
    });
  });
}

const startPath = process.argv[2] || path.join(__dirname, "components");
console.log("Creating index files in", startPath);
createIndexFiles(startPath);
