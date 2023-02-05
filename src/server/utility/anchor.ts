export default function anchor(character: Model | undefined, on = true, anchorPart = "UpperTorso"): void {
  const torso = character!.WaitForChild<Part>(anchorPart);
  torso!.Anchored = on
}
