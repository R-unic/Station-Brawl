import Roact, { Element, createRef } from "@rbxts/roact";
import { Events } from "client/network";
import { WINDOW_REFS } from "client/roact/Refs";
import InventoryItemCard from "client/roact/components/cards/InventoryItemCard";
import CaseCard from "client/roact/components/cards/CaseCard";
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
        this.setState({
            CurrentPage: "Cases",
            Pages: {
                Effects: [],
                Cases: []
            }
        });
    }

    protected didMount(): void {
        Events.dataUpdate.connect<[key: string, value: Inventory]>((key, value) => {
            if (key !== "inventory") return;
            for (const _case of value.cases)
                this.state.Pages.Cases.push(<CaseCard ItemName={_case.name + " Case"} Icon={_case.image} />);
            for (const effect of value.effects)
                this.state.Pages.Effects.push(<InventoryItemCard ItemName={effect.name} Icon={effect.image} />);

            this.setState({
                CurrentPage: this.state.CurrentPage,
                Pages: {
                    Effects: this.state.Pages.Effects,
                    Cases: this.state.Pages.Cases
                }
            });
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
