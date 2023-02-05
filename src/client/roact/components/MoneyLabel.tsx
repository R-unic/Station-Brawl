import Roact from "@rbxts/roact";
import { formatNum } from "@rbxts/number-manipulator";
import { tween } from "client/utility";
import DropShadow from "./DropShadow"
import DataConnectedText from "./DataConnectedText";

interface Props {
    FrameProperties: Partial<WritableInstanceProperties<Frame>>;
    OnPromptAddMoney: (btn: TextButton) => void;
}

const { Font, EasingStyle, TextXAlignment } = Enum;

// color animations for add currency button
export default function MoneyLabel(props: Props) {
    const defaultAddColor = Color3.fromRGB(63, 202, 140);
    const hoverAddInfo = new TweenInfo(.35, EasingStyle.Quad);
    function hoverAdd(btn: TextButton): void {
        const shadowContainer = btn.WaitForChild<Frame>("ShadowContainer");
        shadowContainer.SetAttribute("Elevation", 5);
        tween(btn, hoverAddInfo, { BackgroundColor3: Color3.fromRGB(156, 219, 191)});
    }

    function unhoverAdd(btn: TextButton): void {
        const shadowContainer = btn.WaitForChild<Frame>("ShadowContainer");
        shadowContainer.SetAttribute("Elevation", undefined);
        tween(btn, hoverAddInfo, { BackgroundColor3: defaultAddColor });
    }

    return (
        <frame
            {...props.FrameProperties}
            Key="MoneyLabel"
            BackgroundTransparency={1}
        >
            <frame
                Key="TextContainer"
                AnchorPoint={new Vector2(1, 0.5)}
                BackgroundColor3={Color3.fromRGB(56, 170, 130)}
                Position={new UDim2(1, 0, 0.5, 0)}
                Size={new UDim2(0.98, 0, 0.8, 0)}
            >
                <uicorner CornerRadius={new UDim(0, 12)} />
                <uigradient
                    Transparency={new NumberSequence([new NumberSequenceKeypoint(0, 0, 0), new NumberSequenceKeypoint(0.69, 0.3, 0), new NumberSequenceKeypoint(1, 1, 0)])}
                />
                <uistroke Color={Color3.fromRGB(75, 75, 75)} Thickness={1.4}>
                    <uigradient
                        Transparency={new NumberSequence([new NumberSequenceKeypoint(0, 0, 0), new NumberSequenceKeypoint(0.69, 0.3, 0), new NumberSequenceKeypoint(1, 1, 0)])}
                    />
                </uistroke>
                <DataConnectedText
                    Key="Amount"
                    DataKey="money"
                    InitialText="$10,000"
                    DataMapper={a => "$" + formatNum(a as number)}

                    LabelProperties={{
                        AnchorPoint: new Vector2(1, 0),
                        BackgroundTransparency: 1,
                        Font: Font.GothamBold,
                        Position: new UDim2(0.85, 0, 0, 0),
                        Size: new UDim2(0.6, 0, 1, 0),
                        TextColor3: Color3.fromRGB(166, 241, 220),
                        TextXAlignment: TextXAlignment.Left,
                        TextScaled: true,
                        TextSize: 14,
                        TextWrapped: true,
                    }}
                >
                    <uistroke Color={Color3.fromRGB(123, 171, 86)} Thickness={1.4}>
                        <uigradient
                            Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(147, 147, 147))])}
                            Rotation={90}
                            Transparency={new NumberSequence([new NumberSequenceKeypoint(0, 0, 0), new NumberSequenceKeypoint(0.69, 0.3, 0), new NumberSequenceKeypoint(1, 1, 0)])}
                        />
                    </uistroke>
                </DataConnectedText>
                <uipadding
                    PaddingBottom={new UDim(0.15, 0)}
                    PaddingLeft={new UDim(0.05, 0)}
                    PaddingTop={new UDim(0.15, 0)}
                />
            </frame>
            <textbutton
                Key="AddCurrency"
                AnchorPoint={new Vector2(0, 0.5)}
                BackgroundColor3={defaultAddColor}
                Position={new UDim2(0, 0, 0.5, 0)}
                Size={new UDim2(0.95, 0, 0.95, 0)}
                ZIndex={2}
                AutoButtonColor={false}
                Text=""
                Event={{
                    MouseButton1Click: b => props.OnPromptAddMoney(b),
                    MouseEnter: hoverAdd,
                    MouseLeave: unhoverAdd,
                    MouseButton1Down: unhoverAdd,
                    MouseButton1Up: hoverAdd
                }}
            >
                <DropShadow Elevation={2} />
                <uicorner CornerRadius={new UDim(0, 12)} />
                <uiaspectratioconstraint />
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(184, 230, 201)), new ColorSequenceKeypoint(0.2, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(0.7000000000000001, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(184, 230, 201))])}
                    Rotation={90}
                />
                <uistroke Color={Color3.fromRGB(75, 75, 75)} Thickness={1.4} />
                <imagelabel
                    Key="Icon"
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    BackgroundTransparency={1}
                    Image="rbxassetid://12347375829"
                    ImageColor3={Color3.fromRGB(222, 255, 216)}
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    Size={new UDim2(0.65, 0, 0.65, 0)}
                    ZIndex={3}
                />
            </textbutton>
        </frame>
    );
}
