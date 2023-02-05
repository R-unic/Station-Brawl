import { Service, OnInit } from "@flamework/core";
import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { Events } from "server/network";
import { DataService } from "./DataService";
import { Rarity } from "shared/dataInterfaces/Rarity";
import { EffectItemInfo } from "shared/dataInterfaces/EffectItemInfo";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";

@Service({})
export class InventoryService implements OnInit {
    public constructor(
        public readonly data: DataService
    ) {}

    public onInit(): void {
        Events.addEffectToInventory.connect((player, name, image, rarity) => this._addEffect(player, name, image, rarity))
    }

    private _addEffect(player: Player, name: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>, image: string, rarity: Rarity) {
        const inventory = this.data.get<InventoryInfo>(player, "inventory")!;
        const effects = inventory.effects;
        effects.push(new EffectItemInfo(name, image, rarity));
        this.data.set<InventoryInfo>(player, "inventory", {
            cases: inventory.cases,
            effects: effects
        });
    }
}
