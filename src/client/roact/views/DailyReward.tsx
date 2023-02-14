import Roact, { createRef } from "@rbxts/roact"
import { Events } from "client/network";
import { DailyRewards } from "shared/Constants";
import { RarityColors } from "shared/dataInterfaces/Rarity";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { randomElement } from "shared/utility/ArrayUtil";
import ItemCard from "../components/cards/ItemCard";

const { Font, ZIndexBehavior, ApplyStrokeMode } = Enum;

const reward = randomElement(DailyRewards);
const rarityColor = RarityColors[reward.rarity];
let rewardType = "";
if (reward instanceof CaseItemInfo)
  rewardType = "Case";
const fullName = reward.name + (rewardType === "Case" ? " Case" : "");

const ref = createRef<ScreenGui>();
// WindowRefs.set("dailyReward", ref);

let db = false;
const DailyRewardUI = (
  <screengui Ref={ref} Key="DailyReward" DisplayOrder={2} ZIndexBehavior={ZIndexBehavior.Sibling}>
    <frame
      Key="Modal"
      AnchorPoint={new Vector2(0.5, 0.5)}
      BackgroundColor3={Color3.fromRGB(255, 255, 255)}
      Position={new UDim2(0.5, 0, 0.5, 0)}
      Size={new UDim2(0.2, 0, 0.55, 0)}
    >
      <ItemCard
        ItemName={fullName}
        Icon={reward.image}
        InfoText={fullName}
        ButtonText={rewardType}
        AnchorPoint={new Vector2(.5, .5)}
        Position={UDim2.fromScale(.5, .5)}
        Size={UDim2.fromScale(.6, .5)}
        PrimaryGradientColor={Color3.fromRGB(204, 204, 204).Lerp(rarityColor, .5)}
        SecondaryGradientColor={Color3.fromRGB(150, 150, 150).Lerp(rarityColor, .5)}
        ButtonColor={Color3.fromRGB(48, 54, 64)}
        ButtonTextColor={Color3.fromRGB(201, 207, 212)}
        OnButtonClicked={() => { }}
      />
      <uicorner CornerRadius={new UDim(0, 14)} />
      <uistroke Color={Color3.fromRGB(158, 158, 158)} Thickness={3}>
        <uigradient
          Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(248, 225, 180)), new ColorSequenceKeypoint(1, Color3.fromRGB(189, 174, 139))])}
          Rotation={-45}
        />
      </uistroke>
      <textbutton
        Key="Claim"
        AnchorPoint={new Vector2(0.5, 1)}
        AutoButtonColor={false}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        Font={Font.Unknown}
        Position={new UDim2(0.5, 0, 1, 0)}
        Size={new UDim2(0.4, 0, 0.1, 0)}
        Text={""}
        TextColor3={Color3.fromRGB(0, 0, 0)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
        Event={{
          MouseButton1Click: () => {
            if (db) return;
            db = true;

            Events.setLastDailyClaimTime();
            Events.addCaseToInventory.fire(reward.name, reward.image, reward.rarity);
            ref.getValue()?.Destroy();
          }
        }}
      >
        <uicorner />
        <uistroke
          ApplyStrokeMode={ApplyStrokeMode.Border}
          Color={Color3.fromRGB(158, 158, 158)}
          Thickness={1.8}
        >
          <uigradient
            Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(170, 255, 127)), new ColorSequenceKeypoint(1, Color3.fromRGB(143, 255, 162))])}
            Rotation={-45}
          />
        </uistroke>
        <uipadding
          PaddingBottom={new UDim(0.1, 0)}
          PaddingLeft={new UDim(0.1, 0)}
          PaddingRight={new UDim(0.1, 0)}
          PaddingTop={new UDim(0.1, 0)}
        />
        <textlabel
          Key="Text"
          Active={true}
          AnchorPoint={new Vector2(0.5, 1)}
          BackgroundTransparency={1}
          Font={Font.Ubuntu}
          Position={new UDim2(0.5, 0, 1, 0)}
          Selectable={true}
          Size={new UDim2(1, 0, 1, 0)}
          Text="Claim"
          TextColor3={Color3.fromRGB(240, 254, 255)}
          TextScaled={true}
          TextSize={14}
          TextWrapped={true}
        >
          <uistroke Color={Color3.fromRGB(71, 106, 53)} Thickness={1.5} />
        </textlabel>
        <uigradient
          Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(170, 255, 127)), new ColorSequenceKeypoint(1, Color3.fromRGB(143, 255, 162))])}
          Rotation={45}
        />
      </textbutton>
      <textlabel
        Key="Title"
        AnchorPoint={new Vector2(0.5, 0)}
        BackgroundTransparency={1}
        Font={Font.GothamBlack}
        Position={new UDim2(0.5, 0, 0, 0)}
        Size={new UDim2(1, 0, 0.15, 0)}
        Text="Daily Reward"
        TextColor3={Color3.fromRGB(252, 252, 252)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
      >
        <uistroke Color={Color3.fromRGB(100, 94, 70)} Thickness={1.8} />
      </textlabel>
      <uipadding
        PaddingBottom={new UDim(0.05, 0)}
        PaddingLeft={new UDim(0.075, 0)}
        PaddingRight={new UDim(0.075, 0)}
        PaddingTop={new UDim(0.05, 0)}
      />
      <uigradient
        Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(248, 225, 180)), new ColorSequenceKeypoint(1, Color3.fromRGB(189, 174, 139))])}
        Rotation={45}
      />
    </frame>
  </screengui>
);

export default DailyRewardUI;
