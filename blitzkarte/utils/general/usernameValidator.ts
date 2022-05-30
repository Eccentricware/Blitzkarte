export class UsernameValidator {
  invalidChar: RegExpMatchArray | null;
  invalidStart: RegExpMatchArray | null;
  invalidEnd: RegExpMatchArray | null;
  chainedChar: RegExpMatchArray | null;
  badWords: RegExpMatchArray | null;

  constructor(username: string) {
    const invalidCharExp = /[^-_a-zA-Z0-9\ ]/g;
    const invalidStartExp = /^[-_\ ]/g;
    const invalidEndExp = /[-_\ ]$/g;
    const chainedCharExp = /(  )|(--)|(__)/g;
    const badWordsExp = /(f|F)(u|U)(c|C)(k|K)|(s|S)(h|H)(i|I)(t|T)/g

    this.invalidChar = username.match(invalidCharExp);
    this.invalidStart = username.match(invalidStartExp);
    this.invalidEnd = username.match(invalidEndExp);
    this.chainedChar = username.match(chainedCharExp);
    this.badWords = username.match(badWordsExp);
  }
}