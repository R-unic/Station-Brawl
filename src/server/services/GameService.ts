import { Service, OnInit } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Players } from "@rbxts/services";
import { Timer } from "@rbxts/timer";

enum RoundState {
  Intermission,
  InGame
}

@Service({})
export class GameService implements OnInit {
  private readonly INTERMISSION_LENGTH = 15;
  private readonly ROUND_LENGTH = 25;

  private roundState: RoundState = RoundState.Intermission;

  public onInit(): void {
    Players.PlayerAdded.Connect(player => {
      player.CharacterAdded.Once(character => {
        if (this.roundState === RoundState.InGame)
          this._addPlayer(character);
        else
          this._removePlayer(character);
      })
    });

    this._endRound();
  }

  private _endRound(): any {
    this.roundState = RoundState.Intermission;
    this._removePlayers();

    const intermissionJanitor = new Janitor;
    const timer = new Timer(this.INTERMISSION_LENGTH);
    intermissionJanitor.Add(timer.secondReached.Connect(() => this._updateTimer(timer.getTimeLeft())), "Disconnect");
    intermissionJanitor.Add(timer, "destroy");
    intermissionJanitor.Add(() => this._startRound());
    intermissionJanitor.Add(timer.completed.Connect(() => intermissionJanitor.Destroy()), "Disconnect");

    // TODO: prompt map vote and collect results
  }

  private _startRound(): void {
    this.roundState = RoundState.InGame;
    this._addPlayers();

    const roundJanitor = new Janitor;
    const timer = new Timer(this.ROUND_LENGTH);
    roundJanitor.Add(timer.secondReached.Connect(() => this._updateTimer(timer.getTimeLeft())), "Disconnect");
    roundJanitor.Add(timer, "destroy");
    roundJanitor.Add(() => this._endRound());
    roundJanitor.Add(timer.completed.Connect(() => roundJanitor.Destroy()), "Disconnect");

    // TODO: process map results and move map into scene
  }

  private _updateTimer(remaining: number): void {
    const title = this.roundState === RoundState.InGame ? "In Game" : "Intermission";
  }

  private _removePlayers(): void {
    for (const player of Players.GetPlayers())
      this._removePlayer(player.Character!);
  }

  private _removePlayer(character: Model) {
    // TODO: remove player from game
  }

  private _addPlayers(): void {
    for (const player of Players.GetPlayers())
      this._addPlayer(player.Character!);
  }

  private _addPlayer(character: Model): void {
    // TODO: add player to game
  }
}
