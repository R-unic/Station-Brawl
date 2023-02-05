export default function weld(p0: BasePart, p1: BasePart, constraint = true): WeldConstraint | Weld {
    const w = new Instance(constraint ? "WeldConstraint" : "Weld");
    w.Part0 = p0;
    w.Part1 = p1;
    w.Parent = p0;
    return constraint ? <WeldConstraint>w : <Weld>w;
}
