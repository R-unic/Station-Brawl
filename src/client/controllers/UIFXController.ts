import { Controller, OnInit } from "@flamework/core";
import { Events } from "client/network";
import { getUI, tween } from "client/utility";

const { EasingStyle } = Enum;

@Controller({})
export class UIFXController implements OnInit {
    public onInit(): void {
        Events.toggleCinematicBars.connect(on => this._toggle(on));
        this._toggle(true);
    }

    private _toggle(on: boolean): void {
        const ui = getUI();
        const bars = ui.CinematicBars;
        const topGoal = {Position: new UDim2(0, 0, 0, on ? 0 : -bars.T.Size.Y.Offset)};
        const bottomGoal = {Position: new UDim2(0, 0, 1, on ? 0 : -bars.B.Size.Y.Offset)};
        const info = new TweenInfo(.5, EasingStyle.Quad);
        tween(bars.T, info, topGoal);
        tween(bars.B, info, bottomGoal);
    }
}
