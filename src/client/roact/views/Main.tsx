import Roact from "@rbxts/roact";
import { WindowRefs } from "../Refs";
import MoneyLabel from "../components/MoneyLabel";

export const MainUI = (
    <screengui Key="Main" ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}>
        <uipadding
            PaddingBottom={new UDim(0, 5)}
            PaddingLeft={new UDim(0, 10)}
            PaddingRight={new UDim(0, 10)}
            PaddingTop={new UDim(0, 2)}
        />
        <MoneyLabel
            FrameProperties={{
                AnchorPoint: new Vector2(1, 0),
                Position: new UDim2(.96, 0, 0, 0),
                Size: new UDim2(0.1, 0, 0, 35)
            }}
            OnPromptAddMoney={() => {
                const shopRef = WindowRefs.mustGet("shop");
                const shop = shopRef.getValue()!;
                shop.Enabled = !shop.Enabled;
            }}
        />
    </screengui>
);
