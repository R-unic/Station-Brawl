import Roact from "@rbxts/roact";
import { WindowRefs } from "../Refs";

interface Props {
  ButtonName: string;
  Icon: string;
  OnClick: () => void;
}

function SideButton(props: Props) {
  return (
    <imagebutton
      Key={props.ButtonName}
      BackgroundColor3={Color3.fromRGB(255, 255, 255)}
      BackgroundTransparency={0.1}
      Size={new UDim2(0.075, 0, 0.075, 0)}
      Event={{
        MouseEnter: () => { },
        MouseLeave: () => { },
        MouseButton1Click: () => props.OnClick(),
      }}
    >
      <uicorner />
      <uiaspectratioconstraint />
      <uistroke Color={Color3.fromRGB(189, 189, 189)} Thickness={2}>
        <uigradient
          Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(119, 207, 97)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(164, 255, 167)), new ColorSequenceKeypoint(1, Color3.fromRGB(119, 207, 97))])}
          Rotation={-80}
        />
      </uistroke>
      <imagelabel
        Key="Icon"
        Active={true}
        AnchorPoint={new Vector2(0.5, 0.5)}
        BackgroundTransparency={1}
        Image={props.Icon}
        ImageColor3={Color3.fromRGB(69, 85, 76)}
        Position={new UDim2(0.5, 0, 0.5, 0)}
        Selectable={true}
        Size={new UDim2(0.7, 0, 0.7, 0)}
      />
      <uigradient
        Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(144, 255, 119)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(196, 255, 193)), new ColorSequenceKeypoint(1, Color3.fromRGB(144, 255, 119))])}
        Rotation={45}
      />
    </imagebutton>
  );
}

const ButtonsUI = (
  <screengui Key="Buttons">
    <uipadding PaddingLeft={new UDim(0.01, 0)} />
    <SideButton ButtonName="Inventory" Icon="rbxassetid://10723424963" OnClick={() => {
      const inventoryRef = WindowRefs.mustGet("inventory");
      const inventory = inventoryRef.getValue();
      if (inventory)
        inventory.Enabled = !inventory.Enabled;
    }} />
    <SideButton ButtonName="Codes" Icon="rbxassetid://10747374131" OnClick={() => {
      const codesRef = WindowRefs.mustGet("codes");
      const codes = codesRef.getValue();
      if (codes)
        codes.Enabled = !codes.Enabled;
    }} />
    <uilistlayout
      Padding={new UDim(0.01, 0)}
      SortOrder={Enum.SortOrder.LayoutOrder}
      VerticalAlignment={Enum.VerticalAlignment.Center}
    />
  </screengui>
);

export default ButtonsUI;
