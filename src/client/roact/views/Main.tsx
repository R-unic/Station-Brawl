import Roact from "@rbxts/roact";
import MoneyLabel from "../components/shop/MoneyLabel";
import { ShopUIRef } from "./Shop";

export const MainUI = (
    <screengui Key="Main" ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}>
        <uipadding
            PaddingBottom={new UDim(0, 5)}
            PaddingLeft={new UDim(0, 10)}
            PaddingRight={new UDim(0, 10)}
            PaddingTop={new UDim(0, 5)}
        />
        <MoneyLabel OnPromptAddMoney={() => {
            const shop = ShopUIRef.getValue()!;
            shop.Enabled = !shop.Enabled;
        }}/>
    </screengui>
);
