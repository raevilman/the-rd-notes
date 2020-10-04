---
title: 'Setup New Windows Laptop'
description: 'Setting the new Windows machine'
slug: '/setup-new-windows-laptop'
date_created: '2020-10-04'
date_modified: '2020-10-04'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: windows, laptop, setup
---

These are the notes about all the steps I've take when setting up the new Windows machine.  

Below are the steps in order:  
- User directory
- Uninstall bloatware
- Update system
- Installations
- Configurations
- Issues

## User Directory
When setting up Windows, I used Outlook account to login into the OS.  

While setting up the environment I found that the name of the folder for my user under `C:\Users` wasn't correct and I knew that I wont be happy seeing this in future while using console or in general. So I decided to change before proceeding further.  

> Do not event think of just renaming it. It may mess up the system.  

The steps I followed:  
- Create a new local user with admin role from Settings > Accounts > Family & other users.  
Mind the username as the folder will be created using this name under `c:\Users`
- Copy the stuff (if any) from bad (original) user's folder to a common place like other drive partition.
- Sign out of the bad user account.
- Log in to the new user account.
- Remove the old user from Settings > Accounts > Family & other users.
- Sign in with Outlook account from new local account

Now you have the same Outlook account to log in to the system but your desired folder name for your user.  

## Uninstall bloatware

Uninstall the pre-installed softwares that you know you wont need.  
I remember uninstalling:  
- McAfee Antivirus and Web Advisor
- Skype (I don't need this, so...)
- Removed apps like Solitaire, Adobe Express etc from start menu. I guess these were just shortcuts to installation.
- may be some more ...

## Update the system

Put the system to download and install updates. Restarted it and then again put it on updates. After one or two restarts, the system was fully updated.  

## Installations

### Antivirus
I haven't bought any. So relying for now on Windows Defender.  

### Browser
Chrome, you know that.  
Download and set this as default under Settings > Apps >  Default Apps

### Terminal

I prefer to use [Cmder](https://cmder.net/) over CMD or PowerShell.  
Check the guide to setup Cmder [here](/setup-cmder-terminal).

### IDEs
- VS Code.  
    Who doesn't love VS Code. The best tool from Microsoft.  
    Setup guide is [here](/setup-vs-code).

### Git

Setting up git includes:  
- Installation
- Configure the ssh
- Configure user profile.  

Check the guide [here](/setup-git-on-windows)

## Configurations

## Issues

### Bluetooth Audio Stuttering
Faced this issue, where the audio to bluetooth connected headsets was stuttering/breaking a lot.  
Fix for my case is explained [here](/windows-bluetooth-audio-stutter-issue).  





