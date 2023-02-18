import { NumAbbr, formatNum } from "@rbxts/number-manipulator";
import Roact, { Tree, createRef, unmount } from "@rbxts/roact";

interface EntryProps {
  Username: string;
  Kills: number;
  Playtime: number;
}

function LeaderboardEntry(props: EntryProps) {
  const abbr = new NumAbbr;
  return (
    <frame
      Key="LeaderboardEntry"
      BackgroundColor3={Color3.fromRGB(0, 0, 0)}
      BackgroundTransparency={0.45}
      BorderSizePixel={0}
      Size={new UDim2(1, 0, 0, 60)}
    >
      <uicorner />
      <textlabel
        Key="Name"
        BackgroundTransparency={1}
        Font={Enum.Font.GothamBold}
        Size={new UDim2(0.5, 0, 1, 0)}
        Text={props.Username}
        TextColor3={Color3.fromRGB(255, 255, 255)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
        TextXAlignment={Enum.TextXAlignment.Left}
      >
        <uistroke />
      </textlabel>
      <uipadding
        PaddingBottom={new UDim(0.075, 0)}
        PaddingLeft={new UDim(0.02, 0)}
        PaddingRight={new UDim(0.02, 0)}
        PaddingTop={new UDim(0.075, 0)}
      />
      <textlabel
        Key="Kills"
        AnchorPoint={new Vector2(1, 0)}
        BackgroundTransparency={1}
        Font={Enum.Font.GothamMedium}
        Position={new UDim2(0.75, 0, 0, 0)}
        Size={new UDim2(0.25, 0, 1, 0)}
        Text={formatNum(props.Kills)}
        TextColor3={Color3.fromRGB(255, 255, 255)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
      >
        <uistroke />
      </textlabel>
      <textlabel
        Key="Playtime"
        AnchorPoint={new Vector2(1, 0)}
        BackgroundTransparency={1}
        Font={Enum.Font.GothamMedium}
        Position={new UDim2(1, 0, 0, 0)}
        Size={new UDim2(0.25, 0, 1, 0)}
        Text={abbr.abbreviate(props.Playtime) + "s"}
        TextColor3={Color3.fromRGB(255, 255, 255)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
      >
        <uistroke />
      </textlabel>
    </frame >
  );
}

class LeaderboardScreen extends Roact.Component<{}, {}> {
  private readonly listRef = createRef<ScrollingFrame>();
  private readonly entryHandles: Tree[] = [];

  protected didMount(): void {
    this._refresh();
  }

  private _refresh(): void {
    for (const handle of this.entryHandles)
      unmount(handle);

    const list = this.listRef.getValue()!;
  }

  public render() {
    return (
      <surfacegui
        Key="Screen"
        ClipsDescendants={true}
        LightInfluence={1}
        SizingMode={Enum.SurfaceGuiSizingMode.PixelsPerStud}
        ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
      >
        <textlabel
          Key="NameTitle"
          BackgroundTransparency={1}
          Font={Enum.Font.GothamMedium}
          Size={new UDim2(0.5, 0, 0.05, 0)}
          Text="Name"
          TextColor3={Color3.fromRGB(252, 252, 252)}
          TextScaled={true}
          TextSize={14}
          TextWrapped={true}
          TextXAlignment={Enum.TextXAlignment.Left}
        >
          <uistroke Thickness={3} Transparency={0.4} />
          <uipadding PaddingLeft={new UDim(0, 25)} />
        </textlabel>
        <textlabel
          Key="PlaytimeTitle"
          AnchorPoint={new Vector2(1, 0)}
          BackgroundTransparency={1}
          Font={Enum.Font.GothamMedium}
          Position={new UDim2(1, 0, 0, 0)}
          Size={new UDim2(0.25, 0, 0.05, 0)}
          Text="Playtime"
          TextColor3={Color3.fromRGB(252, 252, 252)}
          TextScaled={true}
          TextSize={14}
          TextWrapped={true}
        >
          <uistroke Thickness={3} Transparency={0.4} />
          <uipadding PaddingRight={new UDim(0, 25)} />
        </textlabel>
        <textlabel
          Key="KillsTitle"
          AnchorPoint={new Vector2(1, 0)}
          BackgroundTransparency={1}
          Font={Enum.Font.GothamMedium}
          Position={new UDim2(0.75, 0, 0, 0)}
          Size={new UDim2(0.25, 0, 0.05, 0)}
          Text="Kills"
          TextColor3={Color3.fromRGB(252, 252, 252)}
          TextScaled={true}
          TextSize={14}
          TextWrapped={true}
        >
          <uistroke Thickness={3} Transparency={0.4} />
          <uipadding PaddingRight={new UDim(0, 25)} />
        </textlabel>
        <scrollingframe
          Ref={this.listRef}
          Key="List"
          BackgroundTransparency={1}
          ClipsDescendants={false}
          Position={new UDim2(0, 0, 0.05, 0)}
          ScrollBarImageColor3={Color3.fromRGB(0, 0, 0)}
          ScrollBarThickness={20}
          Selectable={false}
          SelectionGroup={false}
          Size={new UDim2(1, 0, 0.95, 0)}
        >
          <uilistlayout Padding={new UDim(0, 5)} SortOrder={Enum.SortOrder.LayoutOrder} />
          <uipadding
            PaddingLeft={new UDim(0, 5)}
            PaddingRight={new UDim(0, 30)}
            PaddingTop={new UDim(0, 10)}
          />
        </scrollingframe >
        <uipadding PaddingBottom={new UDim(0, 10)} PaddingTop={new UDim(0, 10)} />
      </surfacegui >
    );
  }
}

export default <LeaderboardScreen />;
