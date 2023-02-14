import { Controller } from "@flamework/core";

class Redeemable {
  public constructor(
    public readonly code: string,
    public readonly expiration?: DateTime
  ) { }
}

// code objects with expirations, etc
const VALID_CODES: Redeemable[] = [
  new Redeemable("balls", DateTime.fromLocalTime(2023, 2, 14, 12, 12))
];

@Controller({})
export class CodeController {
  public claim(code: string): void {
    const valid = this._isValid(code);
    if (!valid) return;

    print(`claimed '${code}' code`);
  }

  public check(code: string): boolean {
    const valid = this._isValid(code);
    if (valid)
      this.claim(code);

    return valid;
  }

  private _isValid(code: string): boolean {
    const redeemable = VALID_CODES.find(v => v.code === code.lower());
    if (!redeemable) return false;
    if (redeemable.expiration) return redeemable.expiration.UnixTimestamp > DateTime.now().UnixTimestamp;
    return true;
  }
}
