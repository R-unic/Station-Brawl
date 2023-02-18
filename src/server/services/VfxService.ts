import { Service, OnInit } from "@flamework/core";
import { ReplicatedStorage as Replicated, Workspace as World } from "@rbxts/services";
import { PartCache } from "@rbxts/partcache/class";
import PartCacheModule from "@rbxts/partcache";

import { Events } from "server/network";
import tween from "shared/utility/tween";

@Service({})
export class VfxService implements OnInit {
  private readonly impactCache = new PartCacheModule(<Part>Replicated.Assets.VFX.WaitForChild("Impact"), 20);
  private readonly damageCounterCache = new PartCacheModule(<Part>Replicated.Assets.VFX.WaitForChild("DamageCounter"), 20);

  public onInit(): void {
    this.impactCache.SetCacheParent(World.WaitForChild("Ignore"));
    this.damageCounterCache.SetCacheParent(World.WaitForChild("Ignore"));
    Events.createImpactVFX.connect((player, position, duration) => this.createImpact(position, duration));
    Events.createDamageCounter.connect((player, character, damage, duration) => this.createDamageCounter(character, damage, duration));
  }

  public createDamageCounter(character: Model, damage: number, duration: number): void {
    const part = this.damageCounterCache.GetPart();
    part.Position = character.PrimaryPart!.Position;

    const billboard = part.WaitForChild<typeof Replicated.Assets.VFX.DamageCounter.Billboard>("Billboard");
    const rand = () => (new Random).NextNumber(1, 2.5);
    billboard.StudsOffset = new Vector3(rand(), rand(), rand());
    billboard.Adornee = character.PrimaryPart;
    billboard.DamageLabel.Text = `-${damage}`;

    const info = new TweenInfo(duration, Enum.EasingStyle.Quad);
    tween(billboard, info, { StudsOffset: new Vector3(billboard.StudsOffset.X, billboard.StudsOffset.Y + 2, billboard.StudsOffset.Z) });
    tween(billboard.DamageLabel, info, { TextTransparency: 1 });
    tween(billboard.DamageLabel.UIStroke, info, { Transparency: 1 })
      .Completed.Once(() => this.damageCounterCache.ReturnPart(part));
  }

  public createImpact(position: Vector3, duration: number): void {
    const part = this.impactCache.GetPart();
    part.Position = position;
    this._createParticles(part, duration, this.impactCache);
  }

  private _createParticles(part: Part, duration: number, cache: PartCache): void {
    const particles = part.GetDescendants().filter((i): i is ParticleEmitter => i.IsA("ParticleEmitter"));
    for (const particle of particles)
      task.delay(duration, () => particle.Enabled = false);

    task.delay(duration * 2, () => cache.ReturnPart(part));
  }
}
