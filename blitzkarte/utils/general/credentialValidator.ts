export class CredentialValidator {
  invalidChar: RegExpMatchArray | null;
  invalidStart: RegExpMatchArray | null;
  invalidEnd: RegExpMatchArray | null;
  chainedChar: RegExpMatchArray | null;
  badWords: RegExpMatchArray | null;
  emailValid: RegExpMatchArray | null;

  constructor(input: string) {
    const invalidCharExp = /[^-_a-zA-Z0-9\ ]/g;
    const invalidStartExp = /^[-_\ ]/g;
    const invalidEndExp = /[-_\ ]$/g;
    const chainedCharExp = /  |--|__/g;
    const badWordsExp = /(f|F)(u|U)(c|C)(k|K)|(s|S)(h|H)(i|I)(t|T)/g;
    const emailValidExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

    this.invalidChar = input.match(invalidCharExp);
    this.invalidStart = input.match(invalidStartExp);
    this.invalidEnd = input.match(invalidEndExp);
    this.chainedChar = input.match(chainedCharExp);
    this.badWords = input.match(badWordsExp);
    this.emailValid = input.match(emailValidExp);
  }
}