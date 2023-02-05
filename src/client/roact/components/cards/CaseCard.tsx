import { Dependency } from "@flamework/core";
import Roact from "@rbxts/roact";

import { Events, Functions } from "client/network";
import { CaseRollController } from "client/controllers/CaseRollController";
import { CaseItemInfo } from "shared/dataInterfaces/CaseItemInfo";
import { RarityColors } from "shared/dataInterfaces/Rarity";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";
import ItemCard from "./ItemCard";

interface Props {
    ItemName: string;
    Icon: string;
    CardName?: string;
    CaseInfo: CaseItemInfo;
}

export default function CaseCard(props: Props) {
    const openColor = Color3.fromRGB(143, 194, 212);
    const rarityColor = RarityColors[props.CaseInfo.rarity];
    const primaryColor = Color3.fromRGB(204, 204, 204).Lerp(rarityColor, .5);
    const secondaryColor = Color3.fromRGB(150, 150, 150).Lerp(rarityColor, .5);
    return (
        <ItemCard
            CardName={props.CardName}
            ItemName={props.ItemName}
            Icon={props.Icon}
            InfoText={props.ItemName}
            ButtonText="Open"
            ButtonTextColor={openColor}
            ButtonColor={openColor}
            PrimaryGradientColor={primaryColor}
            SecondaryGradientColor={secondaryColor}
            OnButtonClicked={async card => {
                card.Destroy();
                const caseRoller = Dependency<CaseRollController>();
                caseRoller.open(props.CaseInfo);

                const inventory = (await Functions.getData.invoke("inventory")) as InventoryInfo;
                const cases = inventory.cases.filter(_case => _case.name !== props.ItemName.split(" Case")[0]);
                const newInventory: InventoryInfo = {
                    cases: cases,
                    effects: inventory.effects
                };
                Events.setData("inventory", newInventory);
            }}
        />
    )
}
