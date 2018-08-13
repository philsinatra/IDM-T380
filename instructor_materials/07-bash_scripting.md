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

### `!#/bin/bash`

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

- reading: `$myVariable`
- setting: `myVariable=Hello`
- casing: your preferene
- location: anywhere

^ To read a variable we place its name, preceded by a dollar sign, anywhere in the script. Here are some points on syntax.

^ _(click)_ When referring to or reading a variable we place a $ sign before the variable name.

^ _(click)_ When setting a variable we leave out the $ sign.

^ _(click)_ Some people like to always write variable names in uppercase so they stand out. It's your preference however. They can be all uppercase, all lowercase, or a mixture.

^ _(click)_ A variable may be placed anywhere in a script (or on the command line for that matter) and, when run, Bash will replace it with the value of the variable. This is made possible as the substitution is done before the command is run.

---

## Command Line Arguments

```bash
ls -l /etc
```

^ Command line arguments are commonly used and easy to work with so they are a good place to start.

^ When we run a program on the command line you would be familiar with supplying arguments after it to control its behavior. For instance we could run the command `ls -l /etc`. `-l` and `/etc` are both command line arguments to the command `ls`.

---

### Arguments Example

```bash
#!/bin/bash

cp $1 $2
# Verify the copy worked
echo Details for $2
ls -l $2
```

^ Line 3: run the copy command with the first command line argument as the source and the second command line argument as the destination.

^ Line 5: run the command `echo` to print a message

^ Line 6: after the copy is complete, run the `ls` command for the destination to verify it worked.

---

### Arguments Example Script

```bash
$ ./mycopy.sh /projects/file1.data ./results.data
Details for ./results.data
-rw-r--r-- results.data
```

## Setting Variables

```bash
variable=value
```

^ There are a few ways variables may be set, but the basic format follows this pattern. Formatting is important - note there is no space on either side of the equals sign. We also leave off the dollar sign at the beginning of the variable name when setting it.

^ Variable names can be uppercase, lowercase or a mixture of both. Bash is case sensitive so whenever you refer to a variable you must be consistent about the casing.

---

### Setting Variables - Example

```bash
#!/bin/bash
myvariable=Hello
anothervar=Fred

echo $myvariable $anothervar
echo

sampledir=/etc

ls $sampledir
```

---

## Quotes

- single quotes: 'treat every character literally'
- double quotes: "allow substitution"

^ In the previous example, all of the values for our variables were single words. When we want variables to store more complex values, we need to use quotes. Remember, under normal circumstances, Bash uses a space to determine separate items.

^ When we enclose content in quotes, we're indicating to Bash that the contents should be considered as a single item. You can use single or double quotes.

^ _(click)_ Single quotes will treat every character literally

^ _(click)_ Double quotes will allow you to do substitution, which means we can include variables within the setting of the value.

---

### Quotes - Example

```bash
$ myvar='Hello World'
$ echo $myvar
Hello World

$ newvar="More $myvar"
$ echo $newvar
More Hello World

$ newvar='More $myvar'
$ echo $newvar
More $myvar
```

---

## Exporting Variables

```bash
var1=foo
var2=bar

export var1

./script2.sh
```

^ Remember variable scope - the idea is that variables are limited to the process they were created in. It is possible that a script may run another script as one of its commands. If we want the variable to be available to the second script then we need to export the variable.

---

## Input

^ Next, let's look at ways to provide information to a script.

---

### Ask For Input

```bash
echo Hello, who am I talking to?

read varname

echo It\'s nice to meet you $varname
```

^ The `read` command will ask the user for input and save the user's response into the variable `varname`

---

### Read More

```bash
read -p 'Username: ' uservar
read -sp 'Password: ' passvar
echo Thank you $uservar, we have your login details
```

^ You are able to alter the behavior of read with a variety of command line options. Two commonly used options however are `-p` which allows you to specify a prompt and `-s` which makes the input silent. This can make it easy to ask for a username and password combination.

---

## If Statements

```bash
if [ <some test> ]
then
  <commands>
fi
```

^ If statements work in Bash scripting as you would expect. If statements allow us to make decisions in our Bash scripts. They allow us to decide whether or not to run a piece of code based upon conditions that we may set. If statements, combined with loops allow us to make much more complex scripts which may solve larger tasks.

^ Anything between *then* and *fi* (if backwards) will be executed only if the test is true.

---

### If Statement Example

```bash
if [ $1 -gt 100 ]
then
  echo Hey that is a large number
  pwd
fi
```

---

### Indenting

^ You'll notice that in the if statement above we indented the commands that were run if the statement was true. This is referred to as indenting and is an important part of writing good, clean code (in any language, not just Bash scripts). The aim is to improve readability and make it harder for us to make simple, silly mistakes. There aren't any rules regarding indenting in Bash so you may indent or not indent however you like and your scripts will still run exactly the same. I would highly recommend you do indent your code however (especially as your scripts get larger) otherwise you will find it increasingly difficult to see the structure in your scripts.

---

## If Else

```bash
if [ $# -eq 1 ]
then
  nl $1
else
  nl /dev/stdin
fi
```

---

## If Else If

```bash
if [ $1 -ge 18 ]
then
  echo You may go to the party.
elif [ $2 == 'yes' ]
then
  echo You may go to the party but be back before midnight.
else
  echo You may not go to the party.
fi
```

