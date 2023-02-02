import Roact from "@rbxts/roact"
import { MarketplaceService as Market } from "@rbxts/services";
import { getPlayer, tween } from "client/utility";
import DropShadow from "../DropShadow";

interface Props {
    ItemName: string;
    Icon: string;
    ID: number;
}

const { Font, SizeConstraint, ScaleType, ApplyStrokeMode, InfoType, EasingStyle } = Enum;

// purchase button animations
export default function MoneyItemFrame(props: Props) {
    let timeout = 0;
    function getRobuxPrice(): number {
        let info: DeveloperProductInfo;
        try {
            info = Market.GetProductInfo(props.ID, InfoType.Product);
        } catch(e) {
            task.wait();
            timeout += 1;
            return timeout >= 5 ? 0 : getRobuxPrice();
        }
        return info.PriceInRobux || 0;
    }

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

    function promptPurchase(): void {
        Market.PromptProductPurchase(getPlayer(), props.ID);
    }

    return (
        <textbutton
            Key={props.ItemName}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            Active={false}
            Selectable={false}
            AutoButtonColor={false}
            Size={new UDim2(0, 100, 0, 100)}
            Text={""}
            Event={{
                MouseEnter: hover,
                MouseLeave: unhover,
                MouseButton1Click: promptPurchase
            }}
        >
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
                ZIndex={2}
            />
            <textlabel
                Key="Info"
                BackgroundColor3={Color3.fromRGB(21, 23, 26)}
                BackgroundTransparency={0.35}
                Font={Font.SourceSansSemibold}
                RichText={true}
                Size={new UDim2(1, 0, 0, 0)}
                Text={`${props.ItemName} | <font color="rgb(75, 255, 75)"><b>R$${getRobuxPrice()}</b></font>`}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                TextScaled={true}
                TextSize={14}
                TextWrapped={true}
            >
                <uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
                <uicorner />
            </textlabel>
            <textbutton
                Key="Purchase"
                AnchorPoint={new Vector2(0, 1)}
                BackgroundColor3={Color3.fromRGB(169, 211, 144)}
                BackgroundTransparency={0.2}
                Font={Font.GothamBold}
                Position={new UDim2(0, 0, 1, 0)}
                Size={new UDim2(1, 0, 0, 30)}
                Text="Purchase"
                TextColor3={Color3.fromRGB(169, 219, 184)}
                TextScaled={true}
                TextWrapped={true}
                AutoButtonColor={false}
                TextSize={14}
                ZIndex={3}
                Event={{
                    MouseButton1Click: promptPurchase
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
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(29, 30, 44)), new ColorSequenceKeypoint(1, Color3.fromRGB(64, 63, 76))])}
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
            >
                <uiaspectratioconstraint />
            </imagelabel>
        </textbutton>
    )
}
