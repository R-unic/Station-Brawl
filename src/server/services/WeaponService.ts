import { Service, OnInit } from "@flamework/core";
import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { WeaponData } from "shared/Interfaces";
import { Events } from "server/network";
import weld from "server/utility/weld";

@Service({})
export class WeaponService implements OnInit {
    public onInit(): void {
        Events.equipWeapon.connect((player, weaponName) => this._equip(player, weaponName));
        Events.unequipWeapon.connect((player, weaponName) => this._unequip(player, weaponName));
    }

    private _equip(player: Player, weaponName: Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>): void {
        const weapon = Replicated.Assets.Weapons[weaponName].Clone();
        const dataModule = weapon.WaitForChild<ModuleScript>("Data");
        const weaponData = require<WeaponData>(dataModule);
        const character = player.Character!;
        const hand = character.WaitForChild<Part>("RightHand");
        const handle = weapon.PrimaryPart!;

        weld(hand, handle);
        weapon.SetPrimaryPartCFrame(hand.CFrame.mul(CFrame.Angles(math.rad(-90), 0, 0)));
        weapon.Parent = character;
        Events.loadWeapon.fire(player, weaponData);
    }

    private _unequip(player: Player, weaponName: Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>): void {
        const character = player.Character!;
        const weapon = character.FindFirstChild(weaponName);
        if (!weapon) return;

        weapon.Destroy();
        Events.unloadWeapon.fire(player);
    }
}
