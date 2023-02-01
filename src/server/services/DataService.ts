import { Service, OnInit } from "@flamework/core";
import DataStore2 from "@rbxts/datastore2";
import { Players } from "@rbxts/services";
import { Events } from "server/network";

@Service({})
export class DataService implements OnInit {
    public onInit(): void {
        DataStore2.Combine("DATA", "money");
        Players.PlayerAdded.Connect(player => {
            this._initialize(player, "money", 100);
        });
    }

    private _initialize(player: Player, key: string, defaultValue?: unknown): void {
        const store = DataStore2(key, player);
        this._sendToClient(player, key, store.Get(defaultValue));
        store.OnUpdate(value => this._sendToClient(player, key, value));
    }

    private _sendToClient(player: Player, key: string, value: unknown): void {
        Events.dataUpdate.fire(player, key, value);
    }
}
