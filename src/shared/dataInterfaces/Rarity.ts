export enum Rarity {
    Common,
    Average,
    Rare,
    UltraRare,
    Epic,
    Mythic,
    Heirloom
}

export const RarityColors = {
    [Rarity.Common]: Color3.fromRGB(214, 199, 199),
    [Rarity.Average]: Color3.fromRGB(87, 191, 87),
    [Rarity.Rare]: Color3.fromRGB(51, 173, 255),
    [Rarity.UltraRare]: Color3.fromRGB(184, 59, 209),
    [Rarity.Epic]: Color3.fromRGB(217, 120, 222),
    [Rarity.Mythic]: Color3.fromRGB(255, 84, 71),
    [Rarity.Heirloom]: Color3.fromRGB(252, 217, 84)
};
