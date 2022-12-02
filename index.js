const fs = require("fs");

const { Scanner } = require("./scanner.js");
const { Parser } = require("./parser.js");
const { Visitor } = require("./visitor");

const args = process.argv[2];
// problem is parser doesnt works

const buffer = fs.readFileSync(args).toString();
const scanner = Scanner.getInst();
const tokens = scanner.tokenize(buffer);
const parser = Parser.getInst();
const asts = parser.parse(tokens);

// const result = new Visitor().visitStatements(asts);
// fs.writeFileSync("testtranspilled/cls-transpiled.js", result);

const str = `
class Book {
  addBook() {}
  removeBook() {}
  static getOneBook() {}
}
`;

// console.log("Source: ", str);
// console.log("Tokens: ", tokens);
// console.log("ASTs: ", asts);

// console.log("Result: ", result);

// const testresult =  parser.parse("test")
// console.log("test result: ", testresult )
console.log("ASTs: ", asts);