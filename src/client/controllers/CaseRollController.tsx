import { Controller } from "@flamework/core";
import { ReplicatedStorage as Replicated, Workspace as World } from "@rbxts/services";
import { StrictMap } from "@rbxts/strict-map";
import { Janitor } from "@rbxts/janitor";
import Roact, { Element, mount, unmount } from "@rbxts/roact";

import { randomElement } from "shared/utility/ArrayUtil";
import { CaseReward, CaseRewardKind } from "shared/Interfaces";
import { DuplicateRewards, Rarity, RarityColors } from "shared/dataInterfaces/Rarity";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";

import { Events, Functions } from "client/network";
import { WindowRefs } from "client/roact/Refs";
import { getUI } from "client/utility";
import { LootPoolController } from "./LootPoolController";
import CaseRewardModal from "client/roact/components/modals/CaseRewardModal";
import ItemCard from "client/roact/components/cards/ItemCard";

const { CameraType, Font } = Enum;

@Controller({})
export class CaseRollController {
  private readonly cameraPart = World.CaseRollScene.CaseCamera;
  private readonly janitor = new Janitor;

  public constructor(
    private readonly lootPool: LootPoolController
  ) { }

  public cleanup(): void {
    this.janitor.Cleanup();
  }

  public async open(_case: CaseItemInfo): Promise<void> {
    Events.toggleCinematicBars.predict(true);
    const defaultEnabled = new StrictMap<string, boolean>();
    for (const [key, ref] of WindowRefs.entries()) {
      const screen = ref.getValue()!;
      defaultEnabled.set(key, screen.Enabled);
      screen.Enabled = false;
    }

    const camera = World.CurrentCamera!;
    camera.CameraType = CameraType.Scriptable;
    camera.CFrame = this.cameraPart.CFrame;
    camera.FieldOfView = 40;

    // do case animation blah blah

    const reward = this._getReward(_case);
    const modal = await this._getRewardModal(reward);
    const modalHandle = mount(modal, getUI());
    this.janitor.Add(() => {
      Events.toggleCinematicBars.predict(false);
      camera.CameraType = CameraType.Custom;
      camera.FieldOfView = 70;

      unmount(modalHandle);
      for (const [key, enabled] of defaultEnabled.entries()) {
        const ref = WindowRefs.mustGet(key);
        const screen = ref.getValue()!;
        screen.Enabled = enabled;
      }
    });
  }

  private async _getRewardModal(reward: CaseReward): Promise<Element> {
    const rarityColor = RarityColors[reward.rarity];
    const [isDuplicate, duplicateReward] = await this._dataStoreReward(reward);
    return (
      <CaseRewardModal>
        <ItemCard
          ItemName={reward.name}
          Icon={reward.image}
          InfoText={reward.name}
          ButtonText={this._getRewardKindString(reward.kind)}
          AnchorPoint={new Vector2(.5, .5)}
          Position={UDim2.fromScale(.5, .425)}
          Size={UDim2.fromScale(.125, .3)}
          PrimaryGradientColor={Color3.fromRGB(204, 204, 204).Lerp(rarityColor, .5)}
          SecondaryGradientColor={Color3.fromRGB(150, 150, 150).Lerp(rarityColor, .5)}
          ButtonColor={Color3.fromRGB(48, 54, 64)}
          ButtonTextColor={Color3.fromRGB(201, 207, 212)}
          OnButtonClicked={() => { }}
        >
          {!isDuplicate ? undefined : (
            <textlabel
              Key="DuplicateRewardCover"
              BackgroundColor3={Color3.fromRGB(0, 0, 0)}
              BackgroundTransparency={0.4}
              Font={Font.GothamBold}
              Size={UDim2.fromScale(1, 1)}
              Text={"$" + tostring(duplicateReward)}
              TextColor3={Color3.fromRGB(178, 255, 200)}
              TextScaled={true}
              TextSize={14}
              TextWrapped={true}
              ZIndex={3}
            >
              <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(93, 255, 98)), new ColorSequenceKeypoint(1, Color3.fromRGB(255, 255, 255))])}
                Rotation={220}
              />
              <uistroke Color={Color3.fromRGB(117, 157, 130)} Thickness={1.5} />
              <uicorner />
            </textlabel>
          )}
        </ItemCard>
      </CaseRewardModal>
    );
  }

  private async _dataStoreReward(reward: CaseReward): Promise<[boolean, number | undefined]> {
    let isDuplicate = false;
    let duplicateReward: number | undefined;
    const inventory = (await Functions.getData.invoke("inventory")) as InventoryInfo;
    switch (reward.kind) {
      case CaseRewardKind.Effect:
        const effectName = reward.name as Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>;
        if (inventory.effects.map(e => e.name).includes(effectName)) {
          duplicateReward = this._awardDuplicateMoney(reward.rarity);
          isDuplicate = true;
        } else
          Events.addEffectToInventory.fire(effectName, reward.image, reward.rarity);
        break;
    }

    return [isDuplicate, duplicateReward];
  }

  private _awardDuplicateMoney(rarity: Rarity): number {
    const reward = DuplicateRewards[rarity];
    Functions.getData.invoke("money").then(value => {
      const money = value as number;
      Events.setData("money", money + reward);
    });
    return reward;
  }

  private _getRewardKindString(kind: CaseRewardKind): string {
    switch (kind) {
      case CaseRewardKind.Effect:
        return "Effect";
      case CaseRewardKind.Weapon:
        return "Weapon";
    }
  }

  private _getReward(_case: CaseItemInfo): CaseReward {
    const pool = this.lootPool.getFrom(_case);
    return randomElement(pool);
  }
}
