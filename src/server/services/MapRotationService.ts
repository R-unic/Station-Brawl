import { Service, OnInit } from "@flamework/core";
import { Functions } from "server/network";

type MapName = Exclude<keyof ServerStorage["Maps"], keyof Folder>;
const rotations: MapName[][] = [
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"]
];


@Service({})
export class MapRotationService implements OnInit {
  public readonly pool: MapName[]
  public constructor() {
    const date = DateTime.now();
    const { Day: day } = date.ToUniversalTime();
    const week = math.ceil(day / 7);
    this.pool = rotations[week - 1];
  }

  public onInit(): void {
    Functions.getRandomMap.setCallback(() => this.getRandom());
  }

  public getRandom(): MapName {
    return this.pool[(new Random).NextInteger(1, this.pool.size()) - 1];
  }
}
