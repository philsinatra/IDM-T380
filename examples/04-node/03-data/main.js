{
  const fs = require('fs');
  const sourceData = 'data.json';
  const obj = JSON.parse(fs.readFileSync(sourceData, 'utf8'));

  for (const entry of obj) {
    console.log(entry.name);
  }

  let output = '';

  for (const entry of obj) {
    output += `
name: ${entry.name}
is ${entry.age} years old and
currently drives a ${entry.car}
		`;
  }

  fs.writeFile('output.txt', output, 'utf8', err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File created and updated');
  });
}
