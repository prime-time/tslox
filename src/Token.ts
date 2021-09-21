import { TokenType } from "./TokenType";

export class Token {
  readonly tokenType: TokenType;
  readonly lexeme: string;
  readonly literal: any;
  readonly line: number;

  constructor(tokenType: TokenType, lexeme: string, literal: any, line: number) {
    this.tokenType = tokenType;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `${this.tokenType} ${this.lexeme} ${this.literal}`;
  }
}
