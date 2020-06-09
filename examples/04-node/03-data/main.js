const fs = require('fs')
const data = 'data.json'
const obj = JSON.parse(fs.readFileSync(data, 'utf8'))

for (const entry of obj) {
  console.log(entry.name)
}

let output = ''

for (const entry of obj) {
  output += `
name: ${entry.name}
is ${entry.age} years old and
currently drives a ${entry.car}!
	`
}

const fn = 'output.txt'
fs.writeFile(fn, output, 'utf8', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`${fn} [built]`)
})
