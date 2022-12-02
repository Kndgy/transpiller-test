const fs = require("fs");

const { Scanner } = require("./scanner.js");
const { Parser } = require("./parser.js");
const { Visitor } = require("./visitor");

const args = process.argv[2];

const buffer = fs.readFileSync(args).toString();
const scanner = Scanner.getInst();
const tokens = scanner.tokenize(buffer);
const parser = Parser.getInst();
const asts = parser.parse(tokens);

const result = new Visitor().visitStatements(asts);
fs.writeFileSync("transpilled/cls-transpiled.js", result);

console.log("Source: ", buffer);
console.log("Tokens: ", tokens);
console.log("ASTs: ", asts);
console.log("Result: ", result);