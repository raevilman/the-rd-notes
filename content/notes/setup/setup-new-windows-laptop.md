---
title: 'Setup New Windows Laptop'
description: 'Setting the new Windows machine'
slug: '/setup-new-windows-laptop'
date_created: '2020-10-04'
date_modified: '2024-10-17'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: windows, setup
---

## # When installing

- Do not sign in to outlook account. It might end up with a name of user's directory on command line, that you might not like.

## # After logging in
- Uninstall software

  - Microsoft 
    - Cortana
    - Feedback Hub
    - Clipchamp
    - Teams
    - Mail and Calendar
    - To Do
    - News
    - People
    - Power Automate
    - Skype
    - Solitaire Collection
    - Weather
    - Xbox
    - Xbox Live
  - Gaming services
  - Manufacturer's software

## # Update the OS & restart, if required.

## # Get google chrome.

## # Update `winget` from MS Store, optional (no exp, first time user)

## # Install software

> Use `https://winstall.app` or `https://winget.run` to search apps if that helps. 
> Otherwise `winget search <name>`

PDF: No Adobe! pls. Better off with Edge or install Sumatra PDF.

- Bitwarden
- VS Code
- Git
- JDK 
- IntelliJ
- Bruno
- NodeJs

Script
```
winget install Bitwarden.Bitwarden
winget install Microsoft.VisualStudioCode
winget install --id Git.Git -e --source winget
winget install --id=Amazon.Corretto.23.JDK -e --source winget
winget install --id JetBrains.IntelliJIDEA.Community -e --source winget
winget install --id=Bruno.Bruno -e
winget install --id=OpenJS.NodeJS -e

```

## # Enable hibernate & Close lid settings
  ![Windows power settings](/images/windows-power-settings.png)   






## # Explorer configuration
- Explorer View
  - Item check boxes
  - Show file extensions
  - Show hidden files  
  
  ![Show hidden files and extensions](/images/show-hidden-and-extensions.png)  
