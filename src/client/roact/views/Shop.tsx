import Roact, { createRef } from "@rbxts/roact";
import ShopWindow from "../components/shop/ShopWindow";
import MoneyItemFrame from "../components/shop/MoneyItemFrame";

export const ShopUIRef = createRef<ScreenGui>();

export const ShopUI = (
    <screengui Ref={ShopUIRef} Key="Shop" Enabled={false}>
        <ShopWindow Title="Purchase Money">
            <MoneyItemFrame ItemName="$300" Icon="rbxassetid://46022281" ID={1369201265} />
            <MoneyItemFrame ItemName="$650" Icon="rbxassetid://46022281" ID={1369202529} />
            <MoneyItemFrame ItemName="$1000" Icon="rbxassetid://46022281" ID={1369203219} />
            <MoneyItemFrame ItemName="$2150" Icon="rbxassetid://46022281" ID={1369203784} />
            <MoneyItemFrame ItemName="$4500" Icon="rbxassetid://46022281" ID={1369203791} />
            <MoneyItemFrame ItemName="$9350" Icon="rbxassetid://46022281" ID={1369203792} />
        </ShopWindow>
    </screengui>
);
