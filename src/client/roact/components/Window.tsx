import Roact, { Children, Element, PropsWithChildren, Ref } from "@rbxts/roact";
import { getChildren, tween } from "client/utility";

interface Props {
    Title: string;
}

const { Font, TextXAlignment, EasingStyle } = Enum;

// window icon to left of title
export default function Window(props: PropsWithChildren<Props>) {
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
            Position={new UDim2(0.24, 0, 0.21, 0)}
            Size={new UDim2(0.5, 0, 0.65, 0)}
        >
            {...getChildren(props)}
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
