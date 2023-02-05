import { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { Players, TweenService } from "@rbxts/services";

export function tween<T extends Instance>(instance: T, info: TweenInfo, goal: Partial<ExtractMembers<T, Tweenable>>): Tween {
  const t = TweenService.Create(instance, info, goal);
  t.Play();
  return t;
}

export function getChildren<P = {}>(props: PropsWithChildren<P>): Element[] {
  const childrenMap = props[Children];
  const children: Element[] = [];
  childrenMap?.forEach(e => children.push(e));
  return children;
}

export function getUI(): PlayerGui {
  return <PlayerGui>getPlayer().WaitForChild("PlayerGui");
}

export function getPlayer(): Player {
  return Players.LocalPlayer;
}

export function getCharacter(): Model {
  const plr = getPlayer();
  return plr.Character ?? plr.CharacterAdded.Wait()[0];
}
