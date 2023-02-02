import Roact from "@rbxts/roact"
import { MarketplaceService as Market } from "@rbxts/services";
import { getPlayer } from "client/utility";
import ItemCard from "../ItemCard";

interface Props {
    ItemName: string;
    Icon: string;
    ID: number;
}

// purchase button animations
export default function MoneyProductCard(props: Props) {
    let timeout = 0;
    function getRobuxPrice(): number {
        let info: DeveloperProductInfo;
        try {
            info = Market.GetProductInfo(props.ID, Enum.InfoType.Product);
        } catch(e) {
            task.wait();
            timeout += 1;
            return timeout >= 5 ? 0 : getRobuxPrice();
        }
        return info.PriceInRobux || 0;
    }

    function promptPurchase(): void {
        Market.PromptProductPurchase(getPlayer(), props.ID);
    }

    return (
        <ItemCard
            ItemName={props.ItemName}
            Icon={props.Icon}
            InfoText={`${props.ItemName} | <font color="rgb(75, 255, 75)"><b>R$${getRobuxPrice()}</b></font>`}
            ButtonText="Purchase"
            ButtonColor={Color3.fromRGB(169, 211, 144)}
            ButtonTextColor={Color3.fromRGB(169, 219, 184)}
            OnButtonClicked={promptPurchase}
        />
    );
}
