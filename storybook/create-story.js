const { writeFile, existsSync } = require("fs");
const { get } = require("http");
const { basename } = require("path");

console.log("createStory.js loaded");
const fileDirName = process.argv[2];
const filePath = process.argv[3];
console.log(fileDirName);
console.log(basename(filePath));

const getStorybookPath = () => {
  const fileBasename = basename(filePath);
  if (fileBasename.startsWith("index")) {
    const folderName = basename(fileDirName);
    const name = folderName.replace(/(^[a-z])|[-_]([A-z])/g, (_, first, camel) => (first || camel).toUpperCase());

    return { name, storyName: `${name}.stories.tsx` };
  }
  const name = fileBasename.split(".")[0];

  return { name, storyName: `${name}.stories.tsx` };
};

const { name, storyName} = getStorybookPath();

const storyPath = `${fileDirName}/${storyName}`;
console.log({
  storyName,
  storyPath,
});

const baseFile = `${fileDirName}/${name}.tsx`;
const useIndex = !existsSync(baseFile);
console.log({ useIndex, baseFile });

const storyTemplate = (componentName) => `import { Meta, StoryObj } from "@storybook/react";

import ${componentName} from "./${useIndex ? "index" : componentName}";

export default {
  title: "${componentName}",
  component: ${componentName},
} as Meta<typeof ${componentName}>;

type StoryType = StoryObj<typeof ${componentName}>;

export const Default: StoryType = {
  args: {},
};
`;
const template = storyTemplate(name);
console.log("storyTemplate");
console.log(template);

writeFile(storyPath, template, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("story created");
});
