import { OnInit, Service } from "@flamework/core";
import DataStore2 from "@rbxts/datastore2";

import { Events, Functions } from "server/network";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { Rarity } from "shared/dataInterfaces/Rarity";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";

DataStore2.Combine("DATA", "money", "inventory");

@Service({})
export class DataService implements OnInit {
    public onInit(): void {
        Events.initializeData.connect(player => this._setup(player));
        Events.setData.connect((player, key, value) => this.set(player, key, value));
        Functions.getData.setCallback((player, key) => this.get(player, key)!);
    }

    public get<T = unknown>(player: Player, key: string): T | undefined {
        const store = this._getStore<T>(player, key);
        return store.Get();
    }

    public set<T = unknown>(player: Player, key: string, value: T): void {
        const store = this._getStore<T>(player, key);
        store.Set(value);
    }

    private _setup(player: Player): void {
        this._initialize(player, "money", 100);
        this._initialize<InventoryInfo>(player, "inventory", {
            cases: [],
            effects: []
        });

        const inv = this.get<InventoryInfo>(player, "inventory")!;
        inv.cases.push(new CaseItemInfo("Basic", "rbxassetid://2026820322", Rarity.Basic));
        this.set<InventoryInfo>(player, "inventory", inv);
    }

    private _initialize<T = unknown>(player: Player, key: string, defaultValue?: T): void {
        const store = this._getStore(player, key);
        this._sendToClient(player, key, store.Get(defaultValue));
        store.OnUpdate(value => this._sendToClient(player, key, value));
    }

    private _getStore<T = unknown>(player: Player, key: string): DataStore2<T> {
        return DataStore2<T>(key, player);
    }

    private _sendToClient<T = unknown>(player: Player, key: string, value: T): void {
        Events.dataUpdate.fire(player, key, value);
    }
}
