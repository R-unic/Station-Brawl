import { HttpService as HTTP, RunService as Runtime } from "@rbxts/services";
import { $print, $warn } from "rbxts-transform-debug";
import { HttpException } from "./Exceptions";

export default class Logger {
    private static webhookURL = "https://hooks.hyra.io/api/webhooks/1071150477628162150/7P-dGMwG60UzH-HXcm7rcanJCYSUYTxKCXfarkt5RlB9AdVpugelUXjdM1O5L6m76UXC";
    private static thumbnails = {
        Money: "https://tenor.com/view/hasbulla-money-gif-25191018"
    }

    public static $discord(player: Player, logType: string, message: string, thumbnail?: keyof typeof Logger.thumbnails): void {
        const isPurchase = logType.lower().match("purchase") !== undefined;
        const data = HTTP.JSONEncode({
            username: "FYFGS Logger",
            content: isPurchase ? "u got moneyz <@415233686758359051>, <@468705163641749545>" : "",
            allowed_mentions: {
                users: isPurchase ? [ "415233686758359051", "468705163641749545" ] : [],
            },
            embeds: [
                {
                    title: logType,
                    author: {
                        name: player.Name,
                        url: "https://www.roblox.com/users/" + player.UserId + "/profile"
                    },
                    thumbnail: { url: this.thumbnails[thumbnail ?? "Money"] },
                    description: message,
                    timestamp: DateTime.now().ToIsoDate(),
                    color: 0xe09f36
                }
            ]
        });

        try {
            HTTP.PostAsync(this.webhookURL, data)
        } catch(e) {
            throw new HttpException(e);
        }
    }

    public static $debug(message: string): void {
        if (!Runtime.IsStudio()) return;
        $print(message);
    }

    public static $warn(message: string): void {
        $warn(message);
    }
}
