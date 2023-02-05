import { Element } from "@rbxts/roact";
import { Rarity } from "./dataInterfaces/Rarity";
import { ReplicatedStorage as Replicated } from "@rbxts/services";

export interface InventoryPages {
    Effects: Element[];
    Cases: Element[];
}

export enum CaseRewardKind {
    Effect
}

export class CaseReward {
    public constructor(
        public readonly kind: CaseRewardKind,
        public readonly name: string,
        public readonly image: string,
        public readonly rarity: Rarity
    ) {}
}

export class EffectCaseReward extends CaseReward {
    public constructor(
        public readonly name: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>,
        public readonly image: string,
        public readonly rarity: Rarity
    ) {
        super(CaseRewardKind.Effect, name, image, rarity);
    }
}
