import { OnInit, Service } from "@flamework/core";
import DataStore2 from "@rbxts/datastore2";
import { Events } from "server/network";
import { CaseInfo } from "shared/dataInterfaces/CaseInfo";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";
import { Rarity } from "shared/dataInterfaces/Rarity";

DataStore2.Combine("DATA", "money", "inventory");

@Service({})
export class DataService implements OnInit {
    private _setup(player: Player): void {
        this._initialize(player, "money", 100);
        this._initialize<InventoryInfo>(player, "inventory", {
            cases: [new CaseInfo("test", 10, "rbxassetid://2026820322", Rarity.Basic)],
            effects: []
        });
    }

    public onInit(): void {
        Events.initializeData.connect(player => this._setup(player));
    }

    public get<T = unknown>(player: Player, key: string): DataStore2<T> {
        return DataStore2<T>(key, player);
    }

    private _initialize<T = unknown>(player: Player, key: string, defaultValue?: T): void {
        const store = this.get(player, key);
        this._sendToClient(player, key, store.Get(defaultValue));
        store.OnUpdate(value => this._sendToClient(player, key, value));
    }

    private _sendToClient<T = unknown>(player: Player, key: string, value: T): void {
        Events.dataUpdate.fire(player, key, value);
    }
}
