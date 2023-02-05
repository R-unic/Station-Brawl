import { CaseItemInfo } from "./dataInterfaces/CaseItemInfo";

export class Exception {
  public constructor(
    public readonly _type: string,
    public readonly message: unknown
  ) {
    throw error(`${_type}Exception: ${message}`, 7);
  }
}

export class HttpException extends Exception {
  public constructor(message: unknown) {
    super("Http", message);
  }
}

export class MissingLootPoolException extends Exception {
  public constructor(_case: CaseItemInfo) {
    super("MissingLootPool", `'${_case.name}' case has no defined loot pool. `);
  }
}
