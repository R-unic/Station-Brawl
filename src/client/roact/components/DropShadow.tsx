import Roact, { JsxInstanceProperties, PropsWithChildren, createRef } from "@rbxts/roact";

interface Props {
    Elevation: number;
}

interface State {
    Elevation: number
}

class DropShadow extends Roact.Component<PropsWithChildren<Props>, State> {
    private readonly containerRef = createRef<Frame>();

    public constructor(props: PropsWithChildren<Props>) {
        super(props);
        this.setElevation(this.props.Elevation);
    }

    protected didMount(): void {
        const container = this.containerRef.getValue()!;
        container.GetAttributeChangedSignal("Elevation").Connect(() => this.setElevation(container.GetAttribute("Elevation") as number ?? this.props.Elevation));
    }

    public setElevation(elevation: number): void {
        this.setState({ Elevation: elevation });
    }

    public render(): Roact.Element {
        return (
            <frame
                Ref={this.containerRef}
                Key="ShadowContainer"
                BackgroundTransparency={1}
                Size={new UDim2(1, 0, 1, 0)}
            >
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
                    Position={new UDim2(0.5, 0, 0.5, this.state.Elevation)}
                    ScaleType={Enum.ScaleType.Slice}
                    Size={new UDim2(1, 10 - (this.state.Elevation - 1), 1, 10 - (this.state.Elevation + 1))}
                    SliceCenter={new Rect(10, 10, 118, 118)}
                />
                <imagelabel
                    Key="Ambient"
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    BackgroundTransparency={1}
                    Image="rbxassetid://1316045217"
                    ImageColor3={Color3.fromRGB(0, 0, 0)}
                    ImageTransparency={0.88}
                    Position={new UDim2(0.5, 0, 0.5, this.state.Elevation)}
                    ScaleType={Enum.ScaleType.Slice}
                    Size={new UDim2(1, 9, 1, 7)}
                    SliceCenter={new Rect(10, 10, 118, 118)}
                />
                <uicorner CornerRadius={new UDim(0, 12)} />
            </frame>
        );
    }
}

export = DropShadow
