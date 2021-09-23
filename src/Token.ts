import { TokenType } from "./TokenType";

export class Token {
  readonly type: TokenType;
  readonly lexeme: string;
  readonly literal: any;
  readonly line: number;

  constructor(tokenType: TokenType, lexeme: string, literal: any, line: number) {
    this.type = tokenType;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
