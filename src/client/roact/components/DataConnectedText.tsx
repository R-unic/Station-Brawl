import Roact, { Children, Element, PropsWithChildren } from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";
import { Events } from "client/network";

interface Props<T, I extends Instance> {
    InitialText?: T;
    DataKey: string;
    LabelProperties: Partial<WritableInstanceProperties<I>>;
}

interface State<T> {
    LinkedText: T
}

function DataConnectedText(props: PropsWithChildren<Props<string, TextLabel>>) {
    const [state, setState] = useState<State<string>>({ LinkedText: props.InitialText ?? "..." });
    useEffect(() => {
        const dataUpdateConnection = Events.dataUpdate.connect((key: string, value: unknown) => {
            if (key !== props.DataKey) return;
            setState({ LinkedText: value as string });
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
