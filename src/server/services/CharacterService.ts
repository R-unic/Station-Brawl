import { Service, OnInit } from "@flamework/core";
import { Players, ReplicatedStorage as Replicated } from "@rbxts/services";
import { Janitor } from "@rbxts/janitor";
import { Events } from "server/network";
import { randomElement } from "shared/utility/ArrayUtil";
import { RoundState } from "shared/Interfaces";
import { SoundPlayerService } from "./SoundPlayerService";
import { GameService } from "./GameService";
import { DataService } from "./DataService";
import ragdoll from "server/utility/ragdoll";
import anchor from "server/utility/anchor";

@Service({})
export class CharacterService implements OnInit {
  private readonly animations = {
    "finishers": [[12296520631, 12296522679]] // killer, victim
  };

  public constructor(
    private readonly soundPlayer: SoundPlayerService,
    private readonly _game: GameService,
    private readonly data: DataService
  ) { }

  public onInit(): void {
    Events.anchor.connect((_, character, on, anchorPart) => anchor(character, on, anchorPart));
    Events.damage.connect((player, humanoid, dmg) => this._damage(player, humanoid, dmg));
    Events.addEffectParticles.connect((player, character, effectName) => this._addEffectParticles(character, effectName));
    Events.removeEffectParticles.connect((player, character, effectName) => this._removeEffectParticles(character, effectName));
    Players.PlayerAdded.Connect(player => this._respawn(player));
  }

  private _respawn(player: Player): void {
    player.LoadCharacter();
    this._addCharacterLife(player.Character!);
  }

  private _addCharacterLife(character: Model): void {
    const characterLifeJanitor = new Janitor;
    const humanoid = character.WaitForChild<Humanoid>("Humanoid");
    characterLifeJanitor.Add(humanoid.Died.Connect(() => {
      this._knockout(undefined, humanoid);
      characterLifeJanitor.Destroy();
    }));
  }

  private _addEffectParticles(character: Model, effectName: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>): void {
    const effectParticles = Replicated.Assets.Effects[effectName].GetChildren<ParticleEmitter>();
    for (const particle of effectParticles) {
      particle.SetAttribute("EffectName", effectName);
      particle.Parent = character.PrimaryPart;
    }
  }

  private _removeEffectParticles(character: Model, effectName: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>): void {
    for (const particle of character.PrimaryPart!.GetChildren<ParticleEmitter>())
      if (particle.GetAttribute("EffectName") === effectName)
        particle.Destroy();
  }

  private _damage(player: Player, victimHumanoid: Humanoid, dmg: number): void {
    if (victimHumanoid.Health <= 0) return;
    victimHumanoid.TakeDamage(dmg);

    const victimCharacter = <Model>victimHumanoid.Parent;
    const victim = Players.GetPlayerFromCharacter(victimCharacter);
    if (victim)
      Events.shakeCamera.fire(victim);

    if (victimHumanoid.Health > 0) return;
    this._knockout(player, victimHumanoid);
  }

  private _knockout(killer: Nullable<Player>, victimHumanoid: Humanoid) {
    const promptJanitor = new Janitor;
    const victimCharacter = <Model>victimHumanoid.Parent;
    print(victimCharacter);
    const victim = Players.GetPlayerFromCharacter(victimCharacter);
    if (this._game.roundState !== RoundState.InGame || !killer)
      if (victim)
        return this._respawn(victim);
      else
        return;
    if (!victimCharacter || !victimCharacter.PrimaryPart)
      if (victim)
        return this._respawn(victim);
      else
        return;

    ragdoll(victimCharacter);
    if (victim) {
      this.soundPlayer.playInCharacter(victim, "knockout", 1.5);
      Events.toggleKnockedFX.fire(victim, true);

      const finishPrompt = new Instance("ProximityPrompt");
      finishPrompt.ActionText = "Finish";
      finishPrompt.ObjectText = victimCharacter.Name;
      finishPrompt.HoldDuration = .6;
      finishPrompt.KeyboardKeyCode = Enum.KeyCode.E;
      finishPrompt.GamepadKeyCode = Enum.KeyCode.ButtonX;
      finishPrompt.Enabled = true;
      finishPrompt.Parent = victimCharacter.PrimaryPart!;
      promptJanitor.Add(finishPrompt.Triggered.Once(player => {
        if (player === victim) return;
        if (player !== killer) return;
        this._doFinisher(killer, victim);
        this.data.increment(killer, "careerKills");
      }));
    }

    task.delay(6, () => {
      if (victim?.GetAttribute("BeingFinished")) return;
      promptJanitor.Cleanup();

      if (!victim)
        victimCharacter.Destroy();
      else {
        Events.toggleKnockedFX.fire(victim, false);
        this._respawn(victim);
        if (killer)
          this.data.increment(killer, "careerKills");
      }
    });
  }

  private _doFinisher(killer: Player, victim: Player): void {
    victim.SetAttribute("BeingFinished", true);
    this._respawn(victim)
    const victimCharacter = victim.Character!;

    const victimTorso = victimCharacter.WaitForChild<Part>("UpperTorso");
    const killerTorso = killer.Character!.WaitForChild<Part>("UpperTorso");
    anchor(victimCharacter, true, "HumanoidRootPart");
    anchor(killer.Character, true, "HumanoidRootPart");

    const negativeDistance = killerTorso.CFrame.LookVector.mul(.8);
    victimTorso.CFrame = killerTorso.CFrame.add(killerTorso.CFrame.LookVector.sub(negativeDistance));

    Events.toggleCinematicBars.fire([killer, victim], true);
    const [killerAnimationID, victimAnimationID] = randomElement(this.animations.finishers);
    Events.playAnim.predict(killer, "finisher", killerAnimationID);
    Events.playAnim.predict(victim, "beingFinished", victimAnimationID, victimCharacter);
  }
}
