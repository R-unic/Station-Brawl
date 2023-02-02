import { Controller, OnInit } from "@flamework/core";
import { Lighting, Workspace as World } from "@rbxts/services";
import CameraShaker from "@rbxts/camera-shaker";
import { Events } from "client/network";
import { getCharacter, getPlayer, tween } from "client/utility";

@Controller({})
export class CombatController implements OnInit {
    private readonly RANGE = 2.85;
    private readonly COOLDOWN = .35;
    private readonly DAMAGE = [15, 25];

    private readonly animations = {
        "attack": [12219768623, 12219772302, 12219779172, 12219783178, 12219787450]
    };
    private readonly debounce = {
        attack: false
    };

	public onInit(): void {
        math.randomseed(tick() + os.time());
        const camera = World.CurrentCamera!;
        const shaker = new CameraShaker(0, cf => camera.CFrame = camera.CFrame.mul(cf));
        shaker.Start();
        Events.shakeCamera.connect(() => shaker.Shake(CameraShaker.Presets.Vibration));
        Events.toggleKnockedFX.connect(on => this._toggleKnockedFX(on));
    }

    public attack(): void {
        if (this.debounce.attack) return;
        this.debounce.attack = true;

        task.spawn(() => {
            const player = getPlayer();
            const character = getCharacter();
            if (character.WaitForChild<Humanoid>("Humanoid").Health <= 0) return;
            if (player.GetAttribute("BeingFinished") === true) return;

            Events.playAnim.fire("attack", this.animations.attack[(new Random).NextInteger(0, this.animations.attack.size())]);
            const result = this._rayMarch();
            if (!result) return;

            Events.playSoundInCharacter.fire("punchHit");
            const enemy = result.Instance.FindFirstAncestorOfClass("Model")
            if (!enemy) return;

            const [dmg0, dmg1] = this.DAMAGE;
            const humanoid = <Humanoid>enemy.FindFirstChild("Humanoid", true);
            if (!humanoid) return;
            if (humanoid.Health <= 0) return;

            const dmg = math.ceil(math.random(dmg0, dmg1));
            Events.damage.fire(humanoid, dmg);
            Events.createVfx.fire("Blood", result.Position, .7);
        });

        task.delay(this.COOLDOWN, () => this.debounce.attack = false);
    }

    private _toggleKnockedFX(on: boolean): void {
        const info = new TweenInfo(.5, Enum.EasingStyle.Elastic);
        tween(Lighting.KnockedCC, info, { Saturation: on ? -1 - Lighting.ColorCorrection.Saturation : 0 });
        tween(Lighting.KnockedBlur, info, { Size: on ? 16 : 0 });
    }

    private _rayMarch(): RaycastResult | undefined {
        const character = getCharacter();
        const root = character.PrimaryPart!;
        const params = new RaycastParams();
        params.FilterDescendantsInstances = [character];

        const rotation = 40;
        const lookVector = root.CFrame.LookVector.mul(this.RANGE);
        const centerResults = World.Raycast(root.Position, lookVector, params);
        const rightResults = World.Raycast(root.Position, CFrame.Angles(0, math.rad(rotation), 0).VectorToWorldSpace(lookVector), params);
        const leftResults = World.Raycast(root.Position, CFrame.Angles(0, math.rad(-rotation), 0).VectorToWorldSpace(lookVector), params);
        return centerResults || leftResults || rightResults;
    }
}
