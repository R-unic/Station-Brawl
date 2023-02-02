import Roact, { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { tween } from "client/utility";
import Window from "./Window";

const { HorizontalAlignment, SortOrder, EasingStyle } = Enum;

interface Props {
    Title: string;
}

export default function ScrollerWindow(props: PropsWithChildren<Props>) {
    const childrenMap = props[Children];
    const children: Element[] = [];
    childrenMap?.forEach(e => children.push(e));

    const scrollerHoverInfo = new TweenInfo(.3, EasingStyle.Quad);
    return (
        <Window Title={props.Title}>
            <scrollingframe
                Key="List"
                Active={true}
                AnchorPoint={new Vector2(0.5, 1)}
                BackgroundTransparency={1}
                Position={new UDim2(0.5, 0, 1, 0)}
                ScrollBarThickness={14}
                ScrollBarImageTransparency={1}
                Size={new UDim2(1.015, 0, 0.88, 0)}
                BorderSizePixel={0}
                Event={{
                    MouseEnter: f => tween(f, scrollerHoverInfo, { ScrollBarImageTransparency: 0 }),
                    MouseLeave: f => tween(f, scrollerHoverInfo, { ScrollBarImageTransparency: 1 })
                }}
            >
                {...children}
                <uipadding
                    PaddingBottom={new UDim(0.01, 0)}
                    PaddingLeft={new UDim(0.025, 0)}
                    PaddingRight={new UDim(0.025, 0)}
                    PaddingTop={new UDim(0.01, 0)}
                />
                <uigridlayout
                    CellPadding={new UDim2(0, 25, 0, 25)}
                    CellSize={new UDim2(0, 125, 0, 150)}
                    HorizontalAlignment={HorizontalAlignment.Center}
                    SortOrder={SortOrder.LayoutOrder}
                />
            </scrollingframe>
        </Window>
    );
}
