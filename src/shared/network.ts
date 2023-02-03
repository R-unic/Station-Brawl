import { Networking } from "@flamework/networking";

interface ServerEvents {
    initializeData(): void;
    setData(key: string, value: unknown): void;

    playAnim(name: string, id: number, character?: Model, dontCancel?: boolean): void;
    stopAnim(name: string): void;
    playSoundInCharacter(name: string): void;
    damage(humanoid: Humanoid, amount: number): void;
    anchor(character: Model, on?: boolean, anchorPart?: string): void;
    createBlood(position: Vector3, duration: number): void;
}

interface ClientEvents {
    dataUpdate(key: string, value: unknown): void;
    toggleCinematicBars(on: boolean): void;
    toggleKnockedFX(on: boolean): void;
    shakeCamera(): void;
    finishedEmote(): void;
}

interface ServerFunctions {
    getData(key: string): unknown;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
