import Roact, { createRef } from "@rbxts/roact";
import { WINDOW_REFS } from "client/roact/Refs";
import ScrollerWindow from "../../components/ScrollerWindow";

const ref = createRef<ScreenGui>();
WINDOW_REFS.set("inventory", ref);

export const InventoryUI = (
    <screengui Ref={ref} Key="Inventory" Enabled={false}>
        <ScrollerWindow Title="Inventory">

        </ScrollerWindow>
    </screengui>
);
