import Roact, { Element, createRef } from "@rbxts/roact";
import { Events } from "client/network";
import { WINDOW_REFS } from "client/roact/Refs";
import InventoryCard from "client/roact/components/InventoryCard";
import ListWindow from "client/roact/components/ListWindow";
import Inventory from "shared/dataInterfaces/Inventory";

interface InventoryPages {
    Effects: Element[];
    Cases: Element[];
}

interface State {
    CurrentPage: keyof InventoryPages;
    Pages: InventoryPages;
}

class InventoryScreen extends Roact.Component<{}, State> {
    private readonly ref = createRef<ScreenGui>();

    public constructor(props: {}) {
        super(props);
        WINDOW_REFS.set("inventory", this.ref);
    }

    protected didMount(): void {
        Events.dataUpdate.connect<[key: string, value: Inventory]>((key, value) => {
            if (key !== "inventory") return;
            for (const _case of value.cases)
                this.state.Pages.Cases.push(<InventoryCard ItemName={_case.name + " Case"} Icon={_case.image} />);
            for (const effect of value.effects)
                this.state.Pages.Cases.push(<InventoryCard ItemName={effect.name} Icon={effect.image} />);

        });
        this.setState({
            CurrentPage: "Effects",
            Pages: {
                Effects: [],
                Cases: []
            }
        });
    }

    public render(): Roact.Element {
        return (
            <screengui Ref={this.ref} Key="Inventory" Enabled={false}>
                <ListWindow Title="Inventory">
                    {...this.state.Pages[this.state.CurrentPage]}
                </ListWindow>
            </screengui>
        );
    }
}

export const InventoryUI = <InventoryScreen />;
