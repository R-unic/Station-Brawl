import { Controller, OnInit } from "@flamework/core";
import { Events } from "client/network";
import { getCharacter } from "client/utility";

@Controller({})
export class EmoteController implements OnInit {
  public emoting = false;
  private character = getCharacter();

  public onInit(): void {
    Events.finishedEmote.connect(() => {
      task.delay(3, () => this.emoting = false);
      Events.anchor.fire(this.character, false, "HumanoidRootPart");
    });
  }

  public play(id: number): void {
    if (this.emoting) return;
    this.emoting = true;

    Events.anchor.fire(this.character, true, "HumanoidRootPart");
    Events.playAnim.fire("emote", id);
  }
}
