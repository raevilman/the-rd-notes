---
title: 'Packaging homebrew formula'
description: 'Notes on packaging a homebrew formula and serving through personal tap'
slug: '/packaging-homebrew-formula'
date_created: '2022-10-01'
date_modified: '2022-10-01'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: homebrew, formula
---

These notes are from the experience of building the project -> [future-commit](/projects/git-commit-future-date)

High level steps:
1. Make executable
2. Create formula
3. Serve through a tap

## Make executable
My project was written in node. I could have gone with `npm install` as well.  
But that would require `node` to be installed on user machine.  

As `future-commit` can be used by a non-npm user as well, therefore I decided to make it fully executable on its own using Vercel's [`pkg`](https://github.com/vercel/pkg) 

You can refer to [`package.json`](https://github.com/raevilman/future-commit/blob/master/package.json) for configuration for `pkg`


Commands to produce a final artifact:

```
 npm run build
 npm run package
 tar -cvzf ./dist/future-commit.tar.gz ./dist/future-commit
 sha256sum future-commit.tar.gz
```

Upload the artifact as a release to Github repository and use its link to create formula in the next step.

## Create formula

Command:
```
brew create <url-of-tar.gz-artifac>
```

In my case it was,

```
brew create https://github.com/raevilman/future-commit/releases/download/v0.1.0/future-commit.tar.gz
```

Once you hit enter, you will be presented with an editor to edit the forumula(.rb, a ruby file).  

Editted that as follows:
```rb
class FutureCommit < Formula
  desc "Use future date while making git commits"
  homepage "https://github.com/raevilman/future-commit"
  url "https://github.com/raevilman/future-commit/releases/download/v0.1.0/future-commit.tar.gz"
  sha256 "eb3abe8b972310fd523c3d09ae1b8e5adfeeaf961023afffd3cb5598956a47f4"
  license "MIT"

  def install
    bin.install "future-commit"
  end

  test do
    system "#{bin}/future-commit"
  end
end
```
|  |  | |
| :---     |   :--- | ---:
| homepage | _ _ _ _ your website or github repo url'
| url | _ _ _ _ from github released artifact | 
| sha256  |  _ _ _ _ calculated in the build step |
| license  | _ _ _ _ you need to decide |


## Test it locally

After saving the formula, tested it as:

```sh
brew install --build-from-source future-commit
```

Also do auditing:
```
brew audit --strict /home/linuxbrew/.linuxbrew/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/future-commit.rb
```

## Serve the tap! 🍻

Created a new repository, cloned it and moved the formula to it.  

```sh
git clone git@github.com:raevilman/homebrew-tap.git
cp /home/linuxbrew/.linuxbrew/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/future-commit.rb ./homebrew-tap
```

## t~~a~~esting the tap

```sh
brew tap raevilman/tap
brew tap-info raevilman/tap
brew install future-commit
```

---

## Points to note

### In node script

- Need to use `require` instead of `imports` as ESM not supported.  
Follow the thread -> https://github.com/vercel/pkg/issues/1291
    
### Errors:

Permission denied:

Solution -> Make sure your script starts with `#!/usr/bin/env bash`  

Debugging -> Try to debug your formula like:  
```
brew install --build-from-source --verbose --debug future-commit
``` 
You should see following line
```
==> Fixing /home/linuxbrew/.linuxbrew/Cellar/future-commit/0.1.0/bin/future-commit permissions from 755 to 444
```

Which is because your file didn't start with she-bang. Refer this ->  https://github.com/Homebrew/brew/issues/2567#issuecomment-298229446

</br>
</br>

HIH 👍  
~RD