import { Element } from "@rbxts/roact";
import { Rarity } from "./dataInterfaces/Rarity";

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
