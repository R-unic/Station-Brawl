import { Service, OnInit } from "@flamework/core";
import { GlobalEvents } from "shared/network";

@Service({})
export class SoundPlayerService implements OnInit {
    private readonly _soundMap = new Map<string, number[]>([
        ["punchHit", [1193237596]],
        ["punchSwing", [5835032207]]
    ])

    private _createSound(name: string): Sound | undefined {
        const sound = new Instance("Sound");
        sound.Name = name;

        const ids = this._soundMap.get(name);
        if (!ids) {
            warn(`Could not find sound IDs for "${name}" sound.`);
            return;
        }

        const id = ids[(new Random).NextInteger(0, ids.size())];
        sound.SoundId = `rbxassetid://${id}`;
        sound.Ended.Once(() => sound.Destroy());
        return sound;
    }

    public onInit(): void {
        GlobalEvents.server.playSoundInCharacter.connect((plr, name) => this.playInCharacter(plr, name));
    }

    public playInCharacter(plr: Player, name: string): void {
        const sound = this._createSound(name);
        if (!sound) return;

        const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
        sound.Parent = char;
        sound.Play();
    }
}
