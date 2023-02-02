export default function anchor(character: Model | undefined, on = true): void {
    const torso = character!.WaitForChild<Part>("UpperTorso");
    torso!.Anchored = on
}
