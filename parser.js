const { ClassDecl, Method } = require("./ast.js");

class Parser {
  constructor() {
    this.inst = null;
    this.index = 0;
    this.tokens = [];
    this.expr = [];
  }

  static getInst() {
    if (!this.inst) this.inst = new Parser();
    return this.inst;
  }

  advance() {
    this.index++;
  }

  current() {
    return this.tokens[this.index];
  }

  parse(tokens) {
    this.tokens = tokens;

    if (this.current().type != "EOF") {
      this.expr.push(this.statements());
    } 

    return this.expr;
  }

    statements() {
      // console.log(this.current().value)
      //class, function constructor. clsname, methods
      // if (this.current().value == "class") {
        return this.classDeclaration();
      // }
    }

  classDeclaration() {
    this.advance();
    const className = this.current().value;
    while (this.current().type != "LBRACE") {
      this.advance();
    }
    this.advance();
    let methods = [];
    while (this.current().type != "RBRACE" && this.tokens[this.index].type != "EOF") {
      methods.push(this._classMethods());
    }
    // console.log(methods);
    this.advance();
    return new ClassDecl(className, methods);
  }

  _classMethods() {
    let type = null;
    if (this.current().value == "static") {
      type = this.current().value;
      this.advance();
    }
    let methodName = this.current().value;

    this.advance();
    while (this.current().type != "LBRACE") {
      this.advance();
    }

    return new Method(methodName, type, this.blockStatement());
  }

  blockStatement() {
    this.advance();
    // let statements = [];
    // while (this.current().type != "RBRACE" && this.tokens[this.index].type != "EOF") {
    //   statements.push(this.statements());
      this.advance();
    // }
    this.advance();
    return [this.expr];
  }
}
exports.Parser = Parser;

//might want to convert to for loops than using bunch of while