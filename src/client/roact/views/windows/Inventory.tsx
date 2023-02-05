import Roact, { Element, Tree, createRef, mount, unmount } from "@rbxts/roact";
import { Events } from "client/network";
import { getCharacter } from "client/utility";
import { WINDOW_REFS } from "client/roact/Refs";
import ListWindow from "client/roact/components/ListWindow";
import WindowTabs from "client/roact/components/WindowTabs";
import CaseCard from "client/roact/components/cards/CaseCard";
import InventoryItemCard from "client/roact/components/cards/InventoryItemCard";
import InventoryInfo from "shared/dataInterfaces/InventoryInfo";

interface State {
    CurrentPage: keyof InventoryInfo;
}

interface TabProps {
    TabName: string;
    Screen: InventoryScreen;
    ButtonProperties?: Partial<WritableInstanceProperties<TextButton>>;
}

const { Font, ApplyStrokeMode } = Enum;

class InventoryScreen extends Roact.Component<{}, State> {
    private readonly ref = createRef<ScreenGui>();
    private readonly items: Element[] = [];
    private readonly itemHandles: Tree[] = [];

    public constructor(props: {}) {
        super(props);
        WINDOW_REFS.set("inventory", this.ref);
    }

    public setPage(page: keyof InventoryInfo): void {
        this.setState({ CurrentPage: page });
        task.spawn(() => {
            const screen = this.ref.getValue();
            if (!screen) return;

            const list = screen.WaitForChild("Inventory").FindFirstChildOfClass("ScrollingFrame");
            if (!list) return;

            const pageMembers = list.GetChildren().filter((i): i is GuiObject => i.GetAttribute("Page") === page && i.IsA("GuiObject"));
            const nonPageMembers = list.GetChildren().filter((i): i is GuiObject => i.GetAttribute("Page") !== page && i.IsA("GuiObject"));
            for (const member of pageMembers)
                member.Visible = true;
            for (const member of nonPageMembers)
                member.Visible = false;
        });
    }

    protected didMount(): void {
        Events.dataUpdate.connect<[key: string, value: InventoryInfo]>((key, inventory) => {
            if (key !== "inventory") return;
            this._refresh(inventory);
        });
        this.setPage("effects");
    }

    private _refresh(inventory: InventoryInfo) {
        const screen = this.ref.getValue()!;

        for (const handle of this.itemHandles)
            unmount(handle);

        this.itemHandles.clear();
        this.items.clear();

        for (const _case of inventory.cases) {
            const itemName = _case.name + " Case";
            this.items.push(
                <CaseCard
                    CaseInfo={_case}
                    CardName={"cases_" + itemName}
                    ItemName={itemName}
                    Icon={_case.image}
                />
            );
        }
        for (const effect of inventory.effects)
            this.items.push(
                <InventoryItemCard
                    Rarity={effect.rarity}
                    CardName={"effects_" + effect.name}
                    ItemName={effect.name}
                    Icon={effect.image}
                    OnEquip={on => {
                        if (on)
                            Events.addEffectParticles.fire(getCharacter(), effect.name);
                        else
                            Events.removeEffectParticles.fire(getCharacter(), effect.name);
                    }}
                />
            );

        task.spawn(() => {
            const list = screen.WaitForChild("Inventory").FindFirstChildOfClass("ScrollingFrame");
            if (!list) return;
            for (const element of this.items)
                this.itemHandles.push(mount(element, list));

            for (const card of list.GetChildren().filter((i): i is GuiObject => i.IsA("GuiObject")))
                card.SetAttribute("Page", card.Name.split("_")[0]);

            this.setPage(this.state.CurrentPage);
        });
    }

    public render(): Roact.Element {
        return (
            <screengui Ref={this.ref} Key="Inventory" Enabled={false}>
                <ListWindow Title="Inventory" ListSize={new UDim2(1.015, 0, 0.77, 0)}>
                    <WindowTabs>
                        <InventoryTab TabName="Effects" Screen={this} />
                        <InventoryTab TabName="Cases" Screen={this} />
                    </WindowTabs>
                </ListWindow>
            </screengui>
        );
    }
}

// hover animation
function InventoryTab(props: TabProps) {
    return (
        <textbutton
            {...props.ButtonProperties}
            Key={props.TabName}
            Size={UDim2.fromScale(.2, .75)}
            AutoButtonColor={false}
            Text=""
            Event={{
                // MouseEnter: hoverClose,
                // MouseLeave: unhoverClose,
                MouseButton1Click: () => props.Screen.setPage(props.TabName.lower() as keyof InventoryInfo)
            }}
        >
            <uicorner />
            <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(99, 105, 121)), new ColorSequenceKeypoint(0.25, Color3.fromRGB(110, 119, 136)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(113, 121, 139)), new ColorSequenceKeypoint(0.75, Color3.fromRGB(110, 119, 136)), new ColorSequenceKeypoint(1, Color3.fromRGB(99, 105, 121))])}
                Rotation={80} />
            <textlabel
                Key="Text"
                Active={true}
                BackgroundTransparency={1}
                Font={Font.GothamBold}
                Selectable={true}
                Size={new UDim2(1, 0, 1, 0)}
                Text={props.TabName}
                TextColor3={Color3.fromRGB(234, 234, 234)}
                TextScaled={true}
                TextSize={14}
                TextWrapped={true}
            >
                <uistroke Color={Color3.fromRGB(80, 80, 80)} Thickness={1.5}>
                    <uigradient
                        Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(135, 144, 165)), new ColorSequenceKeypoint(0.25, Color3.fromRGB(140, 151, 173)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(207, 222, 255)), new ColorSequenceKeypoint(0.75, Color3.fromRGB(140, 151, 173)), new ColorSequenceKeypoint(1, Color3.fromRGB(135, 144, 165))])}
                        Rotation={90} />
                </uistroke>
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(135, 144, 165)), new ColorSequenceKeypoint(0.25, Color3.fromRGB(140, 151, 173)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(207, 222, 255)), new ColorSequenceKeypoint(0.75, Color3.fromRGB(140, 151, 173)), new ColorSequenceKeypoint(1, Color3.fromRGB(135, 144, 165))])}
                    Rotation={-100} />
            </textlabel>
            <uistroke Color={Color3.fromRGB(255, 255, 255)} Thickness={2} ApplyStrokeMode={ApplyStrokeMode.Border}>
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(135, 144, 165)), new ColorSequenceKeypoint(0.25, Color3.fromRGB(140, 151, 173)), new ColorSequenceKeypoint(0.5, Color3.fromRGB(207, 222, 255)), new ColorSequenceKeypoint(0.75, Color3.fromRGB(140, 151, 173)), new ColorSequenceKeypoint(1, Color3.fromRGB(135, 144, 165))])}
                    Rotation={90} />
            </uistroke>
        </textbutton>
    );
}

export const InventoryUI = <InventoryScreen />;
