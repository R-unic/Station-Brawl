import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { Rarity } from "./Rarity";
import { ItemInfo } from "./ItemInfo";

export class EffectItemInfo extends ItemInfo {
    public constructor(
        public readonly name: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>,
        public readonly image: string,
        public readonly rarity: Rarity
    ) {
        super(name, image, rarity);
    }
}
