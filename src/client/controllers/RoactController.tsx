import { Controller, OnStart } from "@flamework/core";
import Roact, { mount } from "@rbxts/roact";
import { getUI } from "client/utility";
import { MainUI } from "client/roact/views/Main";
import CinematicBars from "client/roact/views/CinematicBars";
import { ShopUI } from "client/roact/views/Shop";

@Controller({})
export class RoactController implements OnStart {
    public onStart(): void {
        const PlayerUI = getUI();
        mount(ShopUI, PlayerUI);
        mount(MainUI, PlayerUI);
        mount((<CinematicBars />), PlayerUI);
    }
}
