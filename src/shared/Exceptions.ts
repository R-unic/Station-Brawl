import { $error } from "rbxts-transform-debug";
import { CaseItemInfo } from "./dataInterfaces/CaseItemInfo";

export class Exception {
    public constructor(
        public readonly message: unknown
    ) {
        throw $error(" " + message as string, 7);
    }
}

export class HttpException extends Exception {
    public constructor(message: unknown) {
        super("HttpException: " + message);
    }
}

export class MissingLootPoolException extends Exception {
    public constructor(_case: CaseItemInfo) {
        super(`MissingLootPoolException: '${_case.name}' case has no defined loot pool. `);
    }
}
