import { Players } from "@rbxts/services";
import { NumAbbr, formatNum } from "@rbxts/number-manipulator";
import { StrictMap } from "@rbxts/strict-map";
import { Janitor } from "@rbxts/janitor";

import Roact, { Element, Tree, createRef, mount, unmount } from "@rbxts/roact";
import { Events, Functions } from "client/network";

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
        Key="Username"
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

interface LeaderboardState {
  SortMode: "Playtime" | "Kills"
}

class LeaderboardScreen extends Roact.Component<{}, LeaderboardState> {
  private readonly listRef = createRef<ScrollingFrame>();
  private readonly entryHandles: Tree[] = [];
  private readonly janitor = new Janitor;

  protected willUnmount(): void {
    this.janitor.Destroy();
  }

  protected didMount(): void {
    this.setState({ SortMode: "Kills" });
    this.janitor.Add(Events.dataUpdate.connect((key, value) => {
      if (key !== "careerKills" && key !== "playtime") return;
      this._refresh();
    }));
    this._refresh();
  }

  private async _refresh(): Promise<void> {
    for (const handle of this.entryHandles)
      unmount(handle);

    const list = this.listRef.getValue()!;

    type EntryData = [Element, number, number];
    const entries = new StrictMap<Player, EntryData>();
    for (const player of Players.GetPlayers()) {
      const kills = (await Functions.getData.invoke("careerKills")) as number;
      const playtime = (await Functions.getData.invoke("playtime")) as number;
      const entry = <LeaderboardEntry Username={player.Name} Kills={kills} Playtime={playtime} />;
      entries.set(player, [entry, kills, playtime]);
    }

    entries.values().sort((a, b) => {
      const idx = this.state.SortMode === "Kills" ? 1 : 2;
      return b[idx] > a[idx];
    }).forEach(([entry]) => {
      const handle = mount(entry, list);
      this.entryHandles.push(handle);
    });
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
        <textbutton
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
          Event={{
            MouseButton1Click: () => this.setState({ SortMode: "Playtime" }),
          }}
        >
          <uistroke Thickness={3} Transparency={0.4} />
          <uipadding PaddingRight={new UDim(0, 25)} />
        </textbutton>
        <textbutton
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
          Event={{
            MouseButton1Click: () => this.setState({ SortMode: "Kills" }),
          }}
        >
          <uistroke Thickness={3} Transparency={0.4} />
          <uipadding PaddingRight={new UDim(0, 25)} />
        </textbutton>
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
