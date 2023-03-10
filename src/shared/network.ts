import { Networking } from "@flamework/networking";
import { ReplicatedStorage as Replicated } from "@rbxts/services";
import { Rarity } from "./dataInterfaces/Rarity";
import { RoundState, WeaponData } from "./Interfaces";

interface ServerEvents {
  initializeData(): void;
  setData(key: string, value: unknown): void;
  setLastDailyClaimTime(): void;
  addCaseToInventory(name: string, image: string, rarity: Rarity): void;
  addEffectToInventory(name: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>, image: string, rarity: Rarity): void;
  addWeaponToInventory(name: Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>, image: string, rarity: Rarity): void;

  playAnim(name: string, id: number, character?: Model, dontCancel?: boolean): void;
  stopAnim(name: string): void;
  playSoundInCharacter(name: string, volume?: number): void;
  damage(humanoid: Humanoid, amount: number): void;
  anchor(character: Model, on?: boolean, anchorPart?: string): void;

  createImpactVFX(position: Vector3, duration: number): void;
  createDamageCounter(character: Model, damage: number, duration: number): void;

  equipWeapon(name: Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>): void;
  unequipWeapon(name: Exclude<keyof typeof Replicated.Assets.Weapons, keyof Folder>): void;
  addEffectParticles(character: Model, effectName: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>): void;
  removeEffectParticles(character: Model, effectName: Exclude<keyof typeof Replicated.Assets.Effects, keyof Folder>): void;

  voteForMap(mapName: Exclude<keyof ServerStorage["Maps"], keyof Folder>): void;
  mapVotingComplete(): void;
}

interface ClientEvents {
  dataUpdate(key: string, value: unknown): void;
  loadWeapon(data: WeaponData): void;
  unloadWeapon(): void;
  toggleCinematicBars(on: boolean): void;
  toggleKnockedFX(on: boolean): void;
  shakeCamera(): void;
  finishedEmote(): void;

  promptMapVote(): void;
  removeMapVotePrompt(): void;
  updateTimer(roundState: string, remainingTime: string): void;
  updateMapChoiceVotes(mapName: Exclude<keyof ServerStorage["Maps"], keyof Folder>, votes: number): void;
}

interface ServerFunctions {
  getData(key: string): unknown;
  showDailyReward(): boolean;
  getRandomMap(): Exclude<keyof ServerStorage["Maps"], keyof Folder>;
  getMapVotes(mapName: Exclude<keyof ServerStorage["Maps"], keyof Folder>): Nullable<number>;
  getRoundState(): RoundState;
  getDataTable(): unknown;
}

interface ClientFunctions { }

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
