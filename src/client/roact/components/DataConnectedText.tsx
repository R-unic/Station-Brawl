import Roact, { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { Events } from "client/network";
import { getChildren } from "client/utility";

interface Props<I extends Instance> {
    InitialText?: string;
    DataKey: string;
    DataMapper: (a: unknown) => string;
    LabelProperties: Partial<WritableInstanceProperties<I>>;
}

interface State {
    LinkedText: string
}

export default class DataConnectedText extends Roact.Component<PropsWithChildren<Props<TextLabel>>, State> {
    protected didMount(): void {
        Events.dataUpdate.connect((key: string, value: unknown) => {
            if (key !== this.props.DataKey) return;
            const text = this.props.DataMapper(value);
            this.setState({ LinkedText: text });
        });
        this.setState({ LinkedText: this.props.InitialText ?? "..." });
    }

    public render(): Element {
        return (
            <textlabel {...this.props.LabelProperties} Text={this.state.LinkedText}>
                {...getChildren(this.props)}
            </textlabel>
        );
    }
}
