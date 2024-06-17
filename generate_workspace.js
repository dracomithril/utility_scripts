const { readdirSync } = require("fs");
const { resolve, parse } = require("path");

const workspaces = readdirSync(__dirname)
  .filter((path) => path.includes("code-workspace"))
  .map((path) => {
    const rootPath = resolve(__dirname, path);
    const { name } = parse(path);

    return {
      name,
      rootPath,
      paths: [],
      tags: [],
      enabled: true,
    };
  });

console.log(JSON.stringify(workspaces, null, 2));
