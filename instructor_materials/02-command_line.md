build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# Workflow Optimization Techniques

---

# The Command Line

```bash
MacBook-Pro ~ $
```

---

## Why Use The Terminal

- decades of development
- lots of tiny tools (Unix philosophy)
- tiny tools build larger systems

^ _(click)_ Decades of development have gone into the tools available from the terminal/command line. _(click)_ Many tiny tools/programs exist and are available for immediate implementation. The practice of designing tiny tools is known as the _Unix philosophy_. _(click)_ Often these tiny tools join forces to solve more complex problems.

---

## Example

```bash
MacBook-Pro ~ $ cat README.md
MacBook-Pro ~ $ grep 'Drexel University' README.md
```

^ Consider a tiny utility called `cat`, which allows you to print the contents of a file to the screen. On its own, `cat` is somewhat limited. But as part of a larger system... Combine `cat` with `grep`, now we can quickly find find out on what line the words "Drexel University" appear in our document. We can count how many times we use the phrase "Drexel University". We can even plug that output into another program and manipulate the text.

^ Can you plug Adobe Photoshop into Sublime Text to edit your images directly from your text editor? In the terminal, these type of events are common practice.

---

## Terminal Application Options

- macOS Terminal
- Windows `cmd.exe` Terminal
- Linux Gnome Terminal

^ macOS comes with a terminal application called "Terminal". "Command Prompt" is the official name for the Windows terminal, but you may often here to it referred to as _command-dot-ex-ee_.

---

## macOS Alternatives

