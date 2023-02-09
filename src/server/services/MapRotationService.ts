import { Service } from "@flamework/core";

const rotations = [
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"],
  ["Gas Station", "Gas Station", "Gas Station", "Gas Station", "Gas Station"]
];

@Service({})
export class MapRotationService {
  public readonly maps: string[]

  public constructor() {
    const date = DateTime.now();
    const { Day: day } = date.ToUniversalTime();
    const week = math.ceil(day / 7);
    this.maps = rotations[week - 1];
  }
}
