---
title: 'Setup VS Code'
description: 'Setting up the VS Code editor machines'
slug: '/setup-vs-code'
date_created: '2020-10-04'
date_modified: '2020-10-04'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: vs-code, setup
---

Notes on setting up VS Code.  

Steps we'll do:  
- Installation
- Configuration

## Installation
This step is straight forward. Download the installer from [here](https://code.visualstudio.com/download) and install it.

## Configuration

I use `settings.json` to configure the VS Code workspace.  

General settings:  
- minimap -> disable
- fontLigatures -> enable
- fontSize -> 14

Markdown settings:  
- wordWrap - on

Below is how the `settings.json`'s content looks like:  

```json
{
    "editor.minimap.enabled": false,
    "editor.fontLigatures": true,
    "editor.fontSize": 14,
    "[markdown]": {
        "editor.wordWrap": "on"
    }
}
```
## Extensions

- Markdown All in One ([Link](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one))
- Code Spell Checker ([Link](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker))
- Vetur [Link](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- Tailwind CSS IntelliSense [Link](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

I usually maintain the list of extensions useful for the current workspace in a file named `extensions.json` placed under `.vscode`.  
This way VS Code notifies the user about these extensions for this repo when the user checks out the project from GitHub.  

Below is my current recommended extensions for this note taking workspace:  

```json
{
	// List of extensions which should be recommended for users of this workspace.
	"recommendations": [
		// swiss knife of markdown tools
		"yzhang.markdown-all-in-one",
		// spell checker
		"streetsidesoftware.code-spell-checker"
	],
	// List of extensions recommended by VS Code that should not be recommended for users of this workspace.
	"unwantedRecommendations": [
		
	]
}
```

## Snippets

Snippets are awesome. I use them very often to quickly insert complex markdown syntaxes.  

Below are few of them I use:  

- expandable code
- expandable table

Place the below json in a file named `markdown.code-snippets` under `.vscode` folder and these will enabled for markdown file type.  

```json
{
  "expandable code": {
    "prefix": "expandable code",
    "description": "inserts expandable source-code section",
    "body": [
      "<details>",
      "<summary>json payload! (click to expand)</summary>",
      "",
      "```json",
      "{",
      "     \"thank\": \"me later\"",
      "}",
      "```",
      "</details>"
    ]
  },
  "expandable table": {
    "prefix": "expandable table",
    "description": "inserts expandable table section",
    "body": [
      "<details>",
      "<summary>sample table (click to expand)!</summary>",
      "",
      "| Head1 (Left-aligned) | Head2 (Center-aligned) | Head3 (Right-aligned)",
      "| :---     |   :---: | ---:",
      "| Cell 1:1 | Cell 1:2",
      "| Cell 2:1 | Cell 2:2 | Cell 2:3",
      "| Cell 3:1 | Cell 3:2 |",
      "</details>"
    ]
  }
}
```