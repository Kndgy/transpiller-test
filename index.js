class Book {
  addBook() {}
  removeBook() {}
  static getOneBook() {}
}

Book.prototype.addBook = function () {};

Book.prototype.removeBook = function () {};

Book.getOneBook = function () {};

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

class Visitor {
  visitClassDecl(clsDecl){
    let ctx = "function";
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

const bookClassDecl = new ClassDecl("Book", [
  new Method("addBook", null, []),
  new Method("removeBook", null, []),
  new Method("getOneBook", "static", []),
]);

console.log(new Visitor().visitClassDecl(bookClassDecl))