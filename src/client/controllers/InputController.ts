import { Controller, OnInit } from "@flamework/core";
import { ContextActionService as Action } from "@rbxts/services";

import { Events } from "client/network";
import { WindowRefs } from "client/roact/Refs";
import { CombatController } from "./CombatController";
import { EmoteController } from "./EmoteController";

const { UserInputState, UserInputType, KeyCode: Key } = Enum;

@Controller({})
export class InputController implements OnInit {
  public constructor(
    public combat: CombatController,
    public emote: EmoteController
  ) { }

  private _handleAction(action: string, io: InputObject): void {
    switch (action) {
      case "Attack":
        if (io.UserInputState !== UserInputState.Begin) break;
        this.combat.attack();
        break;
      case "Emote":
        if (io.UserInputState !== UserInputState.Begin) break;
        if (this.emote.emoting)
          Events.stopAnim.fire("emote");
        else
          this.emote.play(12352065254);
        break;
      case "OpenInventory":
        if (io.UserInputState !== UserInputState.Begin) break;
        const inventoryRef = WindowRefs.mustGet("inventory");
        const inventory = inventoryRef.getValue()!;
        inventory.Enabled = !inventory.Enabled
    }
  }

  public onInit(): void {
    const handle = (action: string, _: Enum.UserInputState, io: InputObject): void => this._handleAction(action, io);
    Action.BindAction("Attack", handle, true, UserInputType.MouseButton1);
    Action.BindAction("Emote", handle, true, Key.F);
    Action.BindAction("OpenInventory", handle, true, Key.Y);
  }
}
