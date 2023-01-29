import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { GlobalEvents } from "shared/network";

@Service({})
export class AnimationService implements OnInit {
    private _plrAnimations = new Map<Player, Map<string, Animation>>();

    public onInit(): void {
        GlobalEvents.server.playAnim.connect((plr, name, id) => this._playAnimation(plr, name, id));
        Players.PlayerAdded.Connect(plr =>
            plr.CharacterAdded.Connect(char => {
                const anims = new Map<string, Animation>();
                anims.set("attack", this._createAnimation("attack", char));
                this._plrAnimations.set(plr, anims);
            })
        );
    }

    private _createAnimation(name: string, parent?: Instance): Animation {
        const anim = new Instance("Animation");
        anim.Name = name;
        anim.Parent = parent;
        return anim;
    }

    private _playAnimation(plr: Player, name: string, id: number): void {
        const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
        const hum = <Humanoid>char.WaitForChild("Humanoid");
        const anim = this._plrAnimations.get(plr)?.get(name);
        if (!anim) return warn(`Could not find animation instance "${name}"`);

        anim.AnimationId = `rbxassetid://${id}`;
        const track = hum.LoadAnimation(anim);
        track.Ended.Once(() => track.Destroy());
        track.Play();
    }
}
