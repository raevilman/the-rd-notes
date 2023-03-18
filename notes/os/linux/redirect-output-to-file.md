---
title: 'Redirect output to a file in Linux'
slug: '/redirect-output-to-file-in-linux'
date_created: '2022-12-20'
date_modified: '2022-12-20'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: linux, redirect, output, file
---

## To redirect `stdout` to file.txt:

```
echo test > file.txt
```

This is equivalent to:

```
echo test 1> file.txt
```

## To redirect `stderr` to file.txt:

```
echo test 2> file.txt
```

## To combine `stdout` and `stderr`

```
echo test > file.txt 2>&1
```

Here in 2>&1:

- 2> redirects stderr to an (unspecified) file.
- &1 redirects stderr to stdout.

So >& is the syntax to redirect a stream to another file descriptor:

- 0 is stdin
- 1 is stdout
- 2 is stderr

Thus, To redirect stdout to stderr:

```
echo test 1>&2   # equivalently, echo test >&2
```

## Order matters
`echo test 2>&1 >>file`  != `echo test >>file 2>&1 ` 

cmd `2>&1 >>file` does not redirect stderr to the file,  
but cmd >> file 2>&1 does.  

In the first case, stderr is redirected to the stdout of the shell and then stdout is directed to the file.  

In the second case, stdout is directed to the file, and then stderr is directed to the same place.  



--- 

Resources:
- [StackOverflow](https://stackoverflow.com/a/818265)