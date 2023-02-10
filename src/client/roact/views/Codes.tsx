import Roact, { createRef } from "@rbxts/roact"
import { WindowRefs } from "../Refs";
import { tween } from "client/utility";

const { Font, ZIndexBehavior, ApplyStrokeMode, EasingStyle } = Enum;

const ref = createRef<ScreenGui>();
WindowRefs.set("codes", ref);

const closeHoverInfo = new TweenInfo(.3, EasingStyle.Quad);
const defaultCloseColor = Color3.fromRGB(255, 100, 100);
function hoverClose(btn: TextButton): void {
  tween(btn, closeHoverInfo, { TextColor3: Color3.fromRGB(255, 150, 150) });
}
function unhoverClose(btn: TextButton): void {
  tween(btn, closeHoverInfo, { TextColor3: defaultCloseColor });
}

const CodesUI = (
  <screengui Ref={ref} Key="Codes" DisplayOrder={1} ZIndexBehavior={ZIndexBehavior.Sibling} Enabled={false}>
    <frame
      Key="Modal"
      AnchorPoint={new Vector2(0.5, 0.5)}
      BackgroundColor3={Color3.fromRGB(255, 255, 255)}
      Position={new UDim2(0.5, 0, 0.5, 0)}
      Size={new UDim2(0.4, 0, 0.4, 0)}
    >
      <textbutton
        Key="Close"
        AnchorPoint={new Vector2(1, 0)}
        BackgroundTransparency={1}
        Font={Font.FredokaOne}
        Position={new UDim2(1, 0, 0, 0)}
        Size={new UDim2(0.09, 0, 0.09, 0)}
        Text="X"
        TextColor3={defaultCloseColor}
        TextScaled={true}
        TextWrapped={true}
        TextSize={40}
        Event={{
          MouseEnter: hoverClose,
          MouseLeave: unhoverClose,
          MouseButton1Click: b => (b.Parent!.Parent! as ScreenGui).Enabled = false
        }}
      ></textbutton>
      <textbox
        Key="Input"
        PlaceholderText="Type code here..."
        Size={UDim2.fromScale(.35, .35)}
        AnchorPoint={new Vector2(0.5, 0.5)}
        Position={UDim2.fromScale(.5, .5)}
      >
        <uicorner />
      </textbox>
      <uicorner CornerRadius={new UDim(0, 14)} />
      <uistroke Color={Color3.fromRGB(158, 158, 158)} Thickness={3}>
        <uigradient
          Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(248, 225, 180)), new ColorSequenceKeypoint(1, Color3.fromRGB(189, 174, 139))])}
          Rotation={-45}
        />
      </uistroke>
      <textbutton
        Key="Claim"
        AnchorPoint={new Vector2(0.5, 1)}
        AutoButtonColor={false}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        Font={Font.Unknown}
        Position={new UDim2(0.5, 0, 1, 0)}
        Size={new UDim2(0.4, 0, 0.1, 0)}
        Text={""}
        TextColor3={Color3.fromRGB(0, 0, 0)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
        Event={{
          MouseButton1Click: () => {

          }
        }}
      >
        <uicorner />
        <uistroke
          ApplyStrokeMode={ApplyStrokeMode.Border}
          Color={Color3.fromRGB(158, 158, 158)}
          Thickness={1.8}
        >
          <uigradient
            Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(170, 255, 127)), new ColorSequenceKeypoint(1, Color3.fromRGB(143, 255, 162))])}
            Rotation={-45}
          />
        </uistroke>
        <uipadding
          PaddingBottom={new UDim(0.1, 0)}
          PaddingLeft={new UDim(0.1, 0)}
          PaddingRight={new UDim(0.1, 0)}
          PaddingTop={new UDim(0.1, 0)}
        />
        <textlabel
          Key="Text"
          Active={true}
          AnchorPoint={new Vector2(0.5, 1)}
          BackgroundTransparency={1}
          Font={Font.Ubuntu}
          Position={new UDim2(0.5, 0, 1, 0)}
          Selectable={true}
          Size={new UDim2(1, 0, 1, 0)}
          Text="Claim"
          TextColor3={Color3.fromRGB(240, 254, 255)}
          TextScaled={true}
          TextSize={14}
          TextWrapped={true}
        >
          <uistroke Color={Color3.fromRGB(71, 106, 53)} Thickness={1.5} />
        </textlabel>
        <uigradient
          Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(170, 255, 127)), new ColorSequenceKeypoint(1, Color3.fromRGB(143, 255, 162))])}
          Rotation={45}
        />
      </textbutton>
      <textlabel
        Key="Title"
        AnchorPoint={new Vector2(0.5, 0)}
        BackgroundTransparency={1}
        Font={Font.GothamBlack}
        Position={new UDim2(0.5, 0, 0, 0)}
        Size={new UDim2(1, 0, 0.15, 0)}
        Text="Daily Reward"
        TextColor3={Color3.fromRGB(252, 252, 252)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
      >
        <uistroke Color={Color3.fromRGB(100, 94, 70)} Thickness={1.8} />
      </textlabel>
      <uipadding
        PaddingBottom={new UDim(0.05, 0)}
        PaddingLeft={new UDim(0.075, 0)}
        PaddingRight={new UDim(0.075, 0)}
        PaddingTop={new UDim(0.05, 0)}
      />
      <uigradient
        Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(248, 225, 180)), new ColorSequenceKeypoint(1, Color3.fromRGB(189, 174, 139))])}
        Rotation={45}
      />
    </frame>
  </screengui>
);

export default CodesUI;
