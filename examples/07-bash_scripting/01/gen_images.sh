#!/bin/bash

set -e
cd "$(dirname "$0")"

bold=`tput bold`
green=`tput setaf 2`
red=`tput setaf 1`
yellow=`tput setaf 3`
reset=`tput sgr0`

processDir="./process-images"
mkdir -p $processDir

report="${processDir}/report.txt"

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

# Create location for exported files
MakeExportDir () {
	exportDirectory="exports"
	exportLocation="${processDir}/${exportDirectory}"
	mkdir -p $exportLocation
}

# Create a report file
MakeReport () {
	touch $report
	# Clear previous report text
	echo "" > $report
}

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

Init () {
	InitConfig
	MakeExportDir
	MakeReport
	Generator
}

Init
