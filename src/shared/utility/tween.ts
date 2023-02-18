import { TweenService } from "@rbxts/services";

export default function tween<T extends Instance>(instance: T, info: TweenInfo, goal: Partial<ExtractMembers<T, Tweenable>>): Tween {
  const t = TweenService.Create(instance, info, goal);
  t.Play();
  return t;
}
