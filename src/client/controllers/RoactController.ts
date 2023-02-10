import { Controller, OnInit } from "@flamework/core";
import { Element, mount } from "@rbxts/roact";
import { Events, Functions } from "client/network";
import { getUI } from "client/utility";

import { WindowRefs } from "client/roact/Refs";
import { ShopUI } from "client/roact/views/windows/Shop";
import { InventoryUI } from "client/roact/views/windows/Inventory";
import MainUI from "client/roact/views/Main";
import ButtonsUI from "client/roact/views/Buttons";
import CinematicBarsUI from "client/roact/views/CinematicBars";
import DailyRewardUI from "client/roact/views/DailyReward";

@Controller({ loadOrder: 0 })
export class RoactController implements OnInit {
  private _mountWindow(window: Element): void {
    mount(window, getUI());
  }

  public onInit(): void {
    const PlayerUI = getUI();
    Events.dataUpdate.connect(key => {
      if (key !== "lastDailyClaim") return;
      Functions.showDailyReward.invoke().then(show => {
        if (!show) return;
        mount(DailyRewardUI, PlayerUI);
      });
    });

    this._mountWindow(ShopUI);
    this._mountWindow(InventoryUI);
    mount(MainUI, PlayerUI);
    mount(ButtonsUI, PlayerUI);
    mount(CinematicBarsUI, PlayerUI);

    Events.initializeData.fire();
    for (const windowRef of WindowRefs.values()) {
      const window = windowRef.getValue();
      if (!window) return;

      window.GetPropertyChangedSignal("Enabled").Connect(() => {
        const on = window.Enabled
        for (const otherRef of WindowRefs.values())
          if (otherRef !== windowRef && on)
            otherRef.getValue()!.Enabled = false;
      });
    }
  }
}
