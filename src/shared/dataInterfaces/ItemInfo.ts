import { Rarity } from "./Rarity";

export class ItemInfo {
    public constructor(
        public readonly name: string,
        public readonly image: string,
        public readonly rarity: Rarity
    ) {}
}
