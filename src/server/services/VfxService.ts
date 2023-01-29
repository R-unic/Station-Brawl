import { Service, OnStart, OnInit } from "@flamework/core";
import { Debris, ReplicatedStorage as Replicated, Workspace as World } from "@rbxts/services";
import { GlobalEvents } from "shared/network";

@Service({})
export class VfxService implements OnInit {
    public onInit(): void {
        GlobalEvents.server.createVfx.connect((plr, name, pos, duration) => this.create(name, pos, duration));
    }

    public create(name: string, pos: Vector3, duration: number): void {
        task.spawn(() => {
            const part = <Part>Replicated.Assets.VFX.WaitForChild(name).Clone();
            const particles = part.GetDescendants().filter((i): i is ParticleEmitter => i.IsA("ParticleEmitter"));

            part.Position = pos;
            part.Parent = World.WaitForChild("Ignore");
            for (const p of particles)
                task.delay(duration, () => p.Enabled = false);

            Debris.AddItem(part, duration * 2);
        });
    }
}
