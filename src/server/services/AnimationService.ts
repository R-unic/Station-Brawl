import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { GlobalEvents } from "shared/network";
import ragdoll from "server/utility/ragdoll";
import { Events } from "server/network";

@Service({})
export class AnimationService implements OnInit {
    private _plrAnimations = new Map<Player, Map<string, Animation>>();

    public onInit(): void {
        GlobalEvents.server.playAnim.connect((player, name, id, character?) => this._playAnimation(player, name, id, character));
        Players.PlayerAdded.Connect(player =>
            player.CharacterAdded.Connect(character => {
                const animations = new Map<string, Animation>();
                const create = (name: string) => animations.set(name, this._createAnimation(name, character));
                create("attack");
                create("finisher");
                create("beingFinished");
                this._plrAnimations.set(player, animations);
            })
        );
    }

    private _createAnimation(name: string, parent?: Instance): Animation {
        const animation = new Instance("Animation");
        animation.Name = name;
        animation.Parent = parent;
        return animation;
    }

    private _playAnimation(player: Player, name: string, id: number, character = player.Character ?? player.CharacterAdded.Wait()[0]): void {
        const humanoid = <Humanoid>character.WaitForChild("Humanoid");
        const animation = this._plrAnimations.get(player)?.get(name);
        if (!animation) return warn(`Could not find animation instance "${name}"`);

        animation.AnimationId = `rbxassetid://${id}`;
        const track = humanoid.LoadAnimation(animation);
        track.Ended.Once(() => {
            track.Destroy();
            if (name === "finisher") {
                character.PrimaryPart!.Anchored = false;
                Events.toggleCinematicBars.fire(player, false);
            } else if (name === "beingFinished") {
                character.PrimaryPart!.Anchored = false;
                Events.toggleCinematicBars.fire(player, false);
                task.delay(.25, () => player.LoadCharacter());
            }
        });
        track.Play();
    }
}
