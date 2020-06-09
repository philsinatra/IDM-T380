const fs = require('fs')
const path = require('path')
const excelToJson = require('convert-excel-to-json')

const fin = 'example-50.xls'
const fout = 'example-50.json'
const input = path.join(__dirname, `../data/${fin}`)
const output = path.join(__dirname, `../data/${fout}`)

const extractData = new Promise((resolve, reject) => {
  const result = excelToJson({
    sourceFile: input,
    header: { rows: 1 },
    columnToKey: {
      A: 'key',
      B: 'firstName',
      C: 'lastName',
      D: 'gender',
      E: 'country',
      F: 'age',
      G: 'date',
      H: 'id'
    }
  })
  if (result) resolve(result)
  else reject('Data not extracted')
})

const writeJSON = async () => {
  try {
    await extractData
      .then(res => {
        fs.writeFileSync(output, JSON.stringify(res))
      })
      .then(() => {
        console.log('👌 JSON File Created')
      })
  } catch (error) {
    console.error(error)
  }
}

writeJSON()
