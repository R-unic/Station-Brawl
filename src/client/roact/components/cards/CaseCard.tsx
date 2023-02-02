import Roact from "@rbxts/roact";
import ItemCard from "./ItemCard";

interface Props {
    ItemName: string;
    Icon: string;
}

export default function CaseCard(props: Props) {
    const openColor = Color3.fromRGB(143, 194, 212);
    return (
        <ItemCard
            ItemName={props.ItemName}
            Icon={props.Icon}
            InfoText={props.ItemName}
            ButtonText="Open"
            ButtonTextColor={openColor}
            ButtonColor={openColor}
            OnButtonClicked={card => {
                card.Destroy();
                // open case roll ui
            }}
        />
    )
}
