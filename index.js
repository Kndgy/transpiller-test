class Visitor {
  visitClassDecl(clsDecl){
    let ctx = "function ";
    ctx += clsDecl.clsName;
    ctx += "() {} \n";
    const methods = clsDecl.methods;
    for (const mth of methods){
      ctx += this._visitmethod(mth, clsDecl);
    }
    return ctx;
  }

  _visitmethod(method, cls){
    let ctx = cls.clsName;
    if(method.type == "static") {
      ctx += ".";
      ctx += method.name;
    } else {
      ctx +=".prototype.";
      ctx += method.name;
    }
    ctx += " = function() {";
    for (const bdy of method.body){}
    ctx += "} \n";
    return ctx;
  }
}

class ClassDecl {
  constructor(clsName, methods){
    this.clsName = clsName;
    this.methods = methods;
  }
  visit(visitor){
    return visitor.visitClassDecl(this);
  }
}

class Method {
  constructor(name, type, body){
    this.name = name;
    this.type = type;
    this.body = body;
  }
}

const bookClassDecl = new ClassDecl("Book", 
  [
    new Method("addBook", null, []),
    new Method("removeBook", null, []),
    new Method("getOneBook", "static", []),
]);

console.log(new Visitor().visitClassDecl(bookClassDecl))

/*

*/

const operators = ["=", "+", "-", "*", "/", ">", "<", ">=", "<=", "==", "!="];
const keywords = ["class", "function", "prototype", "static", "var", "typeof"];

function isNum(a) {
  return !isNaN(parseFloat(a))
}

function isAlpha(str) {
  return (str > "a" && str <= "z" || (str >= "A" && str <= "Z" || str == "_"));
}

function isDigit(str) {
  return (str >= "0" && str <= "9");
}

function  isAlphaNumeric(str) {
  return isAlpha(str) || isDigit(str);
}

function isKeyword(a) {
  for (let index = 0; index < keywords.length; index++) {
    if (keywords[index] == a){
      return true;
    }
  }
  return false;
}

function isOp(a) {
  for (let index = 0; index < operators.length; index++) {
    if(operators[index] == a){
      return true;
    }
  }
  return false;
}

class Scanner {
  constructor() {
    this.inst = null;

    this.tokens = [];
  }

  static getInst() {
    if (!this.inst) this.inst = new Scanner();
    return this.inst;
  }

  tokenize(str) {

    var s = "";

    for (let index = 0; index < str.length; index++) {
      s += str[index];

      s = s.trim();

      const peek = str[index + 1];

      console.log("s:", s, " str:", str[index]);

      if (isNum(s.trim()) && !isNum(peek)) {
        this.tokens.push({ type: "NUM", value: s.trim() });

        s = "";

        continue;
      }

      if (s.trim() == "(" || s.trim() == ")") {
        s.trim() == "(" ? this.tokens.push({ type: "LPAREN" }) : this.tokens.push({ type: "RPAREN" });

        s = "";

        continue;
      }

      if (s.trim() == "{" || s.trim() == "}") {
        s.trim() == "{" ? this.tokens.push({ type: "LBRACE" }) : this.tokens.push({ type: "RBRACE" });

        s = "";

        continue;
      }

      if (isAlphaNumeric(s.trim()) && !isAlphaNumeric(peek)) {
        if (isKeyword(s.trim())){
          this.tokens.push({ type: "KEYWORD", value: s });
        }else{
          this.tokens.push({ type: "IDENTIFIER", value: s });
        }

        s = "";

        continue;
      }

      if (isOp(s.trim()) && !isOp(peek)) {
        this.tokens.push({ type: "OP", value: s.trim() });

        s = "";

        continue;
      }

      if (s == ";" || s == "\n") {
        this.tokens.push({ type: "EOL" });

        s = "";

        continue;
      }
    }

    this.tokens.push({ type: "EOF" });

    return this.tokens;
  }
}

const str = `
  class Book {
    addBook() {}
    removeBook() {}
    static getOneBook() {}
  }
`;

const scanner = Scanner.getInst();
const tokens = scanner.tokenize(str);
console.log(tokens);