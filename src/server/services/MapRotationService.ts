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
    const { Day: day, Month: month } = date.ToUniversalTime();
    const daysInMonth = this._getMonthDays(month);
    const weeksInMonth = daysInMonth / 7;
    const week = math.ceil(day / 7);
    const weekRounded = math.ceil(week / weeksInMonth);
    print(week / weeksInMonth, weekRounded);
    this.maps = rotations[weekRounded - 1];
  }

  private _getMonthDays(month: number): number {
    switch (month) {
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;

      case 2:
        return 28;

      default:
        return 31;
    }
  }
}
