import { Dependency } from "@flamework/core";
import Roact, { PropsWithChildren, createRef } from "@rbxts/roact";
import { CaseRollController } from "client/controllers/CaseRollController";
import { getChildren } from "client/utility";

interface State {
  Enabled: boolean;
}

const { ZIndexBehavior, ApplyStrokeMode, Font } = Enum;

export default class CaseRewardModal extends Roact.Component<PropsWithChildren, State> {
  public render(): Roact.Element {
    return (
      <screengui Key="CaseReward" ZIndexBehavior={ZIndexBehavior.Sibling}>
        {...getChildren(this.props)}
        <textbutton
          Key="Confirm"
          AnchorPoint={new Vector2(0.5, 0.5)}
          BackgroundColor3={Color3.fromRGB(255, 255, 255)}
          Font={Font.GothamBold}
          Position={new UDim2(0.5, 0, 0.7, 0)}
          Size={new UDim2(0.1, 0, 0.05, 0)}
          Text="OK"
          TextColor3={Color3.fromRGB(182, 182, 182)}
          TextScaled={true}
          TextSize={14}
          TextTransparency={0.2}
          TextWrapped={true}
          Event={{
            MouseButton1Click: () => {
              const caseRoller = Dependency<CaseRollController>();
              caseRoller.cleanup();
            }
          }}
        >
          <uicorner />
          <uiaspectratioconstraint AspectRatio={3.25} />
          <uistroke
            ApplyStrokeMode={ApplyStrokeMode.Border}
            Color={Color3.fromRGB(135, 135, 135)}
            Thickness={2}
          >
            <uigradient
              Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(167, 255, 140)), new ColorSequenceKeypoint(1, Color3.fromRGB(144, 255, 172))])}
              Rotation={-135}
            />
          </uistroke>
          <uigradient
            Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(167, 255, 140)), new ColorSequenceKeypoint(1, Color3.fromRGB(144, 255, 172))])}
            Rotation={45}
          />
          <uistroke Color={Color3.fromRGB(62, 62, 62)} Thickness={1.5} />
        </textbutton>
      </screengui>
    );
  }
}
