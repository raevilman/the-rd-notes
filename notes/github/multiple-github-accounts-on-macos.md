---
title: 'Multiple GitHub accounts on macOS'
description: 'Configuring multiple GitHub accounts on same MacBook using ssh keys'
slug: '/github/multiple-github-accounts-on-macos'
date_created: '2021-03-30'
date_modified: '2021-03-30'
author: 'RD'
is_published: true
tags: github, multiple-accounts, macOS
---

Situation is to use my work and personal GitHub accounts on the same machine.  

Steps I'v followed:  

### 1. Generate ssh keys

Generate the ssh keys as follows:  

```sh
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "office.id2@company.com" -f "github-work"
ssh-keygen -t rsa -C "my@pers.on.al" -f "github-rd"
```

> -b “Bits” This option specifies the number of bits in the key. The regulations that govern the use case for SSH may require a specific key length to be used. In general, 2048 bits is considered to be sufficient for RSA keys.<br/>
> -c "Comment" Changes the comment for a keyfile. Helps in identification of the key file.<br/>
-f "File" Specifies name of the file in which to store the created key.<br/><br/>
Read more at https://www.ssh.com/ssh/keygen/

<br/>

### 2. Add the ssh keys to ssh-agent

Add the keys to ssh-agent as follows:  

```sh
ssh-add -K ~/.ssh/github-work
ssh-add -K ~/.ssh/github-rd
```
> -K is to store passphrase in macOS' keychain.<br/>
Read more at [GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)

<br/>

### 3. Add the ssh keys to respective GitHub accounts
Next step is tell GitHub about the fresh keys. So add them to the respective GitHub accounts by visiting [GitHub Settings](https://github.com/settings/keys).

Use following command to copy the public key' content in the clipboard.<br/>
```
pbcopy < ~/.ssh/github-work.pub
pbcopy < ~/.ssh/github-rd.pub
```
You can also follow [GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) for this step.  
<br/>

### 4. Configure ssh to use appropriate keys
Tell ssh, when to use which key by the means of `config` file in `~/.ssh` directory.<br/>

Here's what I've for my case:  
```
#work account
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-work
#personal account
Host github.com-rd
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-rd
```

Trick here is the `Host` entry.  
Which is acting as the nickname and resolves to the actual domain using `HostName` entry.  

So you use a specific nickname, while **_interacting_** with GitHub repositories. Which signals the ssh, which key file to pick for authentication.

> Host vs HostName at [SO](https://superuser.com/questions/503687/whats-the-difference-between-host-and-hostname-in-ssh-config/1207305)  



### 5. Working with GitHub repositories

#### a) Cloning new repo!
Clone the repo as follows specifying the nickname against which you want ssh-agent to pick the key file.  

```sh
git clone git@github.com-{nickname}:{repo-owner-name_can-be-org-or-user-name}/{repo-name}.git
```

Example: If I wish to clone the `daily-fur-cleaning` repo from the user `penguin`, whose key file is configured against `Host github.com-pingu`

```sh
git clone git@github.com-pingu:penguin/daily-fur-cleaning.git
```

<br/>

#### b) Updating remote of already clone repositories

Use following command:  
```
git remote set-url origin git@github.com-{nickname}:{repo-owner-name_can-be-org-or-user-name}/{repo-name}.git
```

### Bonus! What about `name` and `email` for commits?
Have one set configure to be used globally as below:  
```
git config --global user.name "FirstName LastName"
git config --global user.email "office.id@company.com"
```

and then have local configs in every repo for secondary accounts.  
```
git config --local user.name "rd"
git config --local user.email "my@pers.on.al"
```

HIH 👍