import { Controller, OnInit } from "@flamework/core";
import { StarterGui } from "@rbxts/services";
import { Events } from "client/network";
import { getUI, tween } from "client/utility";

const { EasingStyle, CoreGuiType } = Enum;

@Controller({})
export class UIFXController implements OnInit {
    public onInit(): void {
        Events.toggleCinematicBars.connect(on => this._toggle(on));
    }

    private _toggle(on: boolean): void {
        const ui = getUI();
        const bars = ui.WaitForChild("CinematicBars");
        const topGoal = {Position: new UDim2(0, 0, 0, (on ? 0 : -bars.T.Size.Y.Offset) - 50)};
        const bottomGoal = {Position: new UDim2(0, 0, 1, on ? 0 : -bars.B.Size.Y.Offset)};
        const info = new TweenInfo(.5, EasingStyle.Quad);
        tween(bars.T, info, topGoal);
        tween(bars.B, info, bottomGoal);

        StarterGui.SetCoreGuiEnabled(CoreGuiType.PlayerList, !on);
    }
}
