build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# Workflow Optimization Techniques

---

# GIT

^ Git is confusing. It is not easy to train yourself to think in versions. When we write, we have the luxury of taking the time to clarify and improve something over the course of multiple drafts. Think about the days when writing was done on stone tablets. Between the physical exertion and effort required to carve a message in a piece of stone, let alone the time and effort required to fix a typo, you better get your message right the first time. Computers make these problems almost none existent. There are two places in our writing culture where making incremental changes, and tracking those changes across multiple versions, is not just helpful but crucial: law and (more important for our story) software source code.

---

## Sharing Source Code

- punch cards
- disc drives
- email
- servers/cloud services
- version control systems

^ Early computers had to be programmed by punching holes into cards, _(click)_ which were fed individually into the machines, which in turn performed the instructions encoded into the cards and returned a result. Making changes on physical media like punch cards was time-consuming and expensive. Programs took hours or days to run, and an error in a program meant that the whole sequence needed to be restarted from scratch, making it very important to get it right the first time whenever possible. Things have come a long way since then. _(click)_

---

## Git Version Control

^ Version control systems like Git work by keeping a copy of each successive version of your project in something called a repository, into which you commit versions of your work that represent logical pauses, like save points in a video game. Every commit includes helpful metadata like the name and email address of the person who made it, so you can pinpoint whom to praise (or blame) for a particular change.

^ These commits are organized into branches, each representing an evolutionary track in your project's history, with one branch—the trunk, or master branch—representing the official, primary version. Having built up a history of past commits, it's easy to retrieve any previously committed version of your project, roll back changes, or compare two or more versions to aid in debugging.

---

## Git Access

- desktop application
- command line

---

## Installing Git (macOS)

```bash
$ git

# The "git" command requires the command line developer tools.
# Would you like to install the tools now?
```

^ If you open up a Terminal window and type git, your Mac will offer to automatically install an Apple-maintained software package that includes Git

---

## Installing Git (Windows)

^ The Git development team maintains an easy-to-use installer package for Windows that you can download from the official Git website. The install wizard will ask you a bunch of questions about how you want to configure and use Git; if you're unsure how to answer any of them, just go with the default settings.

^ The Git Bash application that comes as part of Git distributions for Windows emulates a complete Unix-style shell, with the same commands you'd find on Linux or OS X. 👍

---

## Talking to Git

```bash
git commandname parameter1 parameter2 --option
```

^ You interact with Git by sending it commands, which all generally look something like this. The command name (`commandname` in the example) is one of over 100 individual functions that Git can perform. Behind the scenes, each of these commands is a separate program responsible for its own specific job.

---

## Talking to Git (cont)

```bash
git status
git checkout master
```

^ Some Git functions work with just a command name (like `git status`). Most require some parameters to know how to do their jobs, similar to passing input into functions in JavaScript or PHP. You can often read Git commands like a sentence: _Git, please do a thing to this other thing._ In this example, _Git, please check out the branch named `master`_.

---

## Configuring Git

- your name
- your email address

^ There are hundreds of configurations in Git. But there are two that are absolutely needed in order for Git to function. _(click twice)_ Git adds an _Author_ attribute to every commit you make that indicates both of these pieces of info, so collaborators on a project know who made any given change. So to get started, let's tell Git who you are.

---

## `git config`

```bash
git config --global user.name "Phil Sinatra"
git config --global user.email "code@philsinatra.com"
```

^ Enter each of these lines at a command prompt, filling in your own information. We're telling Git that a particular configuration property (`user.name`) should be set the the value we've provided.

^ The `--global` option tells Git to set these values as a default for all projects on this computer.

---

## Starting A New Project

```bash
$ mkdir my-project
$ cd my-project

$ git init
Initialized empty Git repository in /Users/username/Documents/my-project/.git/
```

^ Let's start a new project. First we create a directory and `cd` into it. Then we can initialize a new Git repository with the `git init` command. That sets up a new, empty Git project on our computer.

---

## Clone An Existing Project

```bash
$ git clone https://github.com/username/project.git
Cloning into my-project...
remote: Counting objects: 11, done.
remote: Compressing objects: 100% (7/7),  done.
Checking connectivity... done
```

