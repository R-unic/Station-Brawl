import { Players, TweenService } from "@rbxts/services";

export function tween<T extends Instance>(instance: T, info: TweenInfo, goal: Partial<ExtractMembers<T, Tweenable>>): Tween {
    const t = TweenService.Create(instance, info, goal);
    t.Play();
    return t;
}

export function getUI(): PlayerGui {
    return <PlayerGui>getPlayer().WaitForChild("PlayerGui");
}

export function getPlayer(): Player {
    return Players.LocalPlayer;
}

export function getCharacter(): Model {
    const plr = getPlayer();
    return plr.Character ?? plr.CharacterAdded.Wait()[0];
}
