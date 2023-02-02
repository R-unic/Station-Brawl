import { OnInit, Service } from "@flamework/core";
import DataStore2 from "@rbxts/datastore2";
import { Events } from "server/network";

DataStore2.Combine("DATA", "money");

@Service({})
export class DataService implements OnInit {
    private _setup(player: Player): void {
        this._initialize(player, "money", 100);
    }

    public onInit(): void {
        Events.initializeData.connect(player => this._setup(player));
    }

    public get<T = unknown>(player: Player, key: string): DataStore2<T> {
        return DataStore2(key, player);
    }

    private _initialize(player: Player, key: string, defaultValue?: unknown): void {
        const store = this.get(player, key);
        this._sendToClient(player, key, store.Get(defaultValue));
        store.OnUpdate(value => this._sendToClient(player, key, value));
    }

    private _sendToClient(player: Player, key: string, value: unknown): void {
        Events.dataUpdate.fire(player, key, value);
    }
}
