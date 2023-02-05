import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { Rarity } from "./Rarity";

export class EffectItemInfo {
    public constructor(
        public readonly name: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>,
        public readonly image: string,
        public readonly rarity: Rarity
    ) {}
}
