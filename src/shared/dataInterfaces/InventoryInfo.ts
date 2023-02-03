import { CaseItemInfo } from "./CaseItemInfo";
import { EffectItemInfo } from "./EffectItemInfo";

export default interface InventoryInfo {
    readonly cases: CaseItemInfo[]
    readonly effects: EffectItemInfo[]
}
