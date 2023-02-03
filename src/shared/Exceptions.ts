import { $error } from "rbxts-transform-debug";

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
