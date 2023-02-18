import Roact, { Element, Tree, createRef, mount, unmount } from "@rbxts/roact";
import { Events, Functions } from "client/network";
import { WindowRefs } from "../Refs";
import MapVotingModal from "../components/modals/MapVotingModal";
import MoneyLabel from "../components/MoneyLabel";
import RoundTimer from "../components/RoundTimer";
import MapChoice from "../components/MapChoice";
import { StrictMap } from "@rbxts/strict-map";
import { ServerStorage } from "@rbxts/services";

const ref = createRef<ScreenGui>();
const mapIcons = new StrictMap<Exclude<keyof typeof ServerStorage["Maps"], keyof Folder>, string>([
  ["Gas Station", "rbxassetid://11115843157"]
]);

let votingModalHandle: Nullable<Tree>;
Events.removeMapVotePrompt.connect(() => {
  if (!votingModalHandle) return;
  unmount(votingModalHandle);
});
Events.promptMapVote.connect(async () => {
  const choices: Element[] = [];
  for (let i = 0; i < 3; i++) {
    const randomMap = (await Functions.getRandomMap.invoke())
    choices.push(
      <MapChoice
        MapName={randomMap}
        Icon={mapIcons.mustGet(randomMap)}
      />
    );
  }
  votingModalHandle = mount((
    <MapVotingModal>
      {...choices}
    </MapVotingModal>
  ), ref.getValue()!);
});

const MainUI = (
  <screengui Ref={ref} Key="Main" ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets} ResetOnSpawn={false}>
    <uipadding
      PaddingBottom={new UDim(0, 5)}
      PaddingLeft={new UDim(0, 10)}
      PaddingRight={new UDim(0, 10)}
      PaddingTop={new UDim(0, 2)}
    />
    <RoundTimer
      LabelProperties={{
        Name: "Timer",
        AnchorPoint: new Vector2(0.5, 0),
        BackgroundTransparency: 1,
        Font: Enum.Font.Unknown,
        FontFace: new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.Medium, Enum.FontStyle.Normal),
        Position: new UDim2(0.5, 0, 0, 0),
        RichText: true,
        Size: new UDim2(0.25, 0, 0.055, 0),
        Text: '<stroke thickness="1.7" transparency=".4" ><uc>Intermission</uc> <b>|</b> 5:00</stroke>',
        TextColor3: Color3.fromRGB(255, 255, 255),
        TextScaled: true,
        TextSize: 14,
        TextWrapped: true
      }}
    />
    <MoneyLabel
      FrameProperties={{
        AnchorPoint: new Vector2(1, 0),
        Position: new UDim2(1, -155, 0, 0),
        Size: new UDim2(0.1, 0, 0, 35)
      }}
      OnPromptAddMoney={() => {
        const shopRef = WindowRefs.mustGet("shop");
        const shop = shopRef.getValue()!;
        shop.Enabled = !shop.Enabled;
      }}
    />
  </screengui >
);

export default MainUI;
