import Roact from "@rbxts/roact";
import ItemCard from "./ItemCard";

interface Props {
    ItemName: string;
    Icon: string;
    InfoText?: string;
}

interface State {
    Equipped: boolean;
}

class InventoryCard extends Roact.Component<Props, State> {
    private readonly equippedColor = Color3.fromRGB(212, 171, 143);
    private readonly unequippedColor = Color3.fromRGB(143, 194, 212);

    private _equip(equipped?: boolean): void {
        this.setState({ Equipped: equipped ?? !this.state.Equipped });
    }

    protected didMount(): void {
        this._equip(false);
    }

    public render(): Roact.Element {
        return (
            <ItemCard
                ItemName={this.props.ItemName}
                Icon={this.props.Icon}
                InfoText={this.props.InfoText ?? this.props.ItemName}
                ButtonText={this.state.Equipped ? "Unequip" : "Equip"}
                ButtonTextColor={this.state.Equipped ? this.equippedColor : this.unequippedColor}
                ButtonColor={this.state.Equipped ? this.equippedColor : this.unequippedColor}
                OnButtonClicked={() => this._equip()}
            />
        )
    }
}

export = InventoryCard;