---

## Boolean Operators

```bash
if [ -r $1 ] && [ -s $1 ]
then

if [ -r $1 ] || [ -s $1 ]
then
```

---

## Case Statements

```bash
case $1 in
  start)
    echo starting
    ;;
  stop)
    echo stoping
    ;;
  restart)
    echo restarting
    ;;
  *)
    echo don\'t know
    ;;
esac
```

---

## While Loops

```bash
while [ <some text> ]
do
  <commands>
done
```

^ One of the easiest loops to work with is `while` loops. While an expression is true, keep executing these lines of code.

---

## While Loops - Example

```bash
counter=1
while [ $counter -le 10 ]
do
  echo $counter
  ((counter++))
done
```

---

## Until Loops

```bash
counter=1
until [ $counter -gt 10 ]
do
  echo $counter
  ((counter++))
done
```

^ The `until` loop is fairly similar to the while loop. The difference is that it will execute the commands until the test becomes true.

---

## For Loops

```bash
names='Stan Kyle Cartman Kenny'

for name in $names
do
  echo $name
done
```

---

## Break

```bash
for value in $1/*
do
  if [ $used -gt 90 ]
  then
    echo Low disk space
    break
  fi
done
```

^ The break statement tells Bash to leave the loop straight away. It may be that there is a normal situation that should cause the loop to end but there are also exceptional situations in which it should end as well.

---

## Continue

```bash
for value in $1/*
do
  if [ $used -gt 90 ]
  then
    echo Low disk space
    continue
  fi
done
```

^ The continue statement tells Bash to stop running through this iteration of the loop and begin the next iteration.

---

## Functions

```bash
print_something () {
  echo Hello I am a function
}

print_something
```

^ Creating a function is fairly easy. Define the function by giving it a name. Within the curly braces we can put as many commands as we like. Once the function is defined, we can call it as many times as we'd like.

---

### Passing Arguments

```bash
print_something () {
  echo Hello $1
}

print_something Mars
print_something Jupiter
```

^ This will work a bit differently than you are used to. It is often the case that we would like the function to process some data for us. We may send data to the function in a similar way to passing command line arguments to a script. We supply the arguments directly after the function name. Within the function they are accessible as `$1`, `$2`, etc.

---

### Return Values

```bash
print_something () {
  echo Hello $1
  return 5
}
print_something Mars
echo The previous function returned a value of $?
```

^ Most other programming languages have the concept of a return value for functions, a means for the function to send data back to the original calling location. Bash functions don't allow us to do this. They do however allow us to set a return status. Similar to how a program or command exits with an exit status which indicates whether it succeeded or not. We use the keyword return to indicate a return status.

^ The `$?` contains the return statement of the previously run command or function.

---

## Bash Profile

- macOS: `~/.bash_profile`
- Windows: `./bashrc`

^ `bash_profile` is a configuration file for bash shell. When bash is invoked as an interactive login shell it first reads and executes commands from `~/.bash_profile`. This file can be used to export variables in shell. This is a hidden file that sits in the user directory on macOS.

---

## Create a Bash Profile

```bash
cd ~
touch .bash_profile
```

---

## Customize Bash Prompt

```bash
export PS1=""
export PS1="\W\ \$ "
```

- [http://ezprompt.net](http://ezprompt.net)

^ One common thing to do in your profile is customize the prompt. You can do that by exporting a variable named `PS1`. Whatever you put between the quotes will be your new prompt, and you can use some special expressions to have the prompt show some specific information.

---

### Git Branch in Prompt

```bash
export PS1="\W\$(parse_git_branch)\[\033[00m\] $ "

parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
```

---

## Changing Directories

```bash
cd ../
cd ../../
cd ../../../
```

^ Recall the `cd` command for changing directories.

---

## Change to Desktop

```bash
cd ~/Desktop
```

---

## Opening Applications

```bash
open -a 'FirefoxNightly'
open -a 'Visual Studio Code'
open -a /Applications/Adobe\ Photoshop\ CC\ 2018/Adobe\ Photoshop\ CC\ 2018.app/
```

---

## Aliases

```bash
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."

alias dt="cd ~/Desktop"

alias nightly="open -a 'FirefoxNightly'"
```

---

## Custom Functions

^ You can add your own functions to your profile and they will be available regardless of your location in the terminal.

---

### Make Directory & Go

```bash
mkdir -p new_directory
cd new_directory

function mkd() {
  mkdir -p "$@" && cd "$_";
}
```

---

### File Sizes

```bash
function fs() {
  if du -b /dev/null > /dev/null 2>&1; then
    local arg=-sbh;
  else
    local arg=-sh;
  fi
  if [[ -n "$@" ]]; then
    du $arg -- "$@";
  else
    du $arg .[^.]* ./*;
  fi;
}
```

---

### Remove Spaces

```bash
function removespaces() {
  for n in *
  do
  old=$n
  new=`echo $n | tr -s " " "-"`
  echo $new
  mv "$old" "$new"
  done
}
```

---

## Example

^ So you see most of the scripting concepts we've covered in previous classes apply to shell scripting as well. While the syntax is different, the concepts are the same which shows that a good programmer can script in any language. The syntax differences are just a matter of research. Let's build an example script.

^ _examples/07-bash\_scripting/_