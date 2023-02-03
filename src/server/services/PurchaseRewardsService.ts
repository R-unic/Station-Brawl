import { Service, OnInit } from "@flamework/core";
import { MarketplaceService as Market, Players } from "@rbxts/services";
import { DataService } from "./DataService";
import Logger from "shared/Logger";

const { ProductPurchaseDecision } = Enum;

@Service({})
export class PurchaseRewardsService implements OnInit {
    private readonly moneyIDs: number[] = [1369201265, 1369202529, 1369203219, 1369203784, 1369203791, 1369203792];

    public constructor(
        private readonly data: DataService
    ) {}

    public onInit(): void {
        Market.ProcessReceipt = receiptInfo => {
            if (this.moneyIDs.includes(receiptInfo.ProductId)) {
                const info = Market.GetProductInfo(receiptInfo.ProductId, Enum.InfoType.Product);
                const amount = tonumber(info.Name.split("$")[1]);
                if (!amount)
                    return ProductPurchaseDecision.NotProcessedYet;

                const player = Players.GetPlayerByUserId(receiptInfo.PlayerId)!;
                const money = this.data.get<number>(player, "money");
                money.Increment(amount);

                Logger.$discord(player, "Currency Purchase", `Purchased ${info.Name} (R$${info.PriceInRobux ?? "?"})`);
                return ProductPurchaseDecision.PurchaseGranted;
            }
            return ProductPurchaseDecision.NotProcessedYet;
        }
    }
}
