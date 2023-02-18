import { Service, OnInit } from "@flamework/core";
import { Timer } from "@rbxts/timer";
import { Events, Functions } from "server/network";
import { MapRotationService } from "./MapRotationService";

type MapName = Exclude<keyof ServerStorage["Maps"], keyof Folder>;

@Service({})
export class MapVotingService implements OnInit {
  private readonly playerVotes: Map<Player, MapName> = new Map();

  public constructor(
    private readonly mapRotation: MapRotationService
  ) { }

  public onInit(): void {
    Events.voteForMap.connect((player, mapName) => this.playerVotes.set(player, mapName));
    Functions.getMapVotes.setCallback((player, mapName) => this._getMapVotes().get(mapName));
  }

  public removePrompt(): void {
    Events.removeMapVotePrompt.broadcast();
  }

  public async determineMap(votingTime: number): Promise<MapName> {
    Events.promptMapVote.broadcast();
    const timer = new Timer(votingTime);
    timer.start();
    timer.completed.Wait();

    const mapVotes = this._getMapVotes();
    const voteCounts: number[] = [];
    for (const [_, votes] of mapVotes)
      voteCounts.push(votes);

    let chosenMap: MapName = this.mapRotation.getRandom();
    const topVotes = voteCounts.sort((a, b) => a > b)[0];
    for (const [mapName, votes] of mapVotes)
      if (votes === topVotes)
        chosenMap = mapName;

    return chosenMap;
  }

  private _getMapVotes(): Map<MapName, number> {
    const mapVotes = new Map<MapName, number>();
    for (const [_, mapName] of this.playerVotes) {
      const currentVotes = mapVotes.get(mapName) ?? 0;
      mapVotes.set(mapName, currentVotes + 1);
    }
    return mapVotes;
  }
}
