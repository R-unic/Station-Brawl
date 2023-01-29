import { Controller, OnInit } from "@flamework/core";
import { ContextActionService as Action, Workspace as World } from "@rbxts/services";
import { GlobalEvents } from "shared/network";
import { getCharacter } from "client/utility";

@Controller({})
export class CombatController implements OnInit {
    private readonly RANGE = 2.8;
    private readonly COOLDOWN = .4;
    private readonly DAMAGE = [15, 25];

    private readonly anims = {
        "attack": [12219768623, 12219772302, 12219779172, 12219783178, 12219787450]
    };
    private readonly db = {
        attack: false
    };

    private _handleAction(action: string, io: InputObject): void {
        switch(action) {
            case "Attack":
                if (io.UserInputState !== Enum.UserInputState.Begin) break;
                this.attack();
                break;
        }
    }

	public onInit(): void {
        Action.BindAction("Attack", (action, _, io) => this._handleAction(action, io), true, Enum.UserInputType.MouseButton1);
    }

    public attack(): void {
        if (this.db.attack) return;
        this.db.attack = true;
        GlobalEvents.client.playAnim.fire("attack", this.anims.attack[(new Random).NextInteger(0, this.anims.attack.size())]);
        GlobalEvents.client.playSoundInCharacter.fire("punchSwing");

        const char = getCharacter();
        const root = char.PrimaryPart!;
        const params = new RaycastParams();
        params.FilterDescendantsInstances = [char];

        const result = World.Raycast(root.Position, root.CFrame.LookVector.mul(this.RANGE), params);
        if (result) {
            const enemy = result.Instance.FindFirstAncestorOfClass("Model")
            if (enemy) {
                const [dmg0, dmg1] = this.DAMAGE;
                const humanoid = <Humanoid>enemy.WaitForChild("Humanoid");
                const dmg = math.ceil(math.random(dmg0, dmg1));
                GlobalEvents.client.damage.fire(humanoid, dmg);
                GlobalEvents.client.playSoundInCharacter.fire("punchHit");
            }
        }

        task.delay(this.COOLDOWN, () => this.db.attack = false);
    }
}
