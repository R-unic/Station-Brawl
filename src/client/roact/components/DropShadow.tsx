import Roact, { PropsWithChildren } from "@rbxts/roact";

interface Props {
    Elevation: number;
}

export default function DropShadow(props: PropsWithChildren<Props>) {
    return (
        <frame Key="ShadowContainer" BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
            <imagelabel
                Key="Umbra"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://1316045217"
                ImageColor3={Color3.fromRGB(0, 0, 0)}
                ImageTransparency={0.86}
                Position={new UDim2(0.5, 0, 0.5, 2)}
                ScaleType={Enum.ScaleType.Slice}
                Size={new UDim2(1, 9, 1, 7)}
                SliceCenter={new Rect(10, 10, 118, 118)}
            />
            <imagelabel
                Key="Penumbra"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://1316045217"
                ImageColor3={Color3.fromRGB(0, 0, 0)}
                ImageTransparency={0.88}
                Position={new UDim2(0.5, 0, 0.5, props.Elevation)}
                ScaleType={Enum.ScaleType.Slice}
                Size={new UDim2(1, 10 - (props.Elevation - 1), 1, 10 - (props.Elevation + 1))}
                SliceCenter={new Rect(10, 10, 118, 118)}
            />
            <imagelabel
                Key="Ambient"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://1316045217"
                ImageColor3={Color3.fromRGB(0, 0, 0)}
                ImageTransparency={0.88}
                Position={new UDim2(0.5, 0, 0.5, props.Elevation)}
                ScaleType={Enum.ScaleType.Slice}
                Size={new UDim2(1, 9, 1, 7)}
                SliceCenter={new Rect(10, 10, 118, 118)}
            />
            <uicorner CornerRadius={new UDim(0, 12)} />
        </frame>
    );
}
