import * as Expr from "./Expr";

export class AstPrinter implements Expr.Visitor<String> {
  print(expr: Expr.Expr) {
    return expr.accept(this);
  }

  visitBinaryExpr(expr: Expr.Binary) {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  visitGroupingExpr(expr: Expr.Grouping) {
    return this.parenthesize("group", expr.expression);
  }

  visitLiteralExpr(expr: Expr.Literal) {
    return expr.value == null ? "nil" : expr.value.toString();
  }

  visitUnaryExpr(expr: Expr.Unary) {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  private parenthesize(name: string, ...exprs: Expr.Expr[]) {
    const builder = ["(", name];
    exprs.forEach((expr) => {
      builder.push(" ");
      builder.push(expr.accept(this));
    });

    builder.push(")");

    return builder.join("");
  }
}
