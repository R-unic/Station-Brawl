import Roact, { PropsWithChildren } from "@rbxts/roact"
import { getChildren } from "client/utility";

const { FillDirection, SortOrder, HorizontalAlignment, VerticalAlignment, Font } = Enum;

export default function MapVotingModal(props: PropsWithChildren) {
  return (
    <frame
      Key="MapVotingModal"
      AnchorPoint={new Vector2(0.5, 0.5)}
      BackgroundTransparency={1}
      Position={new UDim2(0.5, 0, 0.5, 0)}
      Size={new UDim2(0.45, 0, 0.5, 0)}
    >
      <frame
        Key="Choices"
        AnchorPoint={new Vector2(0.5, 1)}
        BackgroundTransparency={1}
        Position={new UDim2(0.5, 0, 1, 0)}
        Size={new UDim2(1, 0, 0.8, 0)}
      >
        {...getChildren(props)}
        <uilistlayout
          FillDirection={FillDirection.Horizontal}
          HorizontalAlignment={HorizontalAlignment.Center}
          Padding={new UDim(0.035, 0)}
          SortOrder={SortOrder.LayoutOrder}
          VerticalAlignment={VerticalAlignment.Center}
        />
      </frame>
      <textlabel
        Key="Title"
        AnchorPoint={new Vector2(0.5, 0)}
        BackgroundTransparency={1}
        Font={Font.GothamBold}
        Position={new UDim2(0.5, 0, 0, 0)}
        Size={new UDim2(0.75, 0, 0.125, 0)}
        Text="Vote for a Map"
        TextColor3={Color3.fromRGB(245, 245, 245)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
      >
        <uistroke Thickness={2} Transparency={0.5} />
      </textlabel>
    </frame>
  );
}
