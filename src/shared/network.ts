import { Networking } from "@flamework/networking";

interface ServerEvents {
    playAnim(name: string, id: number, character?: Model): void;
    playSoundInCharacter(name: string): void;
    damage(humanoid: Humanoid, amount: number): void;
    createVfx(name: string, pos: Vector3, duration: number): void,
}

interface ClientEvents {
    toggleCinematicBars(on: boolean): void;
}

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
