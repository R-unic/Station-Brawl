import Roact from "@rbxts/roact"
import { Events, Functions } from "client/network";
import VotesContainer from "./VotesContainer";

interface Props {
  MapName: Exclude<keyof ServerStorage["Maps"], keyof Folder>;
  Icon: string;
}

const { ScaleType, Font, TextYAlignment, ApplyStrokeMode } = Enum;

export default function MapChoice(props: Props) {
  return (
    <imagebutton
      Key="MapChoice"
      AutoButtonColor={false}
      BackgroundTransparency={1}
      ScaleType={ScaleType.Fit}
      Size={new UDim2(0.3, 0, 0.85, 0)}
      ZIndex={2}
      Event={{
        MouseButton1Click: () => {
          Events.voteForMap.fire(props.MapName);
          Functions.getMapVotes.invoke(props.MapName)
            .then(votes => Events.updateMapChoiceVotes.predict(props.MapName, votes ?? 0));
        }
      }}
    >
      <VotesContainer MapName={props.MapName} />
      <textlabel
        Key="Title"
        AnchorPoint={new Vector2(0.5, 1)}
        BackgroundColor3={Color3.fromRGB(41, 45, 47)}
        BackgroundTransparency={0.25}
        Font={Font.GothamMedium}
        Position={new UDim2(0.5, 0, 1, 0)}
        Size={new UDim2(1, 0, 0.25, 0)}
        Text={props.MapName}
        TextColor3={Color3.fromRGB(255, 255, 255)}
        TextScaled={true}
        TextSize={14}
        TextWrapped={true}
        TextYAlignment={TextYAlignment.Bottom}
        ZIndex={0}
      >
        <uicorner CornerRadius={new UDim(0, 12)} />
        <uipadding
          PaddingBottom={new UDim(0.08, 0)}
          PaddingLeft={new UDim(0.05, 0)}
          PaddingRight={new UDim(0.05, 0)}
          PaddingTop={new UDim(0.42, 0)}
        />
        <uistroke
          Color={Color3.fromRGB(100, 100, 100)}
          Thickness={1.8}
          Transparency={0.35}
        />
        <uistroke
          ApplyStrokeMode={ApplyStrokeMode.Border}
          Thickness={1.8}
          Transparency={0.35}
        />
      </textlabel>
      <imagelabel
        Key="Icon"
        Active={true}
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        Image={props.Icon}
        ScaleType={ScaleType.Crop}
        Selectable={true}
        Size={new UDim2(1, 0, 0.85, 0)}
        ZIndex={2}
      >
        <uicorner CornerRadius={new UDim(0, 12)} />
        <uistroke Thickness={1.8} Transparency={0.35} />
      </imagelabel>
    </imagebutton>
  );
}

