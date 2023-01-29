import { Service, OnInit } from "@flamework/core";
import { GlobalEvents } from "shared/network";

@Service({})
export class SoundPlayerService implements OnInit {
    private readonly _soundMap = new Map<string, number[]>([
        ["punchHit", [1193237596]],
    ])

    private getRandomId(name: string): number | undefined {
        const ids = this._soundMap.get(name);
        if (!ids) return;
        return ids[(new Random).NextInteger(0, ids.size())];
    }

    public onInit(): void {
        GlobalEvents.server.playSoundInCharacter.connect((plr, name) => this.playInCharacter(plr, name));
    }

    public playInCharacter(plr: Player, name: string): void {
        task.spawn(() => {
            const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
            let sound = <Sound>char.WaitForChild(name);
            const id = this.getRandomId(name);
            if (!sound || !id) return;

            // sound.SoundId = `rbxassetid://${id}`;
            sound.Play();
        });
    }
}
