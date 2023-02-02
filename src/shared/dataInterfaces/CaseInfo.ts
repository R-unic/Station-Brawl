import { Rarity } from "./Rarity";

export class CaseInfo {
    public constructor(
        public name: string,
        public price: number,
        public image: string,
        public rarity: Rarity
    ) {}
}
