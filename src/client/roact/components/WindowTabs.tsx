import Roact, { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { getChildren } from "client/utility";

interface Props {
  Size?: UDim2;
  Position?: UDim2;
  AnchorPoint?: Vector2;
}

const { FillDirection, HorizontalAlignment, VerticalAlignment, SortOrder } = Enum;

export default function WindowTabs(props: PropsWithChildren<Props>) {
  return (
    <frame
      Key="Tabs"
      Active={true}
      AnchorPoint={props.AnchorPoint ?? new Vector2(0.5, 1)}
      BackgroundTransparency={1}
      Position={props.Position ?? new UDim2(0.5, 0, 1, 0)}
      Selectable={true}
      Size={props.Size ?? new UDim2(1, 0, 0.1, 0)}
    >
      {...getChildren(props)}
      <uilistlayout
        FillDirection={FillDirection.Horizontal}
        HorizontalAlignment={HorizontalAlignment.Center}
        SortOrder={SortOrder.LayoutOrder}
        VerticalAlignment={VerticalAlignment.Center}
        Padding={new UDim(.025)}
      />
    </frame>
  );
}