- [iTerm2](https://www.iterm2.com)
- [Hyper](https://hyper.is)

^ You only need one terminal application to get to the command line. You will want to customize and personalize whichever application you are using based on your personal preferences. Some macOS alternatives to the built in Terminal application include:

---

### iTerm2 Benefits

- tabs
- split screens
- select-to-copy
- customization options

---

## Windows Enhancements

- [Git BASH](https://gitforwindows.org)

^ Command Prompt does not include the same features/tools of other terminals. If you're a Windows user, I recommend you install Git BASH. This will give you the same commands and navigation methods that Linux and Mac users will have.

---

## The Prompt `$`

^ Once you've opened the terminal, you'll notice that initially you're presented with very little. Most likely a dollar sign and a mostly blank screen. The prompt (usually represented by a dollar sign) is where you enter commands into the terminal. The prompt can be anything and can be totally customized.

---

## Listing Files and Directories

```bash
ls
ls -l
ls -F
ls -lt
ls -lF
ls -la
ls -laF
```

^ That is a lower case _ell_. Typing `ls` and hitting Enter in the terminal will list all the current working directory's files and subdirectories.

^ If the current working directory has a large number of files/folders, it may be difficult to sort all of the results. You can add a parameter to your listing using a dash and another lower case _ell_, so that the output is displayed as a list.

^ There are many other parameters you can pass to the list command. `-F` will add trailing slashes to any directories, making it easier to distinguish them from files. `-a` will show hidden files that otherwise would not be visible in the Finder window. `-t` will order the files based on time, showing the newest contents first. `-r` (not shown) reverses the order.

^ You can combine the parameters in any order to list the directory contents any way you prefer.

---

## Results

```bash
$ ls -l
total 8
-rw-r--r--  1 owner  group  269 Feb 12 10:12 README.md
drwxr-xr-x  3 owner  group  102 Feb 12 10:15 docs
drwxr-xr-x  3 owner  group  102 Feb 12 10:12 src
```

---

## Results Explained

- total (the total blocks used, not total files!)
- permissions (READ/WRITE/EXECUTE)
- ownership
- file size (bytes)
- timestamp (last modified)
- name & type (file/directory)

^ The output provides a lot of information

---

### Listing Wildcards

```bash
$ ls -l
total 8
-rw-r--r--  1 owner  group  269 Feb 12 10:12 README.md
drwxr-xr-x  3 owner  group  102 Feb 12 10:15 docs
drwxr-xr-x  3 owner  group  102 Feb 12 10:12 src

$ ls -l *.md
-rw-r--r--  1 owner  group  269 Feb 12 10:12 README.md
```

^ All listings do not have to show all results. You can use expressions and wildcards in your commands to filter the information that is returned. The asterisk is a wildcard symbol. In this example, we're asking to list all of the files that end with the characters `.md`, which effectively lists all the Markdown files and nothing else.

---

## Changing Directories

```bash
cd [directory name]
cd docs
cd docs/assignments
cd ../
cd ~
cd -
```

^ The `cd` change directory command will allow you to navigate around the system, moving into and out of any directory anywhere on the computer.

^ You can change directory based on a relative, or absolute path, moving up or down as many directories as you want at once. Moving up a single directory is done using the `../` path. There are other shortcuts built into the `cd` command. Changing directory to the tilde `~` will navigate you to the user folder. Changing directory to the dash `-` will navigate you back to your previous location, a great tool for quickly moving back and forth between two directories that are not directly connected in any natural way.

---

## Current Location

```bash
$ pwd
/Users/username/Documents/IDM
```

^ You can echo your current location using the `pwd` command.

---

## Spaces in Names

```bash
cd [directory name]
cd my project folder
cd "my project folder"
cd my\ project\ folder
```

^ The `cd` command takes one argument, a directory name. No doubt you will have files/folders that have spaces in their names. To work around this you have two options: you can wrap the folder name in quotes, or you can escape the spaces using a backslash.

---

## Create New Files

```bash
touch index.html
touch one.txt two.txt three.txt
```

^ The `touch` command will create a new file. Pass the name of the file you want to create. You can pass in multiple file names at once to create more than one file at a time. The `touch` command also will update the modification date of a file that already exists.

---

## Create New Directories

```bash
mkdir directory_name
mkdir src/css
mkdir "IDM Project Folder"/src/css
```

^ The `mkdir` make directory command will create a new directory at the specified location.

---

## Move Files

```bash
mv file.txt destination/
mv src/css/screen.css ../

$ ls
file1.html

mv file1.html index.html

$ ls
file1.html
```

^ The `mv` move command moves a file from one location to another. All of the directory navigation rules are still in effect. The `../` represents one directory above the current directory.

^ The `mv` move command is also used to rename a file. You are "moving the current file" in the same location, the only difference is the end result file name.

---

## Opening Files/Folders

```bash
open filename.txt
open folder
open -a 'Application Name' filename.txt
```

^ The `open` command will open the specified file/folder using the default application specified on the system based on the type of file.

---

## Exercise 🏋️‍

1. navigate to your `~/Desktop`
1. Create a folder named _TestProject_
1. navigate inside the new folder
1. create a file named _my\_file.txt_
1. rename the file to _my\_file.html_

---

## Using Your History

- ⬆️ arrow up
- `!!` bang bang
- `!$` bang dollar
- `history` command

^ Hitting the up arrow key allows you to cycle through your command history, making it easier to re-run a command more than once. _(click)_ _bang bang_ is shorthand for "your last command". This will run whatever your last command was again. _(click)_ _bang dollar_ gives you the last argument of your previous command.

---

### `!$` _bang dollar_ Example

```bash
$ echo "hello world"
hello world

$ say !$
```

---

### `history` Example

```bash
$ history
508  ls
509  open "my cool folder"/
510  say "hello"
511  echo "hello world"
512  say "hello world"
513  history

!512
```

^ The `history` command will display a list of commands in the terminal's history, each with a number representing the index of the command. You can use the log to copy/paste a command to run it again, or you can use the _bang index_ command to rerun a command based on the index number.

---

## Keyboard Shortcuts

- Tab
- Control-C
- Control-D
- Control-R

^ _(click)_ Tab will try to autocomplete a command you're typing. _(click)_ Control-C is _abort_. It stops an application from running. _(click)_ Control-D is _end transmission_, or "GTFO". This will close your terminal session completely. _(click)_ Control-R is a command search shortcut. Try typing Control-R and then in the search input, begin typing any command. The terminal will search recent commands to try and find a match.

---

## Removing Files/Directories

### With Great Power, Comes Great Responsibility

^ Be careful about deleting files. Today's systems go out of there way to protect you from yourself. That being said, the terminal is less forgiving about following orders.

---

## Deleting Regular Files

```bash
$ ls
file.txt hello.txt index.html

rm file.txt
rm *.txt
```

^ The `rm` remove command will delete the specified file(s). The asterisk is a wildcard character. In this example `*.txt` is called a _glob_.

---

## Removing Dirctories

```bash
$ rm chapter6/
rm: chapger6/: is a directory
```

^ Directories aren't as simple. `rm` isn't really made to be used on them.

---

## Deleting Dirctories

```bash
rmdir chapter4/
rmdir: chapter4: Directory is not empty
```

^ Directories have a _special_ command, `rmdir`. This works as long as the directory is entirely empty, which is unlikely. At this point you would have to remove the individual files one at a time, or blow everything away in one command.

---

![The Danger Zone](https://www.phillymag.com/wp-content/uploads/sites/3/2013/11/TopGun1.jpg)

---

## Ultimate Delete

```bash
rm -rf
```

^ The command `rm -rf` uses two flags. `-r` which works recursively through any/all subdirectories, and `-f` which forcibly removes files without any prompts. This command will delete without any prompting and destroy any subdirectories.

---

### Ultimate Delete Example

```bash
rm -rf IDM221
```

^ This will nuke my entire project folder in a single command, no prompt to check if I'm sure.

---

### Don't Do This

```bash
# ⚠️ DO NOT DO THIS ⚠️

rm -rf ~

# ⚠️ DO NOT DO THIS ️⚠️
```

^ What would happen?

---

## When You Don't Have Permission

^ `rm -rf` only works when you have permission to _write_ to a file. What about files you don't own?

---

## `sudo`

^ `sudo` stands for _Super User Do_. Computers have a user permission system, and the user with the most privilege is _root_. The almighty _root_ can do absolutely anything.

^ When you're logged into your computer, you're more than likely under your own username. Your user has some privileges. If you share a computer with someone else, you don't have access to read and write or execute that other person's files.

^ General rule - always try to complete the command you need without the `sudo` command.

---

## Using `sudo`

```bash
$ sudo rm /User/jack/boring-pony.jpg
Password:
```

^ You can prefix any command in the temrinal with `sudo`. This will run your command with _superuser_ (root) privileges. Run this command, enter your password, and that's it. (as long as you are an admin user)

---

## Why Not Use It All The Time

^ Not a good practice. That would be like driving a tank around a quiet neighborhood. Just because you can, doesn't mean you should.

---

## Tools of the Trade

---

## The | `pipe`

```bash
echo 'hello world' | say
```

^ The `pipe` typically appears between two commands. It takes the output from the first command (on the left side) and 'pipes' it to the second command (on the right). You get the output of one command as the input of another. You can pipe multiple commands together. Most commands you issue support this behavior.

---

## String Manipulation: `grep`

- regular strings: "foo"
- regular expressions: ^foo

^ `grep` is a tool that searches for an expression and prints matches to the screen. _(click)_ Expressions can be regular strings (like foo) or _(click)_ regular expressions (like ^foo, which means "lines starting with ‘foo'").

---

## `grep` Example

```bash
$ grep '#' 02-command_line.md
# IDM Special Topics Need Title
# The Command Line
## Why Use The Terminal
## Example
## Terminal Application Options
## macOS Alternatives
...
```

^ All of the presentations for this class are written in Markdown. The hashtag symbol is used to denote headings. If I want to find all of the headings in a presentation, I can use `grep`.

---

## `grep` Example Continued

```bash
$ grep '^## ' 02-command_line.md
## Why Use The Terminal
## Example
## Terminal Application Options
## macOS Alternatives
...
```

^ What if I'm only interested in level 2 headings? I can use a regular expression to find those instances. A caret (^), which means "starts with"; then two hash marks (##); and finally a space (since my Markdown titles are preceded by a space.

---

## `history` | `grep`

```bash
$ history | grep echo
371  echo "hello world";
372  echo "root access: sudo -i"
373  echo "myfile.txt";
374  echo "root access: sudo -i"
514  history | grep echo
...
```

^ Let's look at an example using the pipe. Say you want to search your history. We encountered the history command earlier, but rather than simply listing thousands of entries, maybe you want to search your history for a particular command.

^ In my case, I want to retrieve all of the commands in the history that used 'echo'. So I'll pipe the output from `history` to `grep` and search for the word "echo".

^ The only problem is there still could be a lot of results, which can be tough for us to process.

---

## `less` Is More

```bash
$ less 02-command_line.md
build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# IDM Special Topics Need Title
...
```

^ `less` is a command that lets us page through output. There's a similar command called `more`, but `less` is better because it allows us to page forward and backward (unlike `more`, which only goes forward).

^ Inside the `less` command, I can use the keyboard to cursor up and down; I can page forward (by pressing the Space key) or backward (by typing B). Significantly, I can search while I'm inside `less` by hitting the Slash key. I can enter an expression like `-H` (which is an argument to curl); `less` will highlight the matches and allow me to move through the next matches by typing "n".

^ `less 02-command_line.md`

^ /bash

^ _n_ key to page through results

---

## `history` | `grep` | `less`

```bash
history | grep echo | less
```

---

## Variations On History Searching

```bash
history | grep ls
```

^ Let's list all of the instances of the `ls` command in our history. That's a big list. What if we only want to see the last five entries?

---

## `tail`

```bash
history | grep ls | tail -5
```

^ The `tail` command will show the end of a file (or stream of text), and the `-[number]` option returns a specific number of entires.

---

## `tail` Continued

```bash
history | grep ls | grep -v history | tail -5
```

^ But, since we ran it a number of times, our original command also turns up in the history. So we can pipe grep to another grep to remove matched expressions. Lets find the last five items matching `ls` but not `history`. We can use grep `-v` to remove all occurrences of a term in the results.

---

## Sorting and Picking

- `grep`: to find lines
- `sort`: to sort lines
- `uniq`: to find unique lines
- `cut`, `sed`, `awk`: break lines into columns

^ You can combine these with other tools.

---

## Customizing the Terminal

^ The terminal is an application the runs your _shell_. The _shell_ is where you actually run commands and see the output. The shell can have it's own customization options, regardless of the terminal application you choose to use.

---

## iTerm

- `cmd` + `d`: split window vertically
- `cmd` + `shift` + `d`: split window horizontally
- `cmd` +  `esc`: show/hide terminal
- themes

^ iTerm2 is my favorite terminal application because it accepts a wealth of customizations. Some of my favorites include.

^ Let's take a look at some of the preferences in the preference pane.

---

## The Shell

- Bash
- Fish
- Z shell

^ There are a number of different shells available with varying customizations, Assuming that you’re on a Mac, your machine will come with a shell called Bash. Bash is a good go-to shell, but there are alternatives that have their own pros and cons. Each of these have great features (plugins, themes, additional customization) you can learn about online. For our purposes, we'll stick to Bash for now.

---

## Customization

- prompt
- aliases
- functions
- shortcuts

---

## Questions