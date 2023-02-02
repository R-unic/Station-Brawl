import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Janitor } from "@rbxts/janitor";
import { Events } from "server/network";
import anchor from "server/utility/anchor";

@Service({ loadOrder: 0 })
export class AnimationService implements OnInit {
    private playerAnimations = new Map<Player, Map<string, Animation>>();
    private playerTracks = new Map<Player, Map<string, AnimationTrack>>();

    public onInit(): void {
        Events.playAnim.connect((player, name, id, character?) => this._playAnimation(player, name, id, character));
        Events.stopAnim.connect((player, name) => this._stopAnimation(player, name));
        Players.PlayerAdded.Connect(player =>
            player.CharacterAdded.Connect(character => {
                const animations = new Map<string, Animation>();
                const tracks = new Map<string, AnimationTrack>();
                const intializeAnimation = (name: string) => animations.set(name, this._createAnimation(name, character));

                intializeAnimation("attack");
                intializeAnimation("finisher");
                intializeAnimation("beingFinished");
                intializeAnimation("emote")

                this.playerAnimations.set(player, animations);
                this.playerTracks.set(player, tracks);
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
        const track = this.playerTracks.get(player)?.get(name)!;
        task.spawn(() => {
            if (!track) return;
            track.Stop();
            this._finishTrack(player, name, track);
            this.playerTracks.get(player)?.delete(name);
        });
    }

    private _playAnimation(player: Player, name: string, id: number, character = player.Character ?? player.CharacterAdded.Wait()[0], dontCancel = true): void {
        const humanoid = <Humanoid>character.WaitForChild("Humanoid");
        const animation = this.playerAnimations.get(player)?.get(name)!;
        const oldTrack = this.playerTracks.get(player)?.get(name)!;

        animation.AnimationId = `rbxassetid://${id}`;
        const track = humanoid.LoadAnimation(animation);
        if (!dontCancel)
            oldTrack.Stop();

        const finishJanitor = new Janitor;
        finishJanitor.Add(() => this._finishTrack(player, name, track));
        finishJanitor.Add(track.Stopped.Once(() => finishJanitor.Cleanup()));
        finishJanitor.Add(track.Ended.Once(() => finishJanitor.Cleanup()));
        track.Play();

        switch(name) {
            case "attack":
                track.AdjustSpeed(1.15);
                break;
            case "beingFinished":
            case "finisher":
                track.AdjustSpeed(1.25);
                break;
        }

        this.playerTracks.get(player)?.set(name, track);
    }

    private _finishTrack(player: Player, name: string, track: AnimationTrack): void {
        task.spawn(() => {
            track.Destroy();
            const respawnDelay = .1;
            switch(name) {
                case "beingFinished":
                    this._resetFinisherState(player);
                    task.delay(respawnDelay, () => {
                        player.LoadCharacter();
                        player.SetAttribute("BeingFinished", false);
                    });
                    break;
                case "finisher":
                    this._resetFinisherState(player);
                    break;
                case "emote":
                    Events.finishedEmote.fire(player);
                    break;
            }
        });
    }

    private _resetFinisherState(player: Player): void {
        anchor(player.Character, false, "HumanoidRootPart");
        Events.toggleCinematicBars.fire(player, false);
    }
}
