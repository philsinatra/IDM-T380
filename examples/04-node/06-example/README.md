# Node.js Example

The goal of the script is to convert the XLSX to JSON via a script so no one has to manually type the data from the spreadsheet into a format we can use in a web application.

- [Node.js Example](#nodejs-example)
  - [Create app folder structure](#create-app-folder-structure)
  - [Add NPM dependency](#add-npm-dependency)
  - [Write extraction script](#write-extraction-script)
  - [Write JSON file](#write-json-file)
  - [Define input/output in terminal](#define-inputoutput-in-terminal)

## Create app folder structure

```bash
mkdir -p scripts data
touch scripts/xlsx-json.js
npm init -y
```

Add example `example-50.xls` to `data` folder.

```javascript
const path = require('path')

const fin = 'example-50.xls'
const input = path.join(__dirname, `../data/${fin}`)

console.log(input)
```

## Add NPM dependency

- [https://www.npmjs.com/package/convert-excel-to-json](https://www.npmjs.com/package/convert-excel-to-json)

```bash
npm i --save-dev convert-excel-to-json
```

```diff
const path = require('path')
+ const excelToJson = require('convert-excel-to-json')
```

## Write extraction script

```javascript
const extractData = new Promise((resolve, reject) => {
  const result = excelToJson({
    sourceFile: input
  })
  if (result) resolve(result)
  else reject('Data not extracted')
})

const writeJSON = async () => {
  try {
    await extractData
      .then(res => {
        console.log(res)
      })
  } catch (error) {
    console.error(error)
  }
}

writeJSON()
```

## Write JSON file

```diff
+ const fs = require('fs')
const path = require('path')
const excelToJson = require('convert-excel-to-json')
```

```diff
```javascript
const path = require('path')

const fin = 'example-50.xls'
+ const fout = 'example-50.json'
const input = path.join(__dirname, `../data/${fin}`)
+ const output = path.join(__dirname, `../data/${fout}`)

- console.log(input)
```

```diff
const writeJSON = async () => {
  try {
    await extractData
      .then(res => {
-       console.log(res)
+       fs.writeFileSync(output, JSON.stringify(res))
      })
  } catch (error) {
    console.error(error)
  }
}
```

## Customize JSON output

```diff
const extractData = new Promise((resolve, reject) => {
  const result = excelToJson({
-   sourceFile: input
+   sourceFile: input,
+   header: { rows: 1 }
  })
  if (result) resolve(result)
  else reject('Data not extracted')
})
```

```diff
const extractData = new Promise((resolve, reject) => {
  const result = excelToJson({
    sourceFile: input,
-   header: { rows: 1 }
+   header: { rows: 1 },
+   columnToKey: {
+     A: 'key',
+     B: 'firstName',
+     C: 'lastName',
+     D: 'gender',
+     E: 'country',
+     F: 'age',
+     G: 'date',
+     H: 'id'
+   }
  })
  if (result) resolve(result)
  else reject('Data not extracted')
})
```

## Define input/output in terminal

Next we could customize our script to accept input and output values from the command line to specify the `fin` and `fout` variables. We're not going to build that out now. This is meant to give you an example of a simple Node script and how this topic can be used to modernize your workflow.
