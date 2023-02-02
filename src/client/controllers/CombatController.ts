import { Controller, OnInit } from "@flamework/core";
import CameraShaker from "@rbxts/camera-shaker";
import { ContextActionService as Action, Lighting, Workspace as World } from "@rbxts/services";
import { Events } from "client/network";
import { getCharacter, tween } from "client/utility";

@Controller({})
export class CombatController implements OnInit {
    private readonly RANGE = 2.8;
    private readonly COOLDOWN = .4;
    private readonly DAMAGE = [15, 25];

    private readonly animations = {
        "attack": [12219768623, 12219772302, 12219779172, 12219783178, 12219787450]
    };
    private readonly debounce = {
        attack: false
    };

    private readonly knockedColorCorrection = new Instance("ColorCorrectionEffect");
    private readonly knockedBlur = new Instance("BlurEffect");
    private readonly defaultSaturation = 0
    private readonly defaultBlur = 0;

    private _handleAction(action: string, io: InputObject): void {
        switch(action) {
            case "Attack":
                if (io.UserInputState !== Enum.UserInputState.Begin) break;
                this._attack();
                break;
        }
    }

	public onInit(): void {
        const camera = World.CurrentCamera!;
        const shaker = new CameraShaker(0, cf => camera.CFrame = camera.CFrame.mul(cf));
        shaker.Start();
        Events.shakeCamera.connect(() => shaker.Shake(CameraShaker.Presets.Bump));

        this.knockedColorCorrection.Name = "KnockedCC";
        this.knockedBlur.Name = "KnockedBlur";
        this.knockedColorCorrection.Saturation = this.defaultSaturation;
        this.knockedBlur.Size = this.defaultBlur;
        Events.toggleKnockedFX.connect(on => this._toggleKnockedFX(on));

        Action.BindAction("Attack", (action, _, io) => this._handleAction(action, io), true, Enum.UserInputType.MouseButton1);
    }

    private _toggleKnockedFX(on: boolean): void {
        const info = new TweenInfo(.5, Enum.EasingStyle.Elastic);
        tween(this.knockedColorCorrection, info, { Saturation: on ? -1 - Lighting.ColorCorrection.Saturation : this.defaultSaturation });
        tween(this.knockedBlur, info, { Size: on ? 16 : this.defaultBlur });
    }

    private _rayMarch(): RaycastResult | undefined {
        const character = getCharacter();
        const root = character.PrimaryPart!;
        const params = new RaycastParams();
        params.FilterDescendantsInstances = [character];

        const rotation = 40
        const lookVector = root.CFrame.LookVector.mul(this.RANGE);
        const centerResults = World.Raycast(root.Position, lookVector, params);
        const rightResults = World.Raycast(root.Position, CFrame.Angles(0, math.rad(rotation), 0).VectorToWorldSpace(lookVector), params);
        const leftResults = World.Raycast(root.Position, CFrame.Angles(0, math.rad(-rotation), 0).VectorToWorldSpace(lookVector), params);
        return centerResults || leftResults || rightResults;
    }

    private _attack(): void {
        if (this.debounce.attack) return;
        this.debounce.attack = true;

        task.spawn(() => {
            const player = getCharacter();
            const character = getCharacter();
            if (character.WaitForChild<Humanoid>("Humanoid").Health <= 0) return;
            if (player.GetAttribute("BeingFinished")) return;

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
}
