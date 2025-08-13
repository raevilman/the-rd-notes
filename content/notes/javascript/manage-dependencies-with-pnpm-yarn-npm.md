---
title: 'Manage dependencies with pnpm, yarn and npm'
slug: '/manage-dependencies-with-pnpm-yarn-npm'
date_created: '2023-11-25'
date_modified: '2023-11-25'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: npm, yarn, pnpm, cheatsheet
---



| Command | pnpm | yarn | npm | Description |
| --- | --- | --- | --- | --- |
| Install dependencies | `pnpm install` | `yarn install` | `npm install` | Install all dependencies listed in `package.json` |
| Install a dependency | `pnpm install <package>` | `yarn add <package>` | `npm install <package>` | Install a dependency and add it to `package.json` |
| Install a dev dependency | `pnpm install -D <package>` | `yarn add -D <package>` | `npm install -D <package>` | Install a dev dependency and add it to `package.json` |
| Install a global dependency | `pnpm install -g <package>` | `yarn global add <package>` | `npm install -g <package>` | Install a global dependency |
| List installed dependencies | `pnpm list` | `yarn list` | `npm list` | List all installed dependencies |
| List outdated dependencies | `pnpm outdated` | `yarn outdated` | `npm outdated` | List all outdated dependencies |
| List installed global dependencies | `pnpm list -g` | `yarn list -g` | `npm list -g` | List all installed global dependencies |
| Update a dependency | `pnpm update <package>` | `yarn upgrade <package>` | `npm update <package>` | Update a dependency |
| Update all dependencies | `pnpm update` | `yarn upgrade` | `npm update` | Update all dependencies |
| Remove a dependency | `pnpm remove <package>` | `yarn remove <package>` | `npm uninstall <package>` | Remove a dependency and remove it from `package.json` |
| Remove a global dependency | `pnpm remove -g <package>` | `yarn global remove <package>` | `npm uninstall -g <package>` | Remove a global dependency |
| Run a script | `pnpm run <script>` | `yarn run <script>` | `npm run <script>` | Run a script defined in `package.json` |
| Run a script with arguments | `pnpm run <script> -- <args>` | `yarn run <script> -- <args>` | `npm run <script> -- <args>` | Run a script defined in `package.json` with arguments |

