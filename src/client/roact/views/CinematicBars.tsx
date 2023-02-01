import Roact, { createRef } from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";
import { StarterGui } from "@rbxts/services";
import { Events } from "client/network";

interface Props {
    InitiallyToggled?: boolean;
}

interface State {
    Toggled: boolean
}

const { CoreGuiType, ScreenInsets } = Enum;

function CinematicBars(props: Props) {
    const [state, setState] = useState<State>({ Toggled: props.InitiallyToggled ?? true });
    useEffect(() => {
        const toggleConnection = Events.toggleCinematicBars.connect(on => {
            StarterGui.SetCoreGuiEnabled(CoreGuiType.PlayerList, !on);
            setState({ Toggled: on })
        });

        return () => toggleConnection.Disconnect();
    }, []);

    const bottom = createRef<Frame>();
    const top = createRef<Frame>();
    return (
        <screengui Key="CinematicBars" ScreenInsets={ScreenInsets.DeviceSafeInsets} DisplayOrder={2}>
            <frame
                Key="B"
                Ref={bottom}
                AnchorPoint={new Vector2(0, 1)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                BorderSizePixel={0}
                Position={new UDim2(0, 0, 1, state.Toggled ? 0 : bottom.getValue()!.Size.Y.Offset)}
                Size={new UDim2(1, 0, 0, 100)}
            />
            <frame
                Key="T"
                Ref={top}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                BorderSizePixel={0}
                Position={new UDim2(0, 0, 0, state.Toggled ? 0 : -bottom.getValue()!.Size.Y.Offset)}
                Size={new UDim2(1, 0, 0, 100)}
            />
        </screengui>
    );
}

export = withHooks(CinematicBars);
