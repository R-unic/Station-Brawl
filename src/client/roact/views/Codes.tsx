import { Dependency } from "@flamework/core";
import Roact, { createRef } from "@rbxts/roact"
import { PromoCodeController } from "client/controllers/PromoCodeController";
import { tween } from "client/utility";
import { WindowRefs } from "../Refs";
import CloseButton from "../components/CloseButton";

const { Font, ZIndexBehavior, ApplyStrokeMode, TextTruncate, TextXAlignment, EasingStyle, EasingDirection } = Enum;

const ref = createRef<ScreenGui>();
const inputRef = createRef<TextBox>();
WindowRefs.set("codes", ref);

let claimDb = false;
const defaultInputColor = Color3.fromRGB(255, 255, 255);
const hoverInputInfo = new TweenInfo(.3, EasingStyle.Quad);
function hoverInput(box: TextBox): void {
  tween(box, hoverInputInfo, { BackgroundColor3: Color3.fromRGB(232, 232, 242) });
}
function unhoverInput(box: TextBox): void {
  tween(box, hoverInputInfo, { BackgroundColor3: defaultInputColor });
}

const CodesUI = (
  <screengui Ref={ref} Key="Codes" DisplayOrder={1} ZIndexBehavior={ZIndexBehavior.Sibling} Enabled={false}>
    <frame
      Key="Modal"
      AnchorPoint={new Vector2(0.5, 0.5)}
      BackgroundColor3={Color3.fromRGB(255, 255, 255)}
      Position={new UDim2(0.5, 0, 0.5, 0)}
      Size={new UDim2(0.2, 0, 0.3, 0)}
    >
      <CloseButton
        ParentScreen={() => ref.getValue()!}
        Position={new UDim2(1.05, 0, -0.025, 0)}
        Size={new UDim2(0.125, 0, 0.125, 0)}
        OnClose={() => inputRef.getValue()!.Text = ""}
      />
      <textbox
        Ref={inputRef}
        Key="Input"
        AnchorPoint={new Vector2(0.5, 0.5)}
        BackgroundColor3={defaultInputColor}
        CursorPosition={-1}
        ClearTextOnFocus={false}
        Font={Font.Gotham}
        PlaceholderColor3={Color3.fromRGB(203, 203, 203)}
        PlaceholderText="Type code here..."
        Position={new UDim2(0.5, 0, 0.5, 0)}
        Size={new UDim2(0.65, 0, 0.2, 0)}
        Text={""}
        TextColor3={Color3.fromRGB(232, 232, 232)}
        TextSize={24}
        TextTruncate={TextTruncate.AtEnd}
        TextXAlignment={TextXAlignment.Left}
        Event={{
          MouseEnter: hoverInput,
          MouseLeave: unhoverInput,
          Focused: hoverInput,
          FocusLost: unhoverInput
        }}
      >
        <uicorner />
        <uipadding PaddingLeft={new UDim(0.075, 0)} />
        <uistroke Color={Color3.fromRGB(122, 122, 122)} Thickness={1.5} />
        <uistroke ApplyStrokeMode={ApplyStrokeMode.Border} Color={Color3.fromRGB(100, 113, 120)} Thickness={1.6} />
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
        Size={new UDim2(0.325, 0, 0.125, 0)}
        Text={""}
        TextColor3={Color3.fromRGB(0, 0, 0)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
        Event={{
          MouseButton1Click: async () => {
            if (claimDb) return;
            claimDb = true;

            const inputBox = inputRef.getValue()!;
            const code = inputBox.Text;
            const promoCodes = Dependency<PromoCodeController>();
            promoCodes.check(code).then(valid => {
              inputBox.Text = "";
              if (!valid)
                tween(inputBox, new TweenInfo(.3, EasingStyle.Quint, EasingDirection.Out, 0, true), { BackgroundColor3: Color3.fromRGB(232, 143, 143) })
                  .Completed.Once(() => claimDb = false);
              else
                claimDb = false;
            });
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
        Size={new UDim2(.8, 0, 0.125, 0)}
        Text="Codes"
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
  </screengui >
);

export default CodesUI;
