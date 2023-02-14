import { Controller } from "@flamework/core";
import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { EffectItemInfo } from "shared/dataInterfaces/EffectItemInfo";
import { WeaponItemInfo } from "shared/dataInterfaces/WeaponItemInfo";

type CodeReward = EffectItemInfo | CaseItemInfo | WeaponItemInfo | number;
type CodeRewardType = "Effect" | "Case" | "Weapon" | "Money";

class Redeemable {
  public constructor(
    public readonly code: string,
    public readonly rewards: [CodeReward, CodeRewardType][],
    public readonly expiration?: DateTime
  ) { }
}

const VALID_CODES: Redeemable[] = [
  new Redeemable("balls", [[1000, "Money"]], DateTime.fromLocalTime(2023, 2, 14, 12, 12))
];

@Controller({})
export class CodeController {
  public async claim(code: string): Promise<void> {
    const valid = await this._isValid(code);
    if (!valid) return;

    //check if already claimed, store claimed in datastore if not
    const redeemable = this._getRedeemable(code)!;
    const claimedCodes = <string[]>(await Functions.getData.invoke("claimedCodes"));
    Events.setData.fire("claimedCodes", [...claimedCodes, code]);
    for (let [reward, rewardType] of redeemable.rewards)
      switch (rewardType) {
        case "Effect":
          reward = reward as EffectItemInfo;
          Events.addEffectToInventory.fire(<Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>>reward.name, reward.image, reward.rarity);
        case "Weapon":
          reward = reward as WeaponItemInfo;
          Events.addWeaponToInventory.fire(<Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>>reward.name, reward.image, reward.rarity);
        case "Case":
          reward = reward as CaseItemInfo;
          Events.addCaseToInventory.fire(reward.name, reward.image, reward.rarity);
        case "Money":
          const money = <number>(await Functions.getData.invoke("money"));
          Events.setData.fire("money", money);
      }
  }

  public async check(code: string): Promise<boolean> {
    const valid = await this._isValid(code);
    if (valid)
      this.claim(code);

    return valid;
  }

  private async _isValid(code: string): Promise<boolean> {
    const redeemable = this._getRedeemable(code);
    const claimedCodes = <string[]>(await Functions.getData.invoke("claimedCodes"));
    if (!redeemable) return false;
    if (claimedCodes.includes(code)) return false;
    if (redeemable.expiration) return redeemable.expiration.UnixTimestamp > DateTime.now().UnixTimestamp;
    return true;
  }

  private _getRedeemable(code: string): Redeemable | undefined {
    return VALID_CODES.find(v => v.code === code.lower());
  }
}
