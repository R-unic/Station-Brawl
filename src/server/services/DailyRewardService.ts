import { Service, OnInit } from "@flamework/core";
import { DataService } from "./DataService";
import { Events, Functions } from "server/network";

@Service({})
export class DailyRewardService implements OnInit {
  public constructor(
    public readonly data: DataService
  ) { }

  public onInit(): void {
    Events.setLastDailyClaimTime.connect(player => this._setLastClaim(player));
    Functions.showDailyReward.setCallback(player => this._show(player));
  }

  private _setLastClaim(player: Player): void {
    this.data.set<number>(player, "lastDailyClaim", os.time());
  }

  private _show(player: Player): boolean {
    const lastClaim = this.data.get<number>(player, "lastDailyClaim");
    const now = os.time();
    return lastClaim ? now - lastClaim >= (3600 * 24) : true;
  }
}
