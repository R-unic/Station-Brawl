import { Service, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";

@Service({})
export class AnimationService implements OnInit {
    private _plrAnimations = new Map<Player, Map<string, Animation>>();
    private _plrTracks = new Map<Player, Map<string, AnimationTrack[]>>();

    public onInit(): void {
        Events.playAnim.connect((player, name, id, character?, finishedCallback?) => this._playAnimation(player, name, id, character, finishedCallback));
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

    private _playAnimation(player: Player, name: string, id: number, character = player.Character ?? player.CharacterAdded.Wait()[0], finishedCallback?: () => void): void {
        const humanoid = <Humanoid>character.WaitForChild("Humanoid");
        const animation = this._plrAnimations.get(player)?.get(name)!;
        const tracks = this._plrTracks.get(player)?.get(name)!;

        animation.AnimationId = `rbxassetid://${id}`;
        const track = humanoid.LoadAnimation(animation);
        if (tracks.size() > 0)
            for (const t of tracks)
                t.Stop();

        tracks.push(track);
        function removeTrack(): void {
            track.Destroy();
            tracks.remove(tracks.indexOf(track));
        }

        track.Stopped.Once(removeTrack);
        track.Ended.Once(() => {
            removeTrack();
            if (finishedCallback)
                finishedCallback();
        });
        track.Play();
    }
}
