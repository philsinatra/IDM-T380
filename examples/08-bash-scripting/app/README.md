# The Scripts

- [The Scripts](#the-scripts)
	- [bin/config](#binconfig)
	- [bin/bootstrap](#binbootstrap)
	- [bin/clean](#binclean)
	- [bin/setup](#binsetup)
	- [bin/binary-pull](#binbinary-pull)
	- [bin/dev](#bindev)
	- [bin/production](#binproduction)
	- [bin/publish](#binpublish)
	- [bin/binary-push](#binbinary-push)

## bin/config

[bin/config](./bin/config) is used for common, shared configuration variables. In this example, color codes are being stored to help with console messages.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

green=`tput setaf 2`
reset=`tput sgr0`
```

## bin/bootstrap

[bin/bootstrap](./bin/bootstrap) is used solely for fulfilling dependencies of the project.

This can mean RubyGems, npm packages, Homebrew packages, Ruby versions, Git submodules, etc.

The goal is to make sure all required dependencies are installed.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

echo "${green}==> Installing NPM dependencies...${reset}"

npm install
```

## bin/clean

[bin/clean](./bin/clean) is use to remove the `build` directory completely.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

echo "${green}==> Cleaning...${reset}"
rm -rf build
```

## bin/setup

[bin/setup](./bin/setup) is used to prepare for a build. This script:

- verifies dependencies are installed
- cleans any existing `build` content
- pulls binary assets from a remote server
- runs additional scripts required for setup

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

bin/bootstrap

echo "${green}==> Setting up...${reset}"

bin/clean
mkdir -p build
bin/binary-pull
```

## bin/binary-pull

[bin/binary-pull](./bin/binary-pull) is used to pull binary assets from a remote server. This technique is an alternative to Git LFS.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

rsource="/Users/philipsinatra/Desktop/today/server"
dest="./build"

dirs=("fonts" "images")

echo "${green}==> Pulling binary assets...${reset}"

for element in ${dirs[@]}
do
  dir=$element
  echo "rsync from $rsource/$dir"
  echo "        to $dest"
  rsync -razOv --exclude .DS_Store --exclude .git "$rsource/$dir" "$dest/"
done
```

## bin/dev

[bin/dev](./bin/dev) is used to complete a dev build of the project.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

bin/setup

echo "${green}==> Development build...${reset}"
gulp
```

## bin/production

[bin/production](./bin/production) is used to complete a production build of the project.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

bin/setup

echo "${green}==> Production build...${reset}"
gulp --production
```

## bin/publish

[bin/publish](./bin/publish) is used to complete a production build of the project and zip the build contents for final delivery.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

echo "${green}==> Building production files...${reset}"
bin/production
bin/binary-push

echo "${green}==> Zipping production build...${reset}"
zip="zipFileName.zip"

cd ./build
zip -r9 $zip *
mv $zip ~/Desktop/.
cd -

open ~/Desktop
```

## bin/binary-push

[bin/binary-push](./bin/binary-push) is used to push binary assets to a remote server. This technique is an alternative to Git LFS.

```bash
#!/bin/sh

set -e

cd "$(dirname "$0")/.."

. ./bin/config

lsource="./src"
dest="/Users/philipsinatra/Desktop/today/server"

dirs=("fonts" "images")

echo "${green}==> Pushing binary assets...${reset}"

for element in ${dirs[@]}
do
  dir=$element
  echo "rsync from $lsource/$dir"
  echo "        to $dest"
  rsync -razOv --exclude .DS_Store --exclude .git "$lsource/$dir" "$dest/"
done
```