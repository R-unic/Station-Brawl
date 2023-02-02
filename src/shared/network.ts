import { Networking } from "@flamework/networking";

interface ServerEvents {
    playAnim(name: string, id: number, character?: Model): void;
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

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
