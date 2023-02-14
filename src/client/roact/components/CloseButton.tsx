import Roact from "@rbxts/roact";
import { tween } from "client/utility";

interface Props {
  ParentScreen: (btn: TextButton) => ScreenGui | ScreenGui;
  AnchorPoint?: Vector2;
  Size?: UDim2;
  Position?: UDim2;
}

const { EasingStyle, Font } = Enum;

export default function CloseButton(props: Props) {
  const hoverInfo = new TweenInfo(.3, EasingStyle.Quad);
  const defaultColor = Color3.fromRGB(255, 100, 100);
  function hover(btn: TextButton): void {
    tween(btn, hoverInfo, { TextColor3: Color3.fromRGB(255, 150, 150) });
  }
  function unhover(btn: TextButton): void {
    tween(btn, hoverInfo, { TextColor3: defaultColor });
  }

  return (
    <textbutton
      Key="Close"
      AnchorPoint={props.AnchorPoint ?? new Vector2(1, 0)}
      BackgroundTransparency={1}
      Font={Font.FredokaOne}
      Position={props.Position ?? new UDim2(1, 0, 0, 0)}
      Size={props.Size ?? new UDim2(0.09, 0, 0.09, 0)}
      Text="X"
      TextColor3={defaultColor}
      TextScaled={true}
      TextWrapped={true}
      TextSize={40}
      Event={{
        MouseEnter: hover,
        MouseLeave: unhover,
        MouseButton1Click: b => (typeOf(b) === "function" ? props.ParentScreen(b) : props.ParentScreen as unknown as ScreenGui).Enabled = false
      }}
    >
      <uigradient
        Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(129, 129, 129)), new ColorSequenceKeypoint(1, Color3.fromRGB(255, 255, 255))])}
        Offset={new Vector2(0, 0.1)}
        Rotation={-70}
      />
      <uiaspectratioconstraint />
      <uistroke Color={Color3.fromRGB(85, 42, 38)} Thickness={1.6} />
    </textbutton>
  );
}
