import Roact, { Element, PropsWithChildren, Ref, createRef } from "@rbxts/roact";
import { getChildren } from "client/utility";
import Window from "./Window";
import tween from "shared/utility/tween";

const { HorizontalAlignment, SortOrder, EasingStyle } = Enum;

type ChildrenLister = ((ref: Ref<ScrollingFrame>) => Element);
interface Props {
  Title: string;
  Screen: Ref<ScreenGui>;
  ListSize?: UDim2;
  ListChildren?: Element | ChildrenLister;
}

export default class ListWindow extends Roact.Component<PropsWithChildren<Props>> {
  private readonly listRef = createRef<ScrollingFrame>();

  public render(): Roact.Element {
    const nullableChildren = typeOf(this.props.ListChildren) === "function" ? (this.props.ListChildren as ChildrenLister)(this.listRef) : this.props.ListChildren as Element | undefined;
    const children = this.props.ListChildren ? [nullableChildren as Element] : [];
    const scrollerHoverInfo = new TweenInfo(.3, EasingStyle.Quad);
    const height = 0.88;
    return (
      <Window Title={this.props.Title} Screen={this.props.Screen}>
        {...getChildren(this.props)}
        <scrollingframe
          Ref={this.listRef}
          Key="List"
          Active={true}
          AnchorPoint={new Vector2(0.5, 1)}
          BackgroundTransparency={1}
          Position={new UDim2(0.5, 0, 1 - (height - (this.props.ListSize?.Y.Scale ?? height)), 0)}
          ScrollBarThickness={14}
          ScrollBarImageTransparency={1}
          Size={this.props.ListSize ?? new UDim2(1.015, 0, height, 0)}
          BorderSizePixel={0}
          Event={{
            MouseEnter: f => tween(f, scrollerHoverInfo, { ScrollBarImageTransparency: 0 }),
            MouseLeave: f => tween(f, scrollerHoverInfo, { ScrollBarImageTransparency: 1 })
          }}
        >
          {...children}
          <uipadding
            PaddingBottom={new UDim(0.01, 0)}
            PaddingLeft={new UDim(0.05, 0)}
            PaddingRight={new UDim(0.05, 0)}
            PaddingTop={new UDim(0.01, 0)}
          />
          <uigridlayout
            CellPadding={new UDim2(0, 40, 0, 40)}
            CellSize={new UDim2(0, 125, 0, 150)}
            HorizontalAlignment={HorizontalAlignment.Left}
            SortOrder={SortOrder.LayoutOrder}
          />
        </scrollingframe>
      </Window>
    );
  }
}
