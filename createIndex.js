const fs = require("fs");
const path = require("path");

function createIndexFiles(directoryPath) {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, directories) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    directories.forEach((directory) => {
      const dirPath = path.join(directoryPath, directory.name);
      if (directory.isDirectory()) {
        createIndexFiles(dirPath); // Recursive call for nested directories

        fs.readdir(dirPath, (err, files) => {
          if (err) {
            return console.log("Unable to scan subdirectory: " + err);
          }

          const exports = files
            .filter(
              (file) => path.extname(file) === ".tsx" && !file.endsWith(".test.tsx") && !file.endsWith(".stories.tsx")
            )
            .map((file) => `export * from "./${path.basename(file, ".tsx")}";`)
            .join("\n");

          const indexPath = path.join(dirPath, "index.ts");
          fs.writeFile(indexPath, exports + "\n", (err) => {
            if (err) {
              console.log("Error creating file:", err);
            } else {
              console.log("Created index.ts in", dirPath);
            }
          });
        });
      }
    });
  });
}

const startPath = process.argv[2] || path.join(__dirname, "components");
createIndexFiles(startPath);
