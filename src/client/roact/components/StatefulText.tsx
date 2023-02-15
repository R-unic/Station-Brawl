import Roact, { PropsWithChildren, Ref, createRef } from "@rbxts/roact";
import { getChildren } from "client/utility";

interface StatefulTextProps {
  InitialText?: string;
  LabelProperties: Partial<WritableInstanceProperties<TextLabel>>;
  Ref?: Ref<TextLabel>;
}

interface State {
  LinkedText: string
}

export class StatefulText<P = {}> extends Roact.Component<PropsWithChildren<StatefulTextProps & P>, State> {
  public update(text: string): void {
    this.setState({ LinkedText: text });
  }

  protected didMount(): void {
    this.update(this.props.InitialText ?? "...");
  }

  public render() {
    return (
      <textlabel {...this.props.LabelProperties} Ref={this.props.Ref} Text={this.state.LinkedText}>
        {...getChildren(this.props)}
      </textlabel>
    );
  }
}
