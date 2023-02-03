import { CaseInfo } from "./CaseInfo";
import { EffectInfo } from "./EffectInfo";

export default interface InventoryInfo {
    readonly cases: CaseInfo[]
    readonly effects: EffectInfo[]
}
