import Roact, { createRef } from "@rbxts/roact";
import { WINDOW_REFS } from "client/roact/Refs";
import MoneyProductCard from "../../components/MoneyProductCard";
import ListWindow from "../../components/ListWindow";

const ref = createRef<ScreenGui>();
WINDOW_REFS.set("shop", ref);

export const ShopUI = (
    <screengui Ref={ref} Key="Shop" Enabled={false}>
        <ListWindow Title="Purchase Money">
            <MoneyProductCard ItemName="$300" Icon="rbxassetid://46022281" ID={1369201265} />
            <MoneyProductCard ItemName="$650" Icon="rbxassetid://46022281" ID={1369202529} />
            <MoneyProductCard ItemName="$1000" Icon="rbxassetid://46022281" ID={1369203219} />
            <MoneyProductCard ItemName="$2150" Icon="rbxassetid://46022281" ID={1369203784} />
            <MoneyProductCard ItemName="$4500" Icon="rbxassetid://46022281" ID={1369203791} />
            <MoneyProductCard ItemName="$9350" Icon="rbxassetid://46022281" ID={1369203792} />
        </ListWindow>
    </screengui>
);
