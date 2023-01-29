import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { ragdoll } from "server/utility";
import { GlobalEvents } from "shared/network";

@Service({})
export class CharacterService implements OnInit {
    public onInit(): void {
        GlobalEvents.server.damage.connect((plr, humanoid, dmg) => this.damage(plr, humanoid, dmg))
        Players.PlayerAdded.Connect(plr => plr.LoadCharacter());
    }

    public damage(plr: Player, humanoid: Humanoid, dmg: number): void {
        if (humanoid.Health <= 0) return;
        humanoid.TakeDamage(dmg);

        if (humanoid.Health > 0) return;
        const char = <Model>humanoid.Parent;
        ragdoll(char);
        task.delay(7, () => {
            if (char.GetAttribute("BeingFinished")) return;
            const enemyPlr = Players.GetPlayerFromCharacter(char);
            enemyPlr?.LoadCharacter();
        });
    }
}
