import { Service, OnStart, OnInit } from "@flamework/core";
import { Debris, ReplicatedStorage as Replicated, Workspace as World } from "@rbxts/services";
import { GlobalEvents } from "shared/network";

@Service({})
export class VfxService implements OnInit {
    public onInit(): void {
        GlobalEvents.server.createVfx.connect((player, name, position, duration) => this.create(name, position, duration));
    }

    public create(name: string, position: Vector3, duration: number): void {
        task.spawn(() => {
            const part = <Part>Replicated.Assets.VFX.WaitForChild(name).Clone();
            const particles = part.GetDescendants().filter((i): i is ParticleEmitter => i.IsA("ParticleEmitter"));

            part.Position = position;
            part.Parent = World.WaitForChild("Ignore");
            for (const particle of particles)
                task.delay(duration, () => particle.Enabled = false);

            Debris.AddItem(part, duration * 2);
        });
    }
}
