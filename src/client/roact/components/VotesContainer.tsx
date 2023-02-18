import { Janitor } from "@rbxts/janitor";

import Roact from "@rbxts/roact";
import { Events } from "client/network";

interface State {
  VoteCount: number;
}

interface Props {
  MapName: string;
}

export default class VotesContainer extends Roact.Component<Props, State> {
  private janitor = new Janitor;

  protected willUnmount(): void {
    this.janitor.Destroy();
  }

  protected didMount(): void {
    this.janitor.Add(Events.updateMapChoiceVotes.connect((mapName, votes) => {
      if (mapName !== this.props.MapName) return;
      this.setState({ VoteCount: votes });
    }));
    this.setState({ VoteCount: 0 });
  }

  public render() {
    return (
      <imagelabel
        Key="VotesContainer"
        AnchorPoint={new Vector2(0, 1)}
        BackgroundTransparency={1}
        Image="rbxassetid://1130427181"
        ImageColor3={Color3.fromRGB(0, 0, 0)}
        ImageTransparency={0.45}
        Position={new UDim2(0, 0, 0.85, 0)}
        Size={new UDim2(0.35, 0, 0.35, 0)}
        ZIndex={3}
      >
        <uiaspectratioconstraint />
        <uicorner CornerRadius={new UDim(0, 12)} />
        <textlabel
          Key="VotesLabel"
          AnchorPoint={new Vector2(0, 1)}
          BackgroundTransparency={1}
          Font={Enum.Font.GothamMedium}
          Position={new UDim2(0, 0, 1, 0)}
          Size={new UDim2(0.8, 0, 0.8, 0)}
          Text={tostring(this.state.VoteCount ?? 0)}
          TextColor3={Color3.fromRGB(255, 255, 255)}
          TextScaled={true}
          TextSize={14}
          TextWrapped={true}
          ZIndex={4}
        />
      </imagelabel>
    );
  }
}
