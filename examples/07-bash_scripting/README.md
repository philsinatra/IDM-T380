# Bash Script Example

## Script Setup

Start out by creating a new shell script file.

```bash
#!/bin/bash

# If there's an error, exit immediately
set -e

# Navigate to the location of the script ->
# regardless of where the script is called from.
cd "$(dirname "$0")/.."
```

Save the file `gen_images.sh` and fix the permissions so it can be executed fromt he command line.

```bash
chmod a+x gen_images.sh
```

## Colors

We're going to use some colors in our output to show success/failure messages. Today's colors will be green, red and yellow, and we'll use bold as well. Let's setup variables that establish these colors.

```bash
bold=`tput bold`
green=`tput setaf 2`
red=`tput setaf 1`
yellow=`tput setaf 3`

reset=`tput sgr0`
```

## Image Size Configuration

We're going to build a script that takes an image and generates various versions of the image at different sizes for us to use in HTML for some responsive images.

---

## Script Planning

![script diagram](../../instructor_materials/images/07-bash_scripting/bash_scripting-001.png)

---

## Script Planning - Structure

Let's prepare some of the structure we'll need for this job.

```bash
processDir="./process-images"
mkdir -p $processDir

report="${processDir}/report.txt"
```

---

## Configuration

We're going to need to tell our script what sizes the images being produced should be. We could hard code these values in our script, but wouldn't it be nice if we could have a simple configuration file that could easily dictate the sizes we need each time we run the script.

Let's build a function in our script that handles this:

```bash
# Prepare configuration
InitConfig () {
  config="${processDir}/images.config"

  if [ -f "${config}" ];
  then
    source $config
  else
    echo "sizes=(1200 600 300)" > $config
  fi
}
```

## Export Location

We're going to need a place to put our exported images. Our script will have to make a few more directories for us. Let's wrap these commands in a function:

```bash
# Create location for exported files
MakeExportDir () {
  exportDirectory="exports"
  exportLocation="${processDir}/${exportDirectory}"
  mkdir -p $exportLocation
}
```

## Report Location

We're also going to generate a report each time we run our script. Let's setup a function that will create our report file:

```bash
# Create a report file
MakeReport () {
  touch $report
  # Clear previous report text
  echo "" > $report
}
```

## Init

Since we're building all these functions, let's setup a function to call that will trigger all of these other functions:

```bash
Init () {
  InitConfig
  MakeExportDir
  MakeReport
  # We'll build this next
  Generator
}

# Execute the Init function when we call our script
Init
```

## Generator

Now we should have what we need to do the real work:

```bash
# Generate .jpg files
Generator () {
  cd $processDir
  i=0
  find . -name '*.jpg' -maxdepth 1 | while IFS= read -r FILE;
  do
    basename="${FILE##*/}"
    filename="${basename%.*}"
    # echo "basename: ${basename}"
    # echo "filename: ${filename}"

    while [ $i -lt ${#sizes[@]} ];
    do
      # Copy are resize source image
      cp $basename $exportDirectory/$filename-${sizes[$i]}.jpg
      sips -Z ${sizes[$i]} $exportDirectory/$filename-${sizes[$i]}.jpg
      cp $basename $exportDirectory/$filename-${sizes[$i]}@2x.jpg
      sips -Z $((${sizes[$i]} * 2)) $exportDirectory/$filename-${sizes[$i]}@2x.jpg

      : $[ i++ ]
    done

    # HTML code
    output=""
    output="${output}<picture>"$'\n'
    output="${output}  <source media=\"(min-width: 56.25em)\" srcset=\"media/${filename}-1200@2x.jpg 2x,media/ ${filename}-1200.jpg 1x\">"$'\n'
    output="${output}  <source media=\"(min-width: 25em)\" srcset=\"media/${filename}-600@2x.jpg 2x,media/ ${filename}-600.jpg 1x\">"$'\n'
    output="${output}  <img srcset=\"media/${filename}@2x.jpg 2x, media/${filename}.jpg 1x\" src=\"media/${filename}-300.jpg\" alt=\"ALT ATTRIBUTE VALUE HERE\">"$'\n'
    output="${output}</picture>"$'\n'

    # Print code to report file
    printf "%s\n" "$output" >> "report.txt"

    i=0
  done

  echo "${green}${bold}[image files build]${reset}"
  echo ""
  cd -
  Optimizer
}

# Optimize .jpg files
function Optimizer () {
  cd $processDir/exports
  find . -name '*.jpg' -maxdepth 1 | while IFS= read -r FILE;
  do
    basename="${FILE##*/}"
    filename="${basename%.*}"
    djpeg -targa $basename > "${filename}.targa"
    cjpeg -targa -quality 60 "${filename}.targa" > $basename
  done

  # Remove .targa files
  rm *.targa
  echo "${green}${bold}[image optimization complete]${reset}"
  echo ""
  cd -

  MoveProcessedFiles
}

function MoveProcessedFiles () {
  dest=build/media
  mkdir -p $dest
  mv $processDir/exports/*.jpg $dest/.
  # rm $processDir/*.jpg

  EchoCode
}

function EchoCode () {
  echo ""
  echo "> HTML Code"
  echo ""
  more $report
  more $report | pbcopy
  echo ""
  echo "> HTML code has been copied to your clipcoard automatically"
  echo ""
  echo "${green}${bold}[done]${reset}"
}
```

## Conclusion

Not all scripts have to be this complicated. Shell scripts can be setup to automate simple, repetitive tasks. You can set these scripts up in such a way so they are globally available on your system. Let's look at some examples.