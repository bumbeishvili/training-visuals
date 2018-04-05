const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()

const getDirectories = source => readdirSync(source)
  .map(name => join(source, name))
  .filter(isDirectory);

var directories = getDirectories("Dashboard");
var difWithFiles = directories.map(dir => {
  return {
    name: dir.split('/')[1],
    files: readdirSync(dir),
    path: dir
  }
});

var result = difWithFiles.map(d => `
# ${d.name}  
${d.files.map(f => `
![](${d.path}/${f})
`).join('')}
`).join('');

var header = difWithFiles.map(d => `
* [${d.name}](#${d.name.toLowerCase()})
`).join('');

result = header + result;

console.log(result);