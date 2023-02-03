import { Controller } from "@flamework/core";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { MissingLootPoolException } from "shared/Exceptions";
import { CaseReward, CaseRewardKind } from "shared/Interfaces";

@Controller({})
export class LootPoolController {
    public getFrom(_case: CaseItemInfo): CaseReward[] {
        switch(_case.name) {
            case "Basic":
                return [
                    new CaseReward(CaseRewardKind.Effect, "Fire", "rbxassetid://0")
                ];
            default:
                throw new MissingLootPoolException(_case);
        }
    }
}
