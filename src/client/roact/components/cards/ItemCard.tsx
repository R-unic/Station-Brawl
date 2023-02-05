import Roact, { PropsWithChildren, Ref } from "@rbxts/roact";
import { getChildren, tween } from "client/utility";
import DropShadow from "../DropShadow";

interface Props {
    CardName?: string;
    ItemName: string;
    Icon: string;
    InfoText: string;
    Size?: UDim2;
    Position?: UDim2;
    AnchorPoint?: Vector2;
    PrimaryGradientColor?: Color3;
    SecondaryGradientColor?: Color3;
    ButtonText: string;
    ButtonTextColor: Color3;
    ButtonColor: Color3;
    OnButtonClicked: (card: TextButton) => void;
}

const { Font, SizeConstraint, ScaleType, ApplyStrokeMode, EasingStyle } = Enum;

// card button animations
export default function ItemCard(props: PropsWithChildren<Props>) {
    const hoverInfo = new TweenInfo(.3, EasingStyle.Quad);
    function hover(btn: TextButton): void {
        tween(btn.WaitForChild<ImageLabel>("Glow"), hoverInfo, {
            ImageTransparency: .4
        });
        tween(btn.WaitForChild<TextLabel>("Info"), hoverInfo, {
            BackgroundTransparency: 0.35,
            TextTransparency: 0
        });
    }

    function unhover(btn: TextButton): void {
        tween(btn.WaitForChild<ImageLabel>("Glow"), hoverInfo, {
            ImageTransparency: 1
        });
        tween(btn.WaitForChild<TextLabel>("Info"), hoverInfo, {
            BackgroundTransparency: 1,
            TextTransparency: 1
        });
    }

    return (
        <textbutton
            Key={props.CardName ?? props.ItemName}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            Active={false}
            Selectable={false}
            AutoButtonColor={false}
            Size={props.Size ?? new UDim2(0, 100, 0, 100)}
            Position={props.Position}
            AnchorPoint={props.AnchorPoint}
            Text={""}
            Event={{
                MouseEnter: hover,
                MouseLeave: unhover,
                MouseButton1Click: b => props.OnButtonClicked(b)
            }}
        >
            {...getChildren(props)}
            <uicorner />
            <uistroke ApplyStrokeMode={ApplyStrokeMode.Border} Color={Color3.fromRGB(141, 142, 142)} Thickness={2}>
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(176, 175, 211)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(226, 226, 226)), new ColorSequenceKeypoint(1, Color3.fromRGB(176, 175, 211))])}
                    Rotation={45}
                />
            </uistroke>
            <DropShadow Elevation={2} />
            <imagelabel
                Key="Glow"
                Image="rbxassetid://10924531821"
                ImageTransparency={1}
                BackgroundTransparency={1}
                Size={UDim2.fromScale(1, 1)}
                ZIndex={3}
            />
            <textlabel
                Key="Info"
                BackgroundColor3={Color3.fromRGB(21, 23, 26)}
                BackgroundTransparency={1}
                Font={Font.SourceSansSemibold}
                RichText={true}
                Size={new UDim2(1, 0, 0, 25)}
                Text={props.InfoText}
                TextTransparency={1}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                TextScaled={true}
                TextSize={14}
                TextWrapped={true}
                ZIndex={4}
            >
                <uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
                <uicorner />
            </textlabel>
            <textbutton
                Key={props.ButtonText}
                AnchorPoint={new Vector2(0, 1)}
                BackgroundColor3={props.ButtonColor}
                BackgroundTransparency={0.2}
                Font={Font.GothamBold}
                Position={new UDim2(0, 0, 1, 0)}
                Size={new UDim2(1, 0, 0, 30)}
                Text={props.ButtonText}
                TextColor3={props.ButtonTextColor}
                TextScaled={true}
                TextWrapped={true}
                AutoButtonColor={false}
                TextSize={14}
                ZIndex={4}
                Event={{
                    MouseButton1Click: b => props.OnButtonClicked(b.Parent as TextButton)
                }}
            >
                <uicorner />
                <uipadding
                    PaddingBottom={new UDim(0, 4)}
                    PaddingLeft={new UDim(0, 5)}
                    PaddingRight={new UDim(0, 5)}
                    PaddingTop={new UDim(0, 4)}
                />
                <uistroke
                    ApplyStrokeMode={ApplyStrokeMode.Border}
                    Color={Color3.fromRGB(141, 142, 142)}
                    Thickness={2}
                >
                    <uigradient
                        Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(176, 175, 211)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(226, 226, 226)), new ColorSequenceKeypoint(1, Color3.fromRGB(176, 175, 211))])}
                        Rotation={45}
                    />
                </uistroke>
                <uistroke Color={Color3.fromRGB(65, 81, 93)} Thickness={1.6} />
            </textbutton>
            <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, props.PrimaryGradientColor ?? Color3.fromRGB(29, 30, 44)), new ColorSequenceKeypoint(1, props.SecondaryGradientColor ?? Color3.fromRGB(64, 63, 76))])}
                Rotation={45}
            />
            <imagelabel
                Key="Icon"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image={props.Icon}
                Position={new UDim2(0.5, 0, 0.5, -15)}
                ScaleType={ScaleType.Fit}
                Size={new UDim2(0.65, 0, 0.65, 0)}
                SizeConstraint={SizeConstraint.RelativeYY}
                ZIndex={2}
            >
                <uiaspectratioconstraint />
            </imagelabel>
        </textbutton>
    );
}
