build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# Workflow Optimization Techniques

---

# Bash Scripting Basics

^ This is an introduction to the foundations of bash scripting. These are essentials to get you started and to make it easier to digest when scripts get more complicated.

---

## What Is A Bash Script

^ Think of a script for a play, or a movie, or a TV show. The script tells the actors what they should say and do. A script for a computer tells the computer what it should do or say. In the context of Bash scripts we are telling the Bash shell what it should do.

^ A Bash script is a plain text file which contains a series of commands. These commands are a mixture of commands we would normally type ourselves in the command line.

^ Anything you can run normally on the command line can be put into a script and it will do the exact same thing.

---

## myscript.sh

^ Since you already know how to do things on the command line, you already know a fair amount in terms of Bash scripting.

^ The convention for Bash scripts is to use the file extension `.sh`. Linux is an extensionless system though, so a script doesn't necessarily have to have this characteristic to work.

---

## How To Run A Bash Script

```bash
$ ./myscript.sh
bash: ./myscript.sh: Permission denied

$ ls -l myscript.sh
-rw-r--r-- myscript.sh

$ chmod 755 myscript.sh

$ ls -l myscript.sh
-rwxr-xr-- myscript.sh

$ ./myscript.sh
Hello World!
```

^ Running (or executing) a Bash script is fairly easy. Before you can execute a script, it must have the execute permission set. For safety reasons this permission is generally not set by default. If you forget to grant this permission before running the script, you'll get an error message telling you and no harm will be done.

^ The code used here _755_ allows the owner (you) to write or modify the script and for everyone to execute the script.

---

## Hello World

```bash
#!/bin/bash
# A sample Bash script

echo Hello World!
```

- Line 1: _shebang_
- Line 2: comment
- Line 4: command to print a message

^ Let's break the script down. (more about _shebang_ in a minute)

---

## The Shebang (#!)

### `!#/bin/bash

^ This is the first line of our script. The hash exclamation mark character sequence is referred to as the _shebang_. Following it is the path to the program that should be used to run the rest of the lines of the script file. For Bash scripts, that will be the path the the Bash program, but there are many other types of scripts and they each have their own interpreter.

---

### Shebang Formatting

- must be first line
- can not be spaces before
- generally an absolute path

^ Formatting is important. _(click)_ The _shebang_ must be on the very first line. _(click)_ There must be no spaces before the hash symbol or between the exclamation point and the path to the interpreter.

^ _(click)_ You could use a relative path to the interpreter, but most of the time you're going to run a script from a variety of locations, so an absolute path will keep things simple.

^ It is possible to leave the _shebang_ out, but it's unwise. If you are at a terminal and running the Bash shell, the shell will assume the script is a Bash script. However there are a variety of cases where Bash might not be the shell and running a Bash script inside a different shell could be dangerous.

---

## Formatting Is Important

^ Unlike some of the other programming we've done like HTML and CSS where white space had no effect, formatting with Bash scripting will be much more important. Spaces, specifically the presence or absence of a space can be the difference between a script working or not.

^ Indentation of code is another area formatting is important. We'll talk more about this as we move through these topics.

---

## Variables - Introduction

```javascript
const myName = 'Phil';
```

```php
$myName = "Phil";
```

^ You're all quite familiar with variables at this point. They are used to temporarily store a piece of information.

^ Variables may have their value set in a few different ways. The most common are to set the value directly and for its value to be set as the result of processing by a command or program. You will see examples of both shortly.

---

### Reading Variables

- reading: $myVariable
- setting: myVariable=Hello
- casing: your preferene
- location: anywhere

^ To read a variable we place its name, preceded by a dollar sign, anywhere in the script. Here are some points on syntax.

^ When referring to or reading a variable we place a $ sign before the variable name.

^ When setting a variable we leave out the $ sign.

^ Some people like to always write variable names in uppercase so they stand out. It's your preference however. They can be all uppercase, all lowercase, or a mixture.

^ A variable may be placed anywhere in a script (or on the command line for that matter) and, when run, Bash will replace it with the value of the variable. This is made possible as the substitution is done before the command is run.

---

## Command Line Arguments

```bash
ls -l /etc
```

^ Command line arguments are commonly used and easy to work with so they are a good place to start.

^ When we run a program on the command line you would be familiar with supplying arguments after it to control its behaviour. For instance we could run the command `ls -l /etc`. `-l` and `/etc` are both command line arguments to the command `ls`.

---

### Arguments Example

```bash
#!/bin/bash

cp $1 $2
# Verify the copy worked
echo Details for $2
ls -l $2
```

^ Line 3: run the copy command with the first comman line argument as the source and the second command line argument as the destination.

^ Line 5: run the command `echo` to print a message

^ Line 6: after the copy is complete, run the `ls` command for the destination to verify it worked. 

---

### Arguments Example Script

```bash
$ ./mycopy.sh /projects/file1.data ./results.data
Details for ./results.data
-rw-r--r-- results.data
```

https://ryanstutorials.net/bash-scripting-tutorial/bash-variables.php