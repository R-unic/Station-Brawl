import { OnInit, Service } from "@flamework/core";
import { DataStoreService, Players } from "@rbxts/services";
import DataStore2 from "@rbxts/datastore2";

import { Events, Functions } from "server/network";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";

@Service({})
export class DataService implements OnInit {
  public onInit(): void {
    DataStore2.Combine("DATA", "money", "inventory", "lastDailyClaim", "claimedCodes", "careerKills", "playtime");
    Events.initializeData.connect(player => this._setup(player));
    Events.setData.connect((player, key, value) => this.set(player, key, value));
    Functions.getData.setCallback((player, key) => this.get(player, key)!);

    Players.PlayerAdded.Connect(player => {
      task.spawn(() => {
        while (player) {
          const increment = 20;
          task.wait(increment);
          this.increment(player, "playtime", increment);
        }
      });

      const inventory = this.get<InventoryInfo>(player, "inventory");
      if (!inventory) return;
      inventory.cases ??= [];
      inventory.effects ??= [];
      inventory.weapons ??= [];
      // inventory.weapons.push(new WeaponItemInfo("Diamond Sword", "rbxassetid://3516782316", Rarity.UltraRare));
      this.set<InventoryInfo>(player, "inventory", inventory);
    });
  }

  public increment(player: Player, key: string, amount = 1): void {
    const value = this.get<number>(player, key) ?? 0;
    this.set(player, key, value + amount);
  }

  public get<T = unknown>(player: Player, key: string): Nullable<T> {
    const store = this._getStore<T>(player, key);
    return store.Get();
  }

  public set<T = unknown>(player: Player, key: string, value: T): void {
    const store = this._getStore<T>(player, key);
    store.Set(value);
  }

  private _setup(player: Player): void {
    this._initialize(player, "claimedCodes", []);
    this._initialize(player, "lastDailyClaim", undefined);
    this._initialize(player, "careerKills", 0);
    this._initialize(player, "playtime", 0);
    this._initialize(player, "money", 100);
    this._initialize<InventoryInfo>(player, "inventory", {
      cases: [],
      effects: [],
      weapons: []
    });
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
