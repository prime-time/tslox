import * as fs from "fs";
import * as readline from "readline";

import { Scanner } from "./Scanner";

export class Lox {
  private static hadError = false;

  static main() {
    const args = process.argv.slice(2);
    if (args.length > 1) {
      console.log("Usage: tslox [script]");
      process.exit(64);
    } else if (args.length === 1) {
      this.runFile(args[0]);
    } else {
      this.runPrompt();
    }
  }

  private static runFile(filepath: string) {
    const fileContents = fs.readFileSync(filepath);
    this.run(fileContents.toString());

    // Indicate an error in thr system code.
    if (Lox.hadError) {
      process.exit(65);
    }
  }

  private static async runPrompt() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // https://stackoverflow.com/questions/8128578/reading-value-from-console-interactively
    const prompt = function prompt() {
      return new Promise<string>((resolve) => {
        rl.question("> ", (answer) => {
          resolve(answer);
        });
      });
    };

    while (true) {
      const line = await prompt();
      if (!line) {
        break;
      }
      this.run(line);
      Lox.hadError = false;
    }

    rl.close();
  }

  private static run(source: string) {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();

    // For now, just print the tokens.
    for (const token of tokens) {
      console.log(token.toString());
    }
  }

  static error(line: number, message: string) {
    this.report(line, "", message);
  }

  private static report(line: number, where: string, message: string) {
    console.error(`[line ${line}] Error${where}: ${message}`);
    Lox.hadError = true;
  }
}
