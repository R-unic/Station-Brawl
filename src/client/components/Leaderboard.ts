import { mount } from "@rbxts/roact";
import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import LeaderboardScreen from "client/roact/views/LeaderboardScreen";

interface Attributes { }

@Component({ tag: "Leaderboard" })
export class Leaderboard extends BaseComponent<Attributes, Part> implements OnStart {
  public onStart(): void {
    mount(LeaderboardScreen, this.instance);
  }
}