^ If you're not initiating the project, it's likely you'll be joining a project. Usually the first step is to pull down a copy of the repository stored on a server somewhere. This is called _cloning_, meaning whatever is saved on your computer is a replica of everything on the server.

---

## Git Clone Process

- creates a new working directory
- initializes a new Git repository
- adds a remote called `origin`
- pulls changes from the remote

^ The `git clone` command is a single command that performs several related commands at once.

---

## Preparing to Commit

^ Git watches every change you make within a directory under its care. Git proceeds by addition. Even though files in your project can be created, deleted or changed, the commits tracking those changes are always _added_. When you remove a file, you're adding a commit. Git is more concerned with your commits than the actual file content.

---

## Understanding Status

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Project Homepage</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

^ Once you have your project setup, it's time to get to work. You create your first HTML file. Save the file in your project directory as _index.html_.

---

### What Does Git Know

```bash
$ git status
# On branch master
#
# Initial commit
#
# Untracked files:
#    (use "git add <file>..." to include
#     in what will be committed)
#
# index.html
nothing added to commit bu untracked files present
(use "git add" to track)
```

^ Before we move on, let's find out what Git knows about the state of our project.

---

## Adding Files

```bash
git add index.html
```

^ Before you can commit a file, it must be _tracked_. Before it can be tracked, you have to add it to Git's database. Adding a file, and committing are not the same thing.

^ A commit records changes to files in Git's database (version A to B). When we add a file, we're building the house. The `git add` command makes a snapshot of the given file and saves it to the repository so that it can be referred to later in a commit.

---

## Check Status

```bash
$ git status
# On branch master
#
# Initial commit
#
# Changes to be committed:
#    (use "git rm --cached <file>..." to unstage)
#
# new file: index.html
#
```

^ Our file is no longer listed under _Untracked files_. Instead it's listed under _Changes to be committed_. We have now **_staged_** the file and are ready to commit.

---

## Commit the File

```bash
$ git commit --message "Initial commit"
[master (root-commit) 600df9f] Initial commit
1 file changed, 9 insertions(+)
create mode 100644 index.html
```

^ Our first commit is complete. Our feedback tells us the unique ID (`600df9f`) associated with this commit, which we can use later to reference this commit if needed. The `--message` option explains the nature of the changes you just made. This can also be expressed using the shortcut `-m`

---

## The Staging Area

- _staging_
- Git saves snapshot
- Git starts a local draft
- Not shared

^ Before you can commit a new version of your files, that new version must be added to Git's database, something we do with the `git add` command. Another name for this is _(click)_ _staging_; the _staging area_ is where these new versions live between when you update your working files and when you commit them.

^ Staging a file causes two thing to happen. First, _(click)_ Git saves a snapshot of that file to its database, so that it can be referred to in your next commit. Git also starts a _(click)_ local draft of your next commit, with references to all of the files and directories contained within, including references to files that have not changed, from the previous commit.

^ _(click)_ The staging area is not synced or shared with anyone else, it lives only on your computer.

---

## The Second Commit

- `status`
- `add`
- `commit`

^ The bulk of your interactions with Git will be with these three commands: _(click)_ `status`, `add` and `commit`.

---

### Add More Files/Folders

```bash
mkdir css
touch styles.css
```

#### Edit HTML

```html
<link href="css/styles.css" type="text/css" media="all">
```

^ Let's say we add more files to our project, and let's edit our HTML file to use our new stylesheet. We're adding a directory, with a new file in it and then we're changing a file that already exists.

---

### Check Project Status

```bash
$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
# modified:   index.html
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
# css/
no changes added to commit (use "git add" and/or "git commit -a")
```

^ When we check `git status` we see the HTML file Git already knows about (because it was committed earlier) has been modified, listed under the heading _Changes not staged for commit_. Below that is the _Untracked files_ list. Instead of listing _styles.css_, it shows the entire _css_ folder. That's Git's way of telling us there's an entire subdirectory it doesn't know about.

---

### Git Add Both Files

```bash
git add index.html css/

$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
# new file:   css/styles.css
# modified:   index.html
```

^ We can stage both files with a single command. Here we list both the HTML file, and _css_ directory as arguments, separating them with a space to indicate we want to stage both items in the list. When we check `git status` again we see both files are staged and ready to commit.

