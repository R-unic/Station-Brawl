import { Service, OnInit } from "@flamework/core";
import { ReplicatedStorage as Replicated, Workspace as World } from "@rbxts/services";
import { PartCache } from "@rbxts/partcache/class";
import PartCacheModule from "@rbxts/partcache";

import { Events } from "server/network";

@Service({})
export class VfxService implements OnInit {
  private readonly impactCache = new PartCacheModule(<Part>Replicated.Assets.VFX.WaitForChild("Impact"), 16);

  public onInit(): void {
    this.impactCache.SetCacheParent(World.WaitForChild("Ignore"));
    Events.createBlood.connect((player, position, duration) => this.createImpact(position, duration));
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
