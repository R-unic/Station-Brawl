import { Controller } from "@flamework/core";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { Rarity } from "shared/dataInterfaces/Rarity";
import { MissingLootPoolException } from "shared/Exceptions";
import { CaseReward, CaseRewardKind, EffectCaseReward } from "shared/Interfaces";

@Controller({})
export class LootPoolController {
  public getFrom(_case: CaseItemInfo): CaseReward[] {
    switch (_case.name) {
      case "Basic":
        return [
          new EffectCaseReward("Flame", "rbxassetid://33238901", Rarity.Common),
          new EffectCaseReward("Electricity", "rbxassetid://247707592", Rarity.Average)
        ];
      default:
        throw new MissingLootPoolException(_case);
    }
  }
}
