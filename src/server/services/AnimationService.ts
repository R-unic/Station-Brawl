import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Janitor } from "@rbxts/janitor";
import { Events } from "server/network";
import anchor from "server/utility/anchor";

@Service({})
export class AnimationService implements OnInit {
    private _plrAnimations = new Map<Player, Map<string, Animation>>();
    private _plrTracks = new Map<Player, Map<string, AnimationTrack[]>>();

    public onInit(): void {
        Events.playAnim.connect((player, name, id, character?) => this._playAnimation(player, name, id, character));
        Events.stopAnim.connect((player, name) => this._stopAnimation(player, name));
        Players.PlayerAdded.Connect(player =>
            player.CharacterAdded.Connect(character => {
                const animations = new Map<string, Animation>();
                const tracks = new Map<string, AnimationTrack[]>();
                const create = (name: string) => {
                    animations.set(name, this._createAnimation(name, character));
                    tracks.set(name, []);
                }

                create("attack");
                create("finisher");
                create("beingFinished");
                create("emote")

                this._plrAnimations.set(player, animations);
                this._plrTracks.set(player, tracks);
            })
        );
    }

    private _createAnimation(name: string, parent?: Instance): Animation {
        const animation = new Instance("Animation");
        animation.Name = name;
        animation.Parent = parent;
        return animation;
    }

    private _stopAnimation(player: Player, name: string): void {
        const tracks = this._plrTracks.get(player)?.get(name)!;
        for (const oldTrack of tracks) {
            oldTrack.Stop();
            this._finishTrack(player, name, oldTrack, tracks);
        }
        this._plrTracks.get(player)?.set(name, tracks);
    }

    private _playAnimation(player: Player, name: string, id: number, character = player.Character ?? player.CharacterAdded.Wait()[0]): void {
        const humanoid = <Humanoid>character.WaitForChild("Humanoid");
        const animation = this._plrAnimations.get(player)?.get(name)!;
        const tracks = this._plrTracks.get(player)?.get(name)!;

        animation.AnimationId = `rbxassetid://${id}`;
        const track = humanoid.LoadAnimation(animation);
        if (name === "attack")
            for (const oldTrack of tracks)
                oldTrack.Stop();

        tracks.push(track);

        const finishJanitor = new Janitor;
        finishJanitor.Add(() => this._finishTrack(player, name, track, tracks));
        finishJanitor.Add(track.Stopped.Once(() => finishJanitor.Cleanup()));
        finishJanitor.Add(track.Ended.Once(() => finishJanitor.Cleanup()));
        track.Play();

        switch(name) {
            case "beingFinished":
            case "finisher":
                track.AdjustSpeed(1.25);
                break;
        }

        this._plrTracks.get(player)?.set(name, tracks);
    }

    private _finishTrack(player: Player, name: string, track: AnimationTrack, tracks: AnimationTrack[]): void {
        track.Destroy();
        tracks.remove(tracks.indexOf(track));

        const respawnDelay = .1;
        switch(name) {
            case "beingFinished":
                this._resetFinisherState(player);
                task.delay(respawnDelay, () => {
                    player.LoadCharacter();
                    player.SetAttribute("BeingFinished", false);
                    Events.toggleKnockedFX.fire(player, false);
                });
                break;
            case "finisher":
                this._resetFinisherState(player);
                break;
            case "emote":
                Events.finishedEmote.fire(player);
                break;
        }
    }

    private _resetFinisherState(player: Player): void {
        anchor(player.Character, false);
        Events.toggleCinematicBars.fire(player, false);
    }
}
