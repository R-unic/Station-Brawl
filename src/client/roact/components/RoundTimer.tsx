import { Events } from "client/network";
import { StatefulText } from "./StatefulText";

export default class RoundTimer extends StatefulText {
  protected willUnmount(): void {
    this.janitor.Destroy();
  }

  protected didMount(): void {
    Events.updateTimer.connect((roundState, remainingTime) => this.update(`<stroke thickness="1.7" transparency=".4" ><uc>${roundState}</uc> <b>|</b> ${remainingTime}</stroke>`));
    this.update(this.props.InitialText ?? "...");
  }
}