---

### Git Commit #2

```bash
git commit -m "Add Stylesheet"
```

^ Now our project has history. So we have to stage files before committing them, which may seem like hassle but we'll see down the road why this will be very powerful.

---

### Commit Messages

#### Don't Do This

- "edits"
- "final"
- "wtf why doesn't this work"

^ A quick note on commit messages. Your messages are being used to create a log of all the commits of your project. The messages should be written so that they provide a clear outline of the history of your project. _(click)_ 100 messages that all read "edit content" is a terrible log. _(click)_ Writing meaningful messages is a good practice to get into early in your careers.

---

### Helpful Tips

- Separate subject from body with a blank line
- Do not end the subject line with a period
- Capitalize the subject line and each paragraph
- Use the imperative mood in the subject line
- Wrap lines at 72 characters
- Message body: what & why

^ _(click)_ through the entire list

^ Use the body to explain what and why you have done something. In most cases, you can leave out details about how a change has been made.

---

## [gitm😆ji](https://gitmoji.carloscuesta.me)

---

## Removing Files From Git

```bash
git rm filename.txt
```

^ When we delete a file in our working copy of a project, it follows that we should be removing it from our repository. To be sure, Git's command for deleting files does its best to act like it's simply deleting a file. One thing to recall though is that Git is a system of accumulation, and it only cares about changes in the context of a commit. Recall that a standard `rm` command is the Unix command to delete a file. Git's `git rm` command is going to work in a similar manner, deleting a file at the given path, but it also stages a new commit where the file has been deleted. In other words, it order to remove a file, we have to _add_ a commit.

---

### Remove File Example

```bash
$ git rm robots.txt
rm 'robots.txt'

$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#   (use "git push" to publish your local commits)
#
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
# deleted:    robots.txt
```

^ When we delete a file using `git rm`, Git creates a new snapshot of the project, _minus_ the file(s) being deleted, and stages that version as the next one to be committed.

---

### Commit the Next Snapshot

```bash
git commit -m "Remove robots.txt"
[master 983024f] Remove robots.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 robots.txt
```

---

## Git Add ALL

```bash
git add --all
git add -A
```

^ When in doubt, or short on time, there are options for quickly staging anything and everything that has changed in your local copy. This command handles adding all changes to the _staging area_, whether the changes are new files, edits, removing files, renaming files etc. Everything is ready to commit after using the _add all_ command.

---

## Unstage Files

```bash
git reset filename.txt
```

^ The opposite of `git add`, which stages a change, you can use `git reset` to _unstage_ or remove a file from the staging area. This does not make any changes to the edits within the file, it only removes it from the staging area.

---

## Branches

^ So far we've been talking about sequential versioning - tracking the difference between a snapshot of your work and its earlier forms. Every commit includes a reference to its immediate predecessor, or _parent commit_, and from that reference, Git can work backward and explain the entire chain of commits that came before it. This relationship is important for understanding where you've been, but not always helpful for understanding where you're going, or why. This is where _branches_ come in handy.

---

## What Are Branches

- A virtual copy
- experiments
- alternates
- scratch pad

^ A branch is a _(click)_ virtual copy of your project - a project within your project - where you can make commits freely, in isolation from whatever else may be happening in your repository. Branches allow us to manage and work with _other_ kinds of versions in Git - _(click)_ experiments, _(click)_ alternates, _(click)_ scratch pads, all separate from the official copy of the work represented by the master branch.

---

## Branching Basics

- `master`: primary|stable branch
- branches are _places_ not _things_

^ Every Git repository starts out with a master branch, to which Git assigns the name `master` by default. Technically speaking, `master` is just a branch, but what makes it special is its conventional role as the _(click)_ primary, stable version of whatever project is stored in a repo.

^ When thinking about branches, consider them _(click)_ _places_ rather than _things_. When you commit to a branch, you are committed to a place within your project, rather that into a "thing". For example, you may ask "Where did I commit the updates to my footer?"

---

## List of Branches

```bash
$ git branch
* master
```

^ Before creating a branch, let's list the branches that exist in our project, using the `git branch` command. In our example, currently there's only one branch - `master` - and the asterisk tells us it's the current branch we have checked out.

---

## Starting a New Branch

