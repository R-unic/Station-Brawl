import Roact from "@rbxts/roact";
import { Rarity, RarityColors } from "shared/dataInterfaces/Rarity";
import ItemCard from "./ItemCard";

interface Props {
    ItemName: string;
    Icon: string;
    InfoText?: string;
    CardName?: string;
    OnlyOneEquippable?: boolean;
    Rarity: Rarity;
    OnEquip: (on: boolean) => void;
}

interface State {
    Equipped: boolean;
}

const inventoryCards: InventoryItemCard[] = [];
class InventoryItemCard extends Roact.Component<Props, State> {
    private readonly equippedColor = Color3.fromRGB(212, 171, 143);
    private readonly unequippedColor = Color3.fromRGB(143, 194, 212);

    public equip(equipped?: boolean): void {
        const on = equipped ?? !this.state.Equipped;
        this.setState({ Equipped: on });
        this.props.OnEquip(on);
        if (this.props.OnlyOneEquippable ?? false)
            for (const inventoryCard of inventoryCards)
                if (inventoryCard !== this)
                    inventoryCard.equip(!equipped);
    }

    protected didMount(): void {
        inventoryCards.push(this);
        this.equip(false);
    }

    public render(): Roact.Element {
        const rarityColor = RarityColors[this.props.Rarity];
        const primaryColor = Color3.fromRGB(204, 204, 204).Lerp(rarityColor, .5);
        const secondaryColor = Color3.fromRGB(150, 150, 150).Lerp(rarityColor, .5);
        return (
            <ItemCard
                CardName={this.props.CardName}
                ItemName={this.props.ItemName}
                Icon={this.props.Icon}
                InfoText={this.props.InfoText ?? this.props.ItemName}
                ButtonText={this.state.Equipped ? "Unequip" : "Equip"}
                ButtonTextColor={this.state.Equipped ? this.equippedColor : this.unequippedColor}
                ButtonColor={this.state.Equipped ? this.equippedColor : this.unequippedColor}
                PrimaryGradientColor={primaryColor}
                SecondaryGradientColor={secondaryColor}
                OnButtonClicked={() => this.equip()}
            />
        )
    }
}

export = InventoryItemCard;
