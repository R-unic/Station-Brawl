import { Element } from "@rbxts/roact";

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
        public readonly image: string
    ) {}
}