- Task: redesign homepage
- Considerations: time & effort
- No road blocks for teammates

^ Let's pretend... For our next project we've been _(click)_ asked to redesign our site's homepage. It will take _(click)_ time and a lot of commits to get it right. _(click)_ We don't want to publish our work before it's done. We don't want to prevent any of our teammates from making changes to the site or the existing homepage while we're iterating.

^ We need a safe place to make big changes without disrupting everything else. The natural place for us to do this work is in a separate branch. This is called a _working_ or _topic_ branch (topic meaning - they have a specific topic or goal).

---

### Create a New Branch

```bash
git branch new-homepage
```

^ To create a new branch, just pass a branch name into the `git branch` command. This tells Git to create a new branch named `new-homepage`, using whatever commit you're currently on as a starting point. It doesn't matter what branch you are on when you create the new branch, Git only cares about the current commit as the starting point.

---

### Check Out My Branch

```bash
$ git checkout new-homepage
Switched to branch 'new-homepage'
```

^ Git doesn't automatically switch you into the new branch when you run `git branch <branchname>`. It creates a new branch, but leaves you with `master` as the current branch (in Git terms) or _checked out_ branch. That means your next commit will still be in the `master` or _parent_ branch.

^ To switch branches, use the `git checkout` command.

---

### That's Annoying

```bash
$ git checkout -b new-homepage
Switched to a new branch 'new-homepage'
```

^ Git offers a shortcut to work around the two-command dance of creating and then switching branches. You can tell `git checkout` to create and switch to a new branch at the same time by passing the `-b` option.

---

![fit](images/03-git/03-git-branching-001.png)

