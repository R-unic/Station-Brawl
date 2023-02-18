import { Events } from "client/network";
import { StatefulText } from "./StatefulText";

interface DataConnectedTextProps {
  DataKey: string;
  DataMapper: (data: unknown) => string;
}

export default class DataConnectedText extends StatefulText<DataConnectedTextProps> {
  protected willUnmount(): void {
    this.janitor.Destroy();
  }

  protected didMount(): void {
    this.janitor.Add(Events.dataUpdate.connect((key: string, value: unknown) => {
      if (key !== this.props.DataKey) return;
      const text = this.props.DataMapper(value);
      this.update(text);
    }));
    this.update(this.props.InitialText ?? "...");
  }
}
