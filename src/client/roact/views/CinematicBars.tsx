import { StarterGui } from "@rbxts/services";
import { Janitor } from "@rbxts/janitor";

import Roact, { createRef } from "@rbxts/roact";
import { Events } from "client/network";
import tween from "shared/utility/tween";

interface Props {
  InitiallyToggled?: boolean;
}

const { CoreGuiType, ScreenInsets, EasingStyle } = Enum;

class CinematicBars extends Roact.Component<Props> {
  private readonly bottomRef = createRef<Frame>();
  private readonly topRef = createRef<Frame>();
  private readonly janitor = new Janitor;

  protected willUnmount(): void {
    this.janitor.Destroy();
  }

  protected didMount(): void {
    this._toggle(this.props.InitiallyToggled ?? false);
    this.janitor.Add(Events.toggleCinematicBars.connect(on => this._toggle(on)));
    StarterGui.SetCoreGuiEnabled(CoreGuiType.Backpack, false);
  }

  private _toggle(on: boolean): void {
    StarterGui.SetCoreGuiEnabled(CoreGuiType.PlayerList, !on);
    const info = new TweenInfo(.25, EasingStyle.Quad);
    const top = this.topRef.getValue()!;
    const bottom = this.bottomRef.getValue()!;
    const topGoal = { Position: new UDim2(0, 0, 0, on ? 0 : -top.Size.Y.Offset) };
    const bottomGoal = { Position: new UDim2(0, 0, 1, on ? 0 : bottom.Size.Y.Offset) };
    tween(top, info, topGoal);
    tween(bottom, info, bottomGoal);
  }

  public render(): Roact.Element {
    return (
      <screengui Key="CinematicBars" ScreenInsets={ScreenInsets.DeviceSafeInsets} DisplayOrder={5} ResetOnSpawn={false}>
        <frame
          Key="B"
          Ref={this.bottomRef}
          AnchorPoint={new Vector2(0, 1)}
          BackgroundColor3={Color3.fromRGB(0, 0, 0)}
          BorderSizePixel={0}
          Position={new UDim2(0, 0, 1, 100)}
          Size={new UDim2(1, 0, 0, 100)}
        />
        <frame
          Key="T"
          Ref={this.topRef}
          BackgroundColor3={Color3.fromRGB(0, 0, 0)}
          BorderSizePixel={0}
          Position={new UDim2(0, 0, 0, -100)}
          Size={new UDim2(1, 0, 0, 100)}
        />
      </screengui>
    );
  }
}

export default <CinematicBars />;