^ Until you make a commit, these branches are identical (they won't stay that way for long). By creating a new branch, we're signaling our intention to diverge from the official timeline and do some work that may or may not end up in the production version of our code.

---

## Out On A Limb

```bash
$ git commit -am "💄 Update Header Background Color"
[new-homepage b26b038] 💄 Update Header Background Color
1 file changed, 1 insertion(+), 1 deletion(-)
```

^ Let's get started with something easy. Let's change the background color on our website. We change our CSS file and then commit the update.

---

### ⚠️ Attention

```bash
git commit -am "...
```

^ Did you notice the `-am` combination of options in our commit message. `-a` to automatically add any changed files and `-m` to specify the commit message. Most command-line tools allow you to combine multiple options into a single one like this, prepended with a single dash. The only restriction is that only one of these options (in this case `-m`) can take an argument, and therefore must come last.

---

## Branches Have Diverged

```bash
$ git commit -am "💄 Update Header Background Color"
[new-homepage b26b038] 💄 Update Header Background Color
1 file changed, 1 insertion(+), 1 deletion(-)
```

^ Having added this commit, our master and working branches have diverged - the `new-homepage` branch has one commit that the master doesn't.

---

![fit](images/03-git/03-git-branching-divergence.png)

^ The `new-homepage` branch points to `b26b038`, `master` points to `18ee782`. `b26b038` points to its parent commit, `18ee782`.

---

![fit](images/03-git/03-git-branching-discrete_divergence.png)

^ Another way of looking at it is to see the two branches as discrete logical copies of the whole timeline that just happen to be mostly identical.

---

## Naming Branches

- `fix-chrome32-bug`
- `fix-chrome32-webkit-bug`
- `bugfix`

^ There are no hard rules about naming branches. Every Git repository has a `master` branch, and by convention `master` is meant to be the "prime" or "default" branch of the project. Names that you give your branches should logically describe its reason for existing. Come up with a label that identifies the work being done.

^ Example: A branch created to fix a problem with Chrome 32 might be called _(click)_ `fix-chrome32-bug`. It could be something more specific like _(click)_ `fix-chrome32-webkit-bug`. It could be more generic like _(click)_ `bugfix`. Choose a level of specificity that will distinguish this branch from others on your project without wasting space.

---

### Branch Name Groups

- bug/chrome32
- bug/contactform
- feature/slideshow
- task/testimonials

^ You can group branches based on the type of work being done. Grouping this way will visually organize your branches into clear categories.

---

## Merging

^ Sometimes, a branch will serve as a place to do work that you plan to throw away. It's quick and cheap and you're under no obligation to reconcile the version of your work in a branch with the one in `master`.

^ Most of the time, though, people use branches to work on things that they intend to fold back into the master copy eventually. `master` continues to evolve independently of other topic branches, and so you'll want to synchronize those changes with the ones in your branch.

^ Merging combines two (or more) different branches of your project into a unified version that contains the unique attributes of both.

---

## Merging Scenario

```bash
$ git checkout master
Switching to branch 'master'

$ git merge update-contact-info
Updating 286af1c..885e3ff
Fast-forward
```

^ The `master` branch contains the version of your site that's currently live on the web. Someone on the team discovers an error in the contact information, so they create a new topic branch named `update-contact-info` where the error is fixed. Now you want a version of the `master` branch that includes the updated contact info from `update-contact-info`.

^ Checkout the `master` branch, then run `git merge <branchname>`. Now you have a version of master that contains everything it had before, plus the amended contact info.

---

## Handling Merge Conflicts

^ This scenario is called a _fast-forward_ merge. This, the simplest type of merge, is easy because only one branch has changed. The `master` branch has no commits that our topic branch does not have, so when we merge, our topic branch changes can smoothly be incorporated into `master` quickly and with conflict.

^ Sometimes that's not the case, and Git will ask for your help. This is one of the most annoying scenarios in Git, and one that can seme really scary the first time you encounter it: the dreaded _merge conflict_.

---

### Merge Conflict Example Details

- Megan has been promoted
  - `promote-megan`
- About page tweak
  - `about-page-class-names`

^ Megan, has recently been promoted from Director of Sales to Vice President, _(click)_ and we're working on a branch (`promote-megan`) to add her new title to the company's About page. At the same time, someone else on our team is tweaking the HTML structure for the About page in their own branch _(click)_ (`about-page-class-names`), using Megan's old title but changing all the markup around it. These two changes seem innocuous enough, but they're a recipe for a Git disaster.

---

### Merge Conflict Part 1

```bash
(promote-megan *) $ git merge master
Auto-merging about.html
CONFLICT (content): Merge conflict in
about.html
Automatic merge failed; fix conflicts
and then commit the result.
```

^ `about-page-class-names` is merged into `master` first, so that new HTML structure is now also part of master. Then, being conscientious Git users, we try to update our `promote-megan` branch by running `git merge master`.

---

### Merge Conflict Details

```html
<div class="team-member">
  <h2>Meghan Somebody</h2>
<<<<<<< HEAD
  <p class="title">Vice President, Market Development</p>
=======
  <p class="job-title">Director of Sales</p>
>>>>>>> master
</div>
```

^ The lines full of angle brackets are conflict markers, denoting the two versions of the conflicting line, which are separated by a line full of equal signs.

^ At the top we have the version of the file in our current branch, identified as `HEAD`. The bottom version is the one we're trying to merge in, identified by its branch name `master`. Git will not assume anything about which version is right, or how to correctly combine the two. Git doesn't know anything about job titles and can't write HTML, so you have to step in and craft the merged version.

---

### Merge Conflict Solution

```html
<div class="team-member">
  <h2>Meghan Somebody</h2>
  <p class="job-title">Vice President, Market Development</p>
</div>
```

^ To resolve this conflict, we need to replace all of this - everything between and including the angled-bracket lines- with the version fo the code that we want to wind up with following the merge. This handcrafted merge incorporates both the new class name and the new title.

---

### Merge Conflict Resolved

```bash
(promote-megan *) $ git add about.html
(promote-megan *) $ git commit -m "Merge branch >>master into promote-megan,
w/ resolved conflicts"
```

^ This commit resolves the merge.

---

### VSCode Conflict Resolution

![inline](images/03-git/03-git-vscode_conflict_resolution.png)

---

## Remotes

^ So far all of the changes we've made and committed live in one place: your computer. Git is great because unlike other version control systems, Git maintains the repository of committed versions locally instead of exclusively on a server, which would require you to be online to commit changes. Git works offline by default.

^ But working solo is not really why people come to Git. People usually come to Git because they want to collaborate. A _remote repository_ as opposed to a local one on your computer is a copy of a Git project that lives somewhere else: another computer on your network, someone elses computer, an online service like GitHub - anywhere else.

---

## Your Git Hub

- `git push`
- `git pull`

^ Git's decentralized design allows you to push and pull changes between two computers. If you want to, you can push commits from a branch on your computer directly to a branch on your teammate's computer and vice versa. It's great, but it does introduce a lot of complexity.

^ Instead, many teams share code via Git through something called a _hub model_. It's a centralized place you and your team keep a shared copy of a project on a remote server where it's accessible to everyone on the team. Each team member who joins the project copies (or _clones_) the project repository on their own computer, makes and commits changes there and then uses _(click)_ the `git push` and _(click)_ `git pull` commands to synchronize their repo with the one stored on the server.

---

![fit](images/03-git/03-git-hubmodel.png)

^ Remote repositories are instances of the project, stored somewhere accessible so that you can push or pull commits to or from them. The hub also serves as a reliable backup of the code in the event that a contributor's own copy of the project gets corrupted or lost somehow, or someone needs a new copy of the project. Git's decentralized design helps us out with the reverse as well; if a hub is ever compromised or corrupted, any local repo can be used to span a new remote. Every copy of the project contains a complete history of all commits in the project.

---

## Adding A Remote

```bash
(master) $: git remote add origin https://gitexample.info/our-website.git
```

- `remote add`
- `remote rm`

^ At this point we have our own local copy of the project stored on our computer. But let's say we also have a remote Git repo stored on our own server, `gitexample.info` which we want to setup as the origin for our project. To do this, we'll use the `git remote add` command.

^ `git remote` is a new command that has _subcommands_. Remotes are handled with two-word commands starting with `remote`. _(click)_ _(click)_

---

## List All Remotes

```bash
$ git remote
origin
```

^ Similar to how `git branch` shows a list of branches, `git remote` will list all of the remomtes. At this time we only have one, `origin`. Just as your project's primary branch has a conventional name `master`, so does its primary remote `origin`.

---

## Working With Remote Branches

- `git push`
- `git pull`

^ Once you've committed a change to a branch on your local repository, you can use the `git push` to submit your copy of that branch, and all the new commits you've added to the server. Whenever you need to refresh your copy of a branch with everyone else's latest changes, you use `git pull`.

---

### Pushing Changes

^ We've worked on our new homepage for a while, and while doing so we've discovered a bug in some JavaScript. Someone else on the team has offered to help fix the problem, but first we need to get our changes into her copy of the project. To do this, we need to push the `new-homepage` branch from our computer to the server, where our teammate can find and pull from it.

---

### Pushing Changes Example

```bash
$ git push origin new-homepage
Counting objects: 8, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (8/8), 743 bytes | 0 bytes/s, done.
Total 8 (delta 1), reused 0 (delta 0)
To https://gitexample.info/our-website.git
 * [new branch]      new-homepage -> new-homepage
```

^ The command we need is `git push <remote> <branch>`. Git wants us to be explicit here, listing exactly which remote we want to push to (`origin`), and which branch we want pushed (`new-homepage`). Git is doing several things on our behalf.

^ **Note**: you may be prompted for username/password information here if using https protocol.

---

#### Push Breakdown Part 1

```bash
Counting objects: 8, done
Delta compression using up to 8 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (8/8), 743 bytes | 0 bytes/s, done.
Total 8 (delta 1), reused 0 (delta 0)
```

^ Nothing here we need to know. It's saying that Git was able to pack up and send our data to the server successfully.

---

#### Push Breakdown Part 2

```bash
* [new branch]      new-homepage -> new-homepage
```

^ Here, Git tells us that the remote server received our branch called `new-homepage`, and from it created a new branch on the server, also called `new-homepage`.

---

## Pulling Changes

```bash
$ git pull origin new-homepage
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 2), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
From https://gitexample.info/our-website.git
 * branch            new-homepage     -> FETCH_HEAD
Updating fed3ac5..4f82376
Fast-forward
 carousel.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

^ Later that day, our teammate has submitted her changes, fixing the JavaScript bugs. Now it's time to get the changes she has committed to the `new-homepage` branch into our copy of the branch, by updating our branch using `git pull <remote> <branch>`.

^ As with git pull, the response includes several lines (beginning with remote:) that explain how data is being transferred between the two repos, which isn't very interesting. Let's skip past that, to where there is an interesting detail:

---

### Pull Details

```bash
From https://gitexample.info/our-website.git
 * branch            new-homepage     -> FETCH_HEAD
```

^ Here, where you might expect Git to say it has pulled changes from the server's copy of new-homepage to our local copy of the same branch, the little ASCII arrow is instead pointing to something called `FETCH_HEAD`. `FETCH_HEAD` is a temporary branch Git creates as a buffer. It's used by Git during the pull process to aid in the merging process. The pulling process involves multiple steps - fetching the Git objects from the remote, detecting merge conflicts, and merging the changes into the local branch if possible.

---

## Keeping In Sync

```bash
git pull origin master
```

^ While working in a topic branch, you should pull in the server's `master` branch regularly, to reduce the risk of merge conflicts and to help keep any conflicts that do occur as minimal as possible. The command for this is `git pull origin master`, which works similarly no matter which branch you're in.

---

## Dealing With (`push`) Rejection

```bash
(new-homepage) $: git push origin new-homepage
To https://gitexample.info/our-website.git
 ! [rejected]        new-homepage -> new-homepage (non-fast-forward)
error: failed to push some refs to 'https://gitexample.info/our-website.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

^ Back to our example from earlier, we continue to work on the design of our new homepage, and our teammate who found our JavaScript bug earlier has found and fixed another bug in our code. She committed and pushed her fix to the remote branch, but got pulled into a meeting before she could let us know she added some changes to our branch. Meanwhile, we try to push some changes of our own to the branch and get this message.

---

### _Gulp_ What Happened

```bash
! [rejected]        new-homepage -> new-homepage (non-fast-forward)
```

^ Server side Git repos don't have working copies, staging areas, or human users who can help resolve conflicts. If a merge requires more than a simple fast-forward, Git will require us to get involved. The response from `git push` tells us this:

^ The situation is easily fixed. We pull the changes down from the server, then try pushing again. A good practice to avoid these types of issues is to pull before you push to make sure your own local copy is up to date.

---

## Pull Requests

![inline](images/03-git/03-git-pullrequest.png)

^ GitHub offers a nice feature called _pull requests_. Pull requests let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up commits before the changes are merged into the repository.

^ After initializing a pull request, you'll see a review page that shows a high-level overview of the changes between your branch (the compare branch) and the repository's base branch. You can add a summary of the proposed changes, review the changes made by commits, add labels, milestones, and assignees, and @mention individual contributors or teams.

---

## The Log

```bash
git log
```

^ The log is a history of your project's commits. The primary tool for viewing the list is the `git log` command. Hosting services like GitHub offer tools for browsing your old commits. These tools are sometimes more user friendly than working on the command line. The benefit of using the command line though is that the command line interface will e consistent regardless of the hosting service used (GitHub, Bitbucket etc), and it is available offline.

---

### The Log's Options

```bash
$ git log
commit 45b1ec87cd2fde95a110dfe3028e93d25c9af186
Author: Phil Sinatra <code@philsinatra.com>
Date:   Fri Dec 26 16:28:41 2014 -0500
    📚 Update Final Assignment Submission Notes
commit bf8144d4690d3f6052dc7f42135e3e9944b96b5a
Author: Phil Sinatra <code@philsinatra.com>
Date:   Thu Dec 25 13:24:25 2014 -0600
    🔧  Add Make Script
```

^ By default, `git log` will show a list of every commit in your project.

^ The lines starting with `commit` denote a commit, each of which takes up a few lines. The long string of letters and numbers are each commit's ID. Below that, we see the `Author` who made this commit (me), and the `Date` on which it was added. Finally, there's the commit's log message, shown indented underneath the metadata.

---

### Log Formatting Options

- [Git Log Documentation](https://git-scm.com/docs/pretty-formats)

^ There are many ways to filter and format the log results, to many to go through in detail. The official documentation provides examples and sample code for these various options. This is why writing good commit messages, and keeping yourself organized is so important. This provides a visual reference to everything that has happened from the onset of our project.

^ As an example: `cd ~/github/IDM222; git log --pretty=oneline`

---

## More Git Topics

- tags
- rebase
- diff
- [my notes](https://github.com/philsinatra/docs/blob/master/git.md)

---

## Git Workflows

- Centralized
- Feature branching
- Gitflow
- Forking

^ So now that we have a better understanding of how to use Git beyond the bare basics, what can this offer us within our daily workflow? We've seen that Git works best when it's a collaborative tool, with more than one developer contributing to a project. If you are going to work in teams, you need to have a plan on how you want to manage the project workflow. Git has several workflow concepts that are battle tested, chances are one of these will work for you.

---

### Centralized

![inline](images/03-git/03-git-workflow-centralized.png)

^ In a _centralized_ workflow, all team members clone the same remote _origin_ repository, and push/pull directly to it. This is okay in some cases, where teams are very small and very vigilant with organization. There is a higher risk of merge conflicts in this workflow as teams get larger and team members are working on multiple features/bugs etc. at the same time.

---

### Forking

![inline](images/03-git/03-git-workflow-forking.png)

^ In a _forking_ workflow, team members create a _fork_ of what is considered the official, origin repository. In this workflow, each team member maintains their own clone of the official repository. One team member serves as the _integration manager_. This person is considered a "gate keeper" of the main, origin repository. All merging and pull requests must go through the "gate keeper" owner. Let's walk through an example of this workflow.

---

![fit](images/03-git/03-git-workflow-forking-example.png)

---

### Forking Workflow Example Plan

1. Create your `fork`
1. Clone your `fork`
1. Work in `feature` branch
1. `push` feature branch
1. Create `pull request`
1. `pull` _origin_ into _master_

---

![100%](images/03-git/github-forkbutton.png)

---

#### Clone Your Fork

```bash
git clone git@github.com:philsinatra/myproject.git
```

---

#### Feature Branch Workflow

```bash
git checkout -b myfeaturebranch

# Work, add commits etc.

git push origin myfeaturebranch
```

---

#### Create Pull Request

![inline](images/03-git/03-git-pullrequest.png)

---

#### Update Fork Master

```bash
git checkout master
git pull https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git BRANCH_NAME
# Resolve conflicts
git push origin master
```

---

## Questions

---

## Large File Storage

^ Keeping your repository lean and fast is a difficult and important task. Once you commit a file to your repository, it is part of the repo and removing the file can be very difficult if not impossible. As we've seen, deleting something from our repo is actually a process of creating a new commit that shows that certain files have been removed. This process does not actually delete the history of the files, which means any bulk added to our repository from these files, is still part of the repo.

---

### LFS

- [GIT LFS](https://git-lfs.github.com)

^ Git Large File Storage (LFS) replaces large files such as audio samples, videos, datasets, and graphics with text pointers inside Git, while storing the file contents on a remote server like GitHub.com or GitHub Enterprise.

^ This allows you to include large, binary files in your repository, without suffering the massive bloat of the common .psd or other source file.

---

### LSF Setup

```bash
git lfs install
git lfs track "*.psd"
git add .gitattributes

git add file.psd
git commit -m "Add design file"
git push origin master
```

^ Getting setup is easy, follow the instructions on the GIT LFS website.

^ 1. Download and install the Git command line extension. You only have to set up Git LFS once.

^ 2. Select the file types you'd like Git LFS to manage (or directly edit your `.gitattributes`). You can configure additional file extensions at anytime.

^ 3. Make sure `.gitattributes` is tracked

^ 4. Commit and push to GitHub as you normally would.

---

## What To Ignore

^ There are some files and folders that should be totally ignored from your repositories. Use a `.gitignore` file in your repo's root directory to manage files, file types, and directories that should be completely ignored while managing your repository. There are example files listed in the resources page to get you started. **Remember**, once a file is committed to the repo, it is part of the history of the project. Even if it is removed later, it remains part of the history and therefore part of the repository. Be careful and organized when adding new files and folders so that you commit exactly what you want and nothing more.

---

![100%](https://cdn.shopify.com/s/files/1/0051/7692/products/aba-000017-pp-3_1100x@2x.progressive.jpg?v=1482334015)

---

## GitHub Project Management

- users
- milestones
- issues
- labels
- scrum board
- wiki

---

Concepts, verbiage and examples are from "Git For Humans" By David Demaree

[https://abookapart.com/products/git-for-humans](https://abookapart.com/products/git-for-humans)