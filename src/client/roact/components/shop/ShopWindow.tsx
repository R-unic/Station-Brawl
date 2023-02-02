import Roact, { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { tween } from "client/utility";

interface Props {
    Title: string;
}

const { Font, HorizontalAlignment, SortOrder, TextXAlignment, EasingStyle } = Enum;

export default function ShopWindow(props: PropsWithChildren<Props>) {
    const childrenMap = props[Children];
    const children: Element[] = [];
    childrenMap?.forEach(e => children.push(e));

    const closeHoverInfo = new TweenInfo(.3, EasingStyle.Quad);
    const defaultCloseColor = Color3.fromRGB(255, 100, 100);
    function hoverClose(btn: TextButton): void {
        tween(btn, closeHoverInfo, { TextColor3: Color3.fromRGB(255, 150, 150) });
    }
    function unhoverClose(btn: TextButton): void {
        tween(btn, closeHoverInfo, { TextColor3: defaultCloseColor });
    }

    return (
        <frame
            Key={props.Title}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BorderSizePixel={0}
            Position={new UDim2(0.23700000000000002, 0, 0.20700000000000002, 0)}
            Size={new UDim2(0.5, 0, 0.65, 0)}
        >
            <uicorner CornerRadius={new UDim(0, 12)} />
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
            >
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(129, 129, 129)), new ColorSequenceKeypoint(1, Color3.fromRGB(255, 255, 255))])}
                    Offset={new Vector2(0, 0.1)}
                    Rotation={-70}
                />
                <uiaspectratioconstraint />
                <uistroke Color={Color3.fromRGB(85, 42, 38)} Thickness={1.6} />
            </textbutton>
            <scrollingframe
                Key="List"
                Active={true}
                AnchorPoint={new Vector2(0.5, 1)}
                BackgroundTransparency={1}
                Position={new UDim2(0.5, 0, 1, 0)}
                ScrollBarThickness={14}
                Size={new UDim2(1.0150000000000001, 0, 0.88, 0)}
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
            <textlabel
                Key="Title"
                BackgroundTransparency={1}
                Font={Font.GothamBold}
                Position={new UDim2(0.01, 0, 0, 0)}
                Size={new UDim2(0.5, 0, 0.085, 0)}
                Text={props.Title}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                TextScaled={true}
                TextWrapped={true}
                TextSize={14}
                TextXAlignment={TextXAlignment.Left}
            >
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(213, 255, 231)), new ColorSequenceKeypoint(1, Color3.fromRGB(193, 255, 243))])}
                    Rotation={110}
                />
                <uistroke Color={Color3.fromRGB(97, 123, 154)} Thickness={1.6} />
            </textlabel>
            <uipadding
                PaddingBottom={new UDim(0.02, 0)}
                PaddingLeft={new UDim(0.017, 0)}
                PaddingRight={new UDim(0.017, 0)}
                PaddingTop={new UDim(0.015, 0)}
            />
            <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(66, 70, 81)), new ColorSequenceKeypoint(1, Color3.fromRGB(42, 45, 52))])}
                Rotation={45}
            />
            <uistroke Color={Color3.fromRGB(212, 212, 212)} Thickness={2} Transparency={0.6} />
            <frame
                Key="Border"
                AnchorPoint={new Vector2(0.5, 0)}
                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                BackgroundTransparency={0.4}
                BorderSizePixel={0}
                Position={new UDim2(0.5, 0, 0.09, 0)}
                Size={new UDim2(1.03, 0, 0, 3)}
            >
                <uigradient
                    Transparency={new NumberSequence([new NumberSequenceKeypoint(0, 1, 0), new NumberSequenceKeypoint(0.5, 0, 0), new NumberSequenceKeypoint(1, 1, 0)])}
                />
            </frame>
        </frame>
    );
}
