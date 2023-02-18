import { Controller, OnInit } from "@flamework/core";
import { Lighting, Workspace as World } from "@rbxts/services";
import CameraShaker from "@rbxts/camera-shaker";

import { Events, Functions } from "client/network";
import { getCharacter, getPlayer } from "client/utility";
import { EmoteController } from "./EmoteController";
import { RoundState, WeaponData } from "shared/Interfaces";
import tween from "shared/utility/tween";

const fists: WeaponData = {
  Damage: [15, 25],
  Range: 2.85,
  Cooldown: .35,
  Animations: {
    Attack: [12219768623, 12219772302, 12219779172, 12219783178, 12219787450]
  }
};

@Controller({})
export class CombatController implements OnInit {
  private consecutiveAttacks = 0;
  private weaponState: WeaponData = fists;
  private readonly debounce = {
    attack: false
  };

  public constructor(
    private readonly emote: EmoteController
  ) { }

  public onInit(): void {
    math.randomseed(tick() + os.time());
    const camera = World.CurrentCamera!;
    const shaker = new CameraShaker(0, cf => camera.CFrame = camera.CFrame.mul(cf));
    shaker.Start();

    Events.shakeCamera.connect(() => shaker.Shake(CameraShaker.Presets.Vibration));
    Events.toggleKnockedFX.connect(on => this._toggleKnockedFX(on));
    Events.loadWeapon.connect(data => this._loadWeapon(data));
    Events.unloadWeapon.connect(() => this._unloadWeapon());
  }

  public async attack(): Promise<void> {
    if (await Functions.getRoundState.invoke() !== RoundState.InGame) return;
    if (this.emote.emoting) return;
    if (this.debounce.attack) return;
    this.debounce.attack = true;
    this.consecutiveAttacks += 1;

    task.spawn(() => {
      const player = getPlayer();
      const character = getCharacter();
      if (character.WaitForChild<Humanoid>("Humanoid").Health <= 0) return;
      if (player.GetAttribute("BeingFinished") === true) return;

      const attackAnimations = this.weaponState.Animations.Attack;
      const attackId = this.consecutiveAttacks < 1 ? attackAnimations[0] : attackAnimations[(new Random).NextInteger(0, attackAnimations.size())];
      Events.playAnim.fire("attack", attackId, undefined, false);
      const result = this._rayMarch();
      if (!result) return;

      Events.playSoundInCharacter.fire("punchHit");
      const enemy = result.Instance.FindFirstAncestorOfClass("Model")
      if (!enemy) return;

      const [dmg0, dmg1] = this.weaponState.Damage;
      const humanoid = <Humanoid>enemy.FindFirstChild("Humanoid", true);
      if (!humanoid) return;
      if (humanoid.Health <= 0) return;

      const dmg = math.ceil(math.random(dmg0, dmg1));
      Events.damage.fire(humanoid, dmg);
      Events.createImpactVFX.fire(result.Position, .5);
      Events.createDamageCounter.fire(enemy, dmg, 2.5);
    });
    task.delay(this.weaponState.Cooldown, () => {
      this.debounce.attack = false;
      this.consecutiveAttacks -= 1;
    });
  }

  private _unloadWeapon(): void {
    this._loadWeapon(fists);
  }

  private _loadWeapon(data: WeaponData): void {
    Events.stopAnim.fire("idle");
    this.weaponState = data;
    if (data.Animations.Idle)
      Events.playAnim.fire("idle", data.Animations.Idle, getCharacter());
  }

  private _toggleKnockedFX(on: boolean): void {
    const info = new TweenInfo(4.5, Enum.EasingStyle.Elastic);
    tween(Lighting.KnockedCC, info, { Saturation: on ? -1 - Lighting.ColorCorrection.Saturation : 0 });
    tween(Lighting.KnockedBlur, info, { Size: on ? 16 : 0 });
  }

  private _rayMarch(): Nullable<RaycastResult> {
    const character = getCharacter();
    const root = character.PrimaryPart!;
    const params = new RaycastParams();
    params.FilterDescendantsInstances = [character];

    const rotation = 40;
    const lookVector = root.CFrame.LookVector.mul(this.weaponState.Range);
    const centerResults = World.Raycast(root.Position, lookVector, params);
    const rightResults = World.Raycast(root.Position, CFrame.Angles(0, math.rad(rotation), 0).VectorToWorldSpace(lookVector), params);
    const leftResults = World.Raycast(root.Position, CFrame.Angles(0, math.rad(-rotation), 0).VectorToWorldSpace(lookVector), params);
    return centerResults || leftResults || rightResults;
  }
}
