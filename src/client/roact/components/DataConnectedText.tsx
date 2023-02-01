import Roact, { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";
import { Events } from "client/network";

interface Props<I extends Instance> {
    InitialText?: string;
    DataKey: string;
    DataMapper: (a: unknown) => unknown;
    LabelProperties: Partial<WritableInstanceProperties<I>>;
}

interface State {
    LinkedText: string
}

function DataConnectedText(props: PropsWithChildren<Props<TextLabel>>) {
    const [state, setState] = useState<State>({ LinkedText: props.InitialText ?? "..." });
    useEffect(() => {
        const dataUpdateConnection = Events.dataUpdate.connect((key: string, value: unknown) => {
            if (key !== props.DataKey) return;
            const mapped = props.DataMapper(value);
            setState({ LinkedText: mapped as string });
        });

        return () => dataUpdateConnection.Disconnect();
    }, []);

    const childrenMap = props[Children];
    const children: Element[] = [];
    childrenMap?.forEach(e => children.push(e));

    return (
        <textlabel {...props.LabelProperties} Text={state.LinkedText}>
            {...children}
        </textlabel>
    );
}

export = withHooks(DataConnectedText);
