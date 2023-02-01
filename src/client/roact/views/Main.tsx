import Roact from "@rbxts/roact";
import MoneyLabel from "../components/MoneyLabel";

const MainUI = (
    <screengui Key="Main" ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}>
        <uipadding
            PaddingBottom={new UDim(0, 15)}
            PaddingLeft={new UDim(0, 10)}
            PaddingRight={new UDim(0, 10)}
            PaddingTop={new UDim(0, 15)}
        />
        <MoneyLabel OnPromptAddMoney={() => {
            print("open shop")
        }}/>
    </screengui>
);

export = MainUI;
