import Roact from "@rbxts/roact";
import { WindowRefs } from "../Refs";
import MoneyLabel from "../components/MoneyLabel";
import RoundTimer from "../components/RoundTimer";

const MainUI = (
  <screengui Key="Main" ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}>
    <uipadding
      PaddingBottom={new UDim(0, 5)}
      PaddingLeft={new UDim(0, 10)}
      PaddingRight={new UDim(0, 10)}
      PaddingTop={new UDim(0, 2)}
    />
    <RoundTimer
      LabelProperties={{
        Name: "Timer",
        AnchorPoint: new Vector2(0.5, 0),
        BackgroundTransparency: 1,
        Font: Enum.Font.Unknown,
        FontFace: new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.Medium, Enum.FontStyle.Normal),
        Position: new UDim2(0.5, 0, 0, 0),
        RichText: true,
        Size: new UDim2(0.25, 0, 0.055, 0),
        Text: '<stroke thickness="1.7" transparency=".4" ><uc>Intermission</uc> <b>|</b> 5:00</stroke>',
        TextColor3: Color3.fromRGB(255, 255, 255),
        TextScaled: true,
        TextSize: 14,
        TextWrapped: true
      }}
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
  </screengui >
);

export default MainUI;
