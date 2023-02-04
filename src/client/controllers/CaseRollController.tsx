import { Controller } from "@flamework/core";
import { Workspace as World } from "@rbxts/services";
import { StrictMap } from "@rbxts/strict-map";
import { Janitor } from "@rbxts/janitor";
import Roact, { mount, unmount } from "@rbxts/roact";

import { Events } from "client/network";
import { WINDOW_REFS } from "client/roact/Refs";
import { getUI } from "client/utility";
import { randomElement } from "shared/utility/ArrayUtil";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { CaseReward, CaseRewardKind } from "shared/Interfaces";
import { LootPoolController } from "./LootPoolController";
import CaseRewardModal from "client/roact/components/CaseRewardModal";
import ItemCard from "client/roact/components/cards/ItemCard";

const { CameraType } = Enum;

@Controller({})
export class CaseRollController {
    private readonly cameraPart = World.CaseRollScene.CaseCamera;
    private readonly janitor = new Janitor;

    public constructor(
        private readonly lootPool: LootPoolController
    ) {}

    public cleanup(): void {
        this.janitor.Cleanup();
    }

    public open(_case: CaseItemInfo): void {
        Events.toggleCinematicBars.predict(true);
        const defaultEnabled = new StrictMap<string, boolean>();
        for (const [key, ref] of WINDOW_REFS.entries()) {
            const screen = ref.getValue()!;
            defaultEnabled.set(key, screen.Enabled);
            screen.Enabled = false;
        }

        const camera = World.CurrentCamera!;
        camera.CameraType = CameraType.Scriptable;
        camera.CFrame = this.cameraPart.CFrame;
        camera.FieldOfView = 40;

        // do case animation blah blah

        const reward = this._getReward(_case);
        const modal = (
            <CaseRewardModal>
                <ItemCard
                    ItemName={reward.name}
                    Icon={reward.image}
                    InfoText={reward.name}
                    ButtonText={this._getRewardKindString(reward.kind)}
                    AnchorPoint={new Vector2(.5, .5)}
                    Position={UDim2.fromScale(.5, .425)}
                    Size={UDim2.fromScale(.125, .3)}
                    ButtonColor={Color3.fromRGB(48, 54, 64)}
                    ButtonTextColor={Color3.fromRGB(168, 179, 191)}
                    OnButtonClicked={() => {}}
                />
            </CaseRewardModal>
        );

        const modalHandle = mount(modal, getUI());
        this.janitor.Add(() => {
            Events.toggleCinematicBars.predict(false);
            camera.CameraType = CameraType.Custom;
            camera.FieldOfView = 70;

            unmount(modalHandle);
            for (const [key, enabled] of defaultEnabled.entries()) {
                const ref = WINDOW_REFS.mustGet(key);
                const screen = ref.getValue()!;
                screen.Enabled = enabled;
            }
        });
    }

    private _getRewardKindString(kind: CaseRewardKind): string {
        switch(kind) {
            case CaseRewardKind.Effect:
                return "Effect";
        }
    }

    private _getReward(_case: CaseItemInfo): CaseReward {
        const pool = this.lootPool.getFrom(_case);
        return randomElement(pool);
    }
}
