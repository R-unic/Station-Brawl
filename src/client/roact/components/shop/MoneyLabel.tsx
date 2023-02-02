import Roact, { Ref } from "@rbxts/roact";
import { commaFormat } from "shared/utility/NumberUtil";
import DropShadow from "../DropShadow"
import DataConnectedText from "../DataConnectedText";

interface Props {
    OnPromptAddMoney: (btn: TextButton) => void;
}

export default function MoneyLabel(props: Props) {
    function elevate (btn: GuiButton): void {
        const shadowContainer = btn.WaitForChild<Frame>("ShadowContainer");
        shadowContainer.SetAttribute("Elevation", 5)
    }

    function fall (btn: GuiButton): void {
        const shadowContainer = btn.WaitForChild<Frame>("ShadowContainer");
        shadowContainer.SetAttribute("Elevation", undefined)
    }

    return (
        <frame
            Key="MoneyLabel"
            AnchorPoint={new Vector2(1, 0)}
            BackgroundTransparency={1}
            Position={new UDim2(.96, 0, 0, 0)}
            Size={new UDim2(0.125, 0, 0.06, 0)}
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
                    DataMapper={a => "$" + commaFormat(a as number)}
                    LabelProperties={{
                        AnchorPoint: new Vector2(1, 0),
                        BackgroundTransparency: 1,
                        Font: Enum.Font.Unknown,
                        FontFace: Font.fromEnum(Enum.Font.GothamBold),
                        Position: new UDim2(0.85, 0, 0, 0),
                        Size: new UDim2(0.6, 0, 1, 0),
                        TextColor3: Color3.fromRGB(166, 241, 220),
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
                BackgroundColor3={Color3.fromRGB(63, 202, 140)}
                Position={new UDim2(0, 0, 0.5, 0)}
                Size={new UDim2(0.95, 0, 0.95, 0)}
                ZIndex={2}
                AutoButtonColor={false}
                Text=""
                Event={{
                    MouseButton1Click: b => props.OnPromptAddMoney(b),
                    MouseEnter: elevate,
                    MouseLeave: fall,
                    MouseButton1Down: fall,
                    MouseButton1Up: elevate
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
