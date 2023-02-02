import { CaseInfo } from "./CaseInfo";
import { EffectInfo } from "./EffectInfo";

export default interface Inventory {
    readonly cases: CaseInfo[]
    readonly effects: EffectInfo[]
}
