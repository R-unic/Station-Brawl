import Roact, { createRef } from "@rbxts/roact";
import MoneyProductCard from "../components/shop/MoneyProductCard";
import ScrollerWindow from "../components/shop/ShopWindow";

export const ShopUIRef = createRef<ScreenGui>();

export const ShopUI = (
    <screengui Ref={ShopUIRef} Key="Shop" Enabled={false}>
        <ScrollerWindow Title="Purchase Money">
            <MoneyProductCard ItemName="$300" Icon="rbxassetid://46022281" ID={1369201265} />
            <MoneyProductCard ItemName="$650" Icon="rbxassetid://46022281" ID={1369202529} />
            <MoneyProductCard ItemName="$1000" Icon="rbxassetid://46022281" ID={1369203219} />
            <MoneyProductCard ItemName="$2150" Icon="rbxassetid://46022281" ID={1369203784} />
            <MoneyProductCard ItemName="$4500" Icon="rbxassetid://46022281" ID={1369203791} />
            <MoneyProductCard ItemName="$9350" Icon="rbxassetid://46022281" ID={1369203792} />
        </ScrollerWindow>
    </screengui>
);
