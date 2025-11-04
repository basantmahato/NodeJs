const path = require ('path')

console.log(__filename)
console.log(__dirname)


const filePath = path.join("folder","students", "test.txt")
console.log(filePath)

const parsedData = path.parse(filePath)
const resolvedPath = path.resolve(filePath)
const extName = path.extname(filePath)
const basename = path.basename(filePath)
const dirname = path.dirname(filePath)


console.log(parsedData)
console.log(resolvedPath)
console.log(extName)
console.log(basename)
console.log(dirname)

console.log(path.sep)