import { Service, OnInit } from "@flamework/core";
import { StrictMap } from "@rbxts/strict-map";
import { Events } from "server/network";

@Service({})
export class SoundPlayerService implements OnInit {
  private readonly soundMap = new StrictMap<string, number[]>([
    ["punchHit", [1193237596]],
    ["knockout", [8730871251]]
  ])

  public onInit(): void {
    Events.playSoundInCharacter.connect((plr, name, volume) => this.playInCharacter(plr, name, volume));
  }

  public playInCharacter(plr: Player, name: string, volume = 1): void {
    task.spawn(() => {
      const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
      const sound = <Nullable<Sound>>char.WaitForChild(name, 5);
      const id = this._getRandomId(name);
      if (!sound || !id) return;

      sound.SoundId = `rbxassetid://${id}`;
      sound.Volume = volume;
      sound.Play();
    });
  }

  private _getRandomId(name: string): Nullable<number> {
    const ids = this.soundMap.mustGet(name);
    return ids[(new Random).NextInteger(0, ids.size())];
  }
}
