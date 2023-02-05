import { Service, OnInit } from "@flamework/core";
import { BadgeService as Badges, Players } from "@rbxts/services";

@Service({})
export class BadgeAwardService implements OnInit {
    private readonly badges = {
        OneHourPlaytime: 0o000
    };

    public onInit(): void {
        const interval = 60;
        Players.PlayerAdded.Connect(player => {
            do {
                task.wait(interval);
                const oldPlaytime = player.GetAttribute<number>("Playtime") ?? 0;
                const playtime = oldPlaytime + interval;
                player.SetAttribute("Playtime", playtime);

                switch(playtime) {
                    case 3600:
                        this._award(player, this.badges.OneHourPlaytime);
                }
            } while (player);
        });
    }

    private _award(player: Player, badgeId: number): void {
        Badges.AwardBadge(player.UserId, badgeId);
    }
}
