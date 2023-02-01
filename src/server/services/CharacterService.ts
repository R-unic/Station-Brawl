import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { randomElement } from "shared/utility/ArrayUtil";
import ragdoll from "server/utility/ragdoll";

@Service({})
export class CharacterService implements OnInit {
    private readonly animations = {
        "finishers": [[12296520631, 12296522679]] // killer, victim
    };

    public onInit(): void {
        Events.damage.connect((player, humanoid, dmg) => this.damage(player, humanoid, dmg))
        Players.PlayerAdded.Connect(player => player.LoadCharacter());
    }

    public damage(player: Player, humanoid: Humanoid, dmg: number): void {
        if (humanoid.Health <= 0) return;
        humanoid.TakeDamage(dmg);

        if (humanoid.Health > 0) return;
        this._kill(player, humanoid);
    }

    private _kill(killer: Player, victimHumanoid: Humanoid) {
        let conn: RBXScriptConnection
        let victimCharacter = <Model>victimHumanoid.Parent;
        const victim = Players.GetPlayerFromCharacter(victimCharacter);
        ragdoll(victimCharacter);

        if (victim) {
            const finishPrompt = new Instance("ProximityPrompt");
            finishPrompt.ActionText = "Finish";
            finishPrompt.ObjectText = victimCharacter.Name;
            finishPrompt.HoldDuration = .6;
            finishPrompt.KeyboardKeyCode = Enum.KeyCode.E;
            finishPrompt.GamepadKeyCode = Enum.KeyCode.ButtonX;
            finishPrompt.Enabled = true;
            finishPrompt.Parent = victimCharacter.PrimaryPart!;
            conn = finishPrompt.Triggered.Once(player => {
                if (player !== killer) return;
                victim.SetAttribute("BeingFinished", true);
                victim.LoadCharacter();

                victimCharacter = victim.Character!;
                victimCharacter.PrimaryPart!.Anchored = true;
                killer.Character!.PrimaryPart!.Anchored = true;

                const negativeDistance = killer.Character!.PrimaryPart!.CFrame.LookVector.mul(.65);
                victimCharacter.PrimaryPart!.CFrame = killer.Character!.PrimaryPart!.CFrame.add(killer.Character!.PrimaryPart!.CFrame.LookVector.sub(negativeDistance));

                Events.toggleCinematicBars.fire([killer, victim], true);
                const [ killerAnimationID, victimAnimationID ] = randomElement(this.animations.finishers);
                Events.playAnim.predict(killer, "finisher", killerAnimationID);
                Events.playAnim.predict(victim, "beingFinished", victimAnimationID, victimCharacter);
            });
        }

        task.delay(7, () => {
            if (victim?.GetAttribute("BeingFinished")) return;
            conn?.Disconnect();
            victim?.LoadCharacter();
            if (!victim)
                victimCharacter.Destroy();
        });
    }
}
