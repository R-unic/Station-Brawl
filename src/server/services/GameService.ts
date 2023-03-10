import { Service, OnInit } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Players, RunService as Runtime, ServerStorage, Workspace as World } from "@rbxts/services";
import { Timer } from "@rbxts/timer";
import { Events, Functions } from "server/network";
import { RoundState } from "shared/Interfaces";
import { MapVotingService } from "./MapVotingService";

const testing = Runtime.IsStudio();

@Service({})
export class GameService implements OnInit {
  private readonly INTERMISSION_LENGTH = testing ? 15 : 30;
  private readonly ROUND_LENGTH = testing ? 20 : 120;
  private readonly lobbySpawns = World.Lobby.Spawns;

  public roundState: RoundState = RoundState.Intermission;

  public constructor(
    private readonly mapVoting: MapVotingService
  ) { }

  public onInit(): void {
    Functions.getRoundState.setCallback(() => this.roundState);
    Players.PlayerAdded.Connect(player => {
      player.CharacterAdded.Once(character => {
        if (this.roundState === RoundState.InGame)
          this._addPlayer(character);
        else
          this._removePlayer(character);
      })
    });
    task.delay(20, () => {
      for (const map of ServerStorage.WaitForChild("Maps").GetChildren<Folder>())
        map.SetAttribute("DescendantCount", map.GetDescendants().size());
      this._endRound();
    });
  }

  private _endRound(): any {
    this.roundState = RoundState.Intermission;
    this._toggleSpawns(this.lobbySpawns, true);
    this._getCurrentMap()?.Destroy();
    this._removePlayers();

    const intermissionJanitor = new Janitor;
    const timer = new Timer(this.INTERMISSION_LENGTH);
    timer.start();

    intermissionJanitor.Add(timer.completed.Connect(() => intermissionJanitor.Destroy()), "Disconnect");
    intermissionJanitor.Add(timer.secondReached.Connect(() => this._updateTimer(timer.getTimeLeft())), "Disconnect");
    intermissionJanitor.Add(timer, "destroy");
    this.mapVoting.determineMap(this.INTERMISSION_LENGTH).then(mapName => {
      const mapTemplate = ServerStorage.Maps[mapName];
      const expectedDescendants = mapTemplate.GetAttribute<number>("DescendantCount")!;
      const map = mapTemplate.Clone();
      map.Parent = World;
      map.SetAttribute("CurrentMap", true);

      do task.wait(.25); while (map.GetDescendants().size() < expectedDescendants);
      this._startRound();
    })
  }

  private _startRound(): void {
    this.roundState = RoundState.InGame;
    this._toggleSpawns(this.lobbySpawns, false);
    this._addPlayers();
    this.mapVoting.removePrompt();

    const roundJanitor = new Janitor;
    const timer = new Timer(this.ROUND_LENGTH);
    timer.start();

    roundJanitor.Add(timer.completed.Connect(() => roundJanitor.Destroy()), "Disconnect");
    roundJanitor.Add(timer.secondReached.Connect(() => this._updateTimer(timer.getTimeLeft())), "Disconnect");
    roundJanitor.Add(timer, "destroy");
    roundJanitor.Add(() => this._endRound());
  }

  private _getCurrentMap(): Folder & { Spawns: Folder; } | undefined {
    return World.GetChildren().find(c => c.GetAttribute("CurrentMap")) as Nullable<Folder & { Spawns: Folder; }>;
  }

  private _updateTimer(remaining: number): void {
    const title = this.roundState === RoundState.InGame ? "In Game" : "Intermission";
    const mins = math.floor(remaining / 60);
    const secs = remaining % 60;
    const remainingString = "%2d:%02d".format(mins, secs);
    Events.updateTimer.broadcast(title, remainingString);
  }

  private _getRandomSpawn(spawns: Folder): SpawnLocation {
    const spawnList = spawns.GetChildren<SpawnLocation>();
    return spawnList[(new Random).NextInteger(1, spawnList.size()) - 1];
  }

  private _toggleSpawns(spawns: Folder, on: boolean): void {
    for (const spawn of spawns.GetChildren<SpawnLocation>())
      spawn.Enabled = on;
  }

  private _removePlayers(): void {
    for (const player of Players.GetPlayers())
      this._removePlayer(player.Character!);
  }

  private _removePlayer(character: Model) {
    const spawn = this._getRandomSpawn(this.lobbySpawns);
    this._movePlayer(character, spawn.Position);
  }

  private _addPlayers(): void {
    for (const player of Players.GetPlayers())
      this._addPlayer(player.Character!);
  }

  private _addPlayer(character: Model): void {
    const map = this._getCurrentMap()!;
    const spawn = this._getRandomSpawn(map.Spawns);
    this._movePlayer(character, spawn.Position);
  }

  private _movePlayer(character: Model, position: Vector3): void {
    const torso = character.WaitForChild<Part>("UpperTorso", 4);
    if (!torso) return;
    torso.CFrame = new CFrame(position, torso.CFrame.LookVector).add(new Vector3(0, 7, 0));
  }
}
