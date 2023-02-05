import { CaseItemInfo } from "./CaseItemInfo";
import { EffectItemInfo } from "./EffectItemInfo";
import { WeaponItemInfo } from "./WeaponItemInfo";

export default interface InventoryInfo {
    readonly cases: CaseItemInfo[];
    readonly effects: EffectItemInfo[];
    readonly weapons: WeaponItemInfo[];
}
