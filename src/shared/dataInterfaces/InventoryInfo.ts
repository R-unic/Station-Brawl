import { CaseItemInfo } from "./CaseItemInfo";
import { EffectItemInfo } from "./EffectItemInfo";
import { WeaponItemInfo } from "./WeaponItemInfo";

export default interface InventoryInfo {
    cases: CaseItemInfo[];
    effects: EffectItemInfo[];
    weapons: WeaponItemInfo[];
}
