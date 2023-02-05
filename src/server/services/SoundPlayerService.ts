import { Service, OnInit } from "@flamework/core";
import { Events } from "server/network";

@Service({})
export class SoundPlayerService implements OnInit {
  private readonly soundMap = new Map<string, number[]>([
    ["punchHit", [1193237596]],
  ])

  public onInit(): void {
    Events.playSoundInCharacter.connect((plr, name) => this.playInCharacter(plr, name));
  }

  public playInCharacter(plr: Player, name: string): void {
    task.spawn(() => {
      const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
      const sound = <Sound>char.WaitForChild(name);
      const id = this._getRandomId(name);
      if (!sound || !id) return;

      sound.SoundId = `rbxassetid://${id}`;
      sound.Play();
    });
  }

  private _getRandomId(name: string): number | undefined {
    const ids = this.soundMap.get(name);
    if (!ids) return;
    return ids[(new Random).NextInteger(0, ids.size())];
  }
}
