# story creation

to easily add stories to component you can use this task script. I recommend to add that to user tasks in vscode.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "create-story",
      "type": "shell",
      "command": "node",
      "args": [
        // replace PATH_TO_SCRIPT with absolute path to script
        "<PATH_TO_SCRIPT>/frontend-libs/docs/storybook/create-story.js",
        "${fileDirname}"
      ],
      "problemMatcher": []
    }
  ]
}
```

the to use that we go to navigation panel and select component that we want to create story for. Then invoke command palette (Win: Ctrl + Shift + P, Mac: ⇧⌘P) and type `Tasks: Run task` and select it. Then select `create-story` task and press enter. This will create story file in selected folder with name of component that we selected.