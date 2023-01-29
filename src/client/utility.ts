import { Players } from "@rbxts/services";

export function getPlayer(): Player {
    return Players.LocalPlayer;
}

export function getCharacter(): Model {
    const plr = getPlayer();
    return plr.Character ?? plr.CharacterAdded.Wait()[0];
}
