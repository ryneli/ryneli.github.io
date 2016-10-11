---
layout: post
title: "useful git commands"
date: 2016-10-10
categories: git, github, programming tools
---

Write down handful tips for using git.

## edit submitted commits
Sometimes, we want to split or merge commits. Following is one possible method to do this.

### split commit

```bash
git rebase -i <oldsha1>
# mark commits as `edit`
git reset HEAD^
git add ...
git commit -m "First part"
git add ...
git commit -m "Second part"
git rebase --continue
```

### merge commits

```bash
git rebase -i <oldsha1>
# mark commits that you want to merge into other commits as `squash`
```

### rearrange commits

```bash
git rebase -i <oldsha1>
# rearrange commits in the editor, than save changes. Done!
```

### modify last commit comment

``` bash
git commit --amend -s -m "new comment"
```
