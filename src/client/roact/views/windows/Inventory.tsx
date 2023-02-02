import Roact, { createRef } from "@rbxts/roact";
import { WINDOW_REFS } from "client/roact/Refs";
import ListWindow from "../../components/ListWindow";
import InventoryCard from "client/roact/components/InventoryCard";

const ref = createRef<ScreenGui>();
WINDOW_REFS.set("inventory", ref);

export const InventoryUI = (
    <screengui Ref={ref} Key="Inventory" Enabled={false}>
        <ListWindow Title="Inventory">
            <InventoryCard ItemName="test" Icon="rbxassetid://6856899848" />
        </ListWindow>
    </screengui>
);
