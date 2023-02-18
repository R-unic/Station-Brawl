import { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { Players } from "@rbxts/services";

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
