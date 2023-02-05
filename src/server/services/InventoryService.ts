import { Service, OnInit } from "@flamework/core";
import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { Events } from "server/network";
import { DataService } from "./DataService";
import { Rarity } from "shared/dataInterfaces/Rarity";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { EffectItemInfo } from "shared/dataInterfaces/EffectItemInfo";
import { WeaponItemInfo } from "shared/dataInterfaces/WeaponItemInfo";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";

@Service({})
export class InventoryService implements OnInit {
    public constructor(
        public readonly data: DataService
    ) {}

    public onInit(): void {
        Events.addCaseToInventory.connect((player, name, image, rarity) => this._addCase(player, name, image, rarity));
        Events.addEffectToInventory.connect((player, name, image, rarity) => this._addEffect(player, name, image, rarity));
        Events.addWeaponToInventory.connect((player, name, image, rarity) => this._addWeapon(player, name, image, rarity));
    }

    private _addCase(player: Player, name: string, image: string, rarity: Rarity): void {
        const inventory = this.data.get<InventoryInfo>(player, "inventory")!;
        const cases = inventory.cases;
        cases.push(new CaseItemInfo(name, image, rarity));
        this.data.set<InventoryInfo>(player, "inventory", {
            cases: cases,
            effects: inventory.effects,
            weapons: inventory.weapons
        });
    }

    private _addEffect(player: Player, name: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>, image: string, rarity: Rarity) {
        const inventory = this.data.get<InventoryInfo>(player, "inventory")!;
        const effects = inventory.effects;
        effects.push(new EffectItemInfo(name, image, rarity));
        this.data.set<InventoryInfo>(player, "inventory", {
            cases: inventory.cases,
            effects: effects,
            weapons: inventory.weapons
        });
    }

    private _addWeapon(player: Player, name: Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>, image: string, rarity: Rarity) {
        const inventory = this.data.get<InventoryInfo>(player, "inventory")!;
        const weapons = inventory.weapons;
        weapons.push(new WeaponItemInfo(name, image, rarity));
        this.data.set<InventoryInfo>(player, "inventory", {
            cases: inventory.cases,
            effects: inventory.effects,
            weapons: weapons
        });
    }
}
