import { Controller } from "@flamework/core";

// code objects with expirations, etc
const VALID_CODES: string[] = ["balls"];

@Controller({})
export class CodeController {
  public claim(code: string): void {
    const valid = VALID_CODES.includes(code);
    if (!valid) return;


  }

  public check(code: string): boolean {
    const valid = VALID_CODES.includes(code);
    if (valid)
      this.claim(code);

    return valid;
  }
}
