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

  // const peek = this.index++

  //   peep() {
  //     return this.tokens(this.index + 1);
  //   }

  current() {
    return this.tokens[this.index];
  }

  parse(tokens) {
    this.tokens = tokens;
    for (this.index = 0; this.index < tokens.length; this.index++) {
      if (this.current().type == "EOF") {
        // this.expr.push(this.statements());
        console.log("EOF REached")
      } 
      console.log(this.current().type)
    }

    // this.advance()
    // console.log(tokens)
    return this.expr;
  }

  statements() {
    const current = this.current;
    if (current.value == "class") {
      return this.classDeclaration();
    }
  }

  expression() {
    return this.add();
  }

  classDeclaration() {
    this.advance();
    console.log(this.current().type)
    const className = this.current().value;
    if (this.current().type = "LBRACE") {
      this.advance();
    }
    this.advance();
    let methods = [];
    if (
      this.current().type != "RBRACE" &&
      this.tokens[this.index + 1].type != "EOF"
    ) {
      methods.push(this._classMethods);
    }
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
    if (this.current().type != "LBRACE") {
      this.advance();
    }
    return new Method(methodName, type, this.blockStatement());
  }

  blockStatement() {
    this.advance();
    let statements = [];
    if (
      this.current().type != "RBRACE" &&
      this.tokens[this.index + 1].type != "EOF"
    ) {
      statements.push(this.statements());
      this.advance();
    }
    this.advance();
    return [this.statements];
  }
}
exports.Parser = Parser;