import Roact, { createRef } from "@rbxts/roact";
import { WindowRefs } from "client/roact/Refs";
import ListWindow from "client/roact/components/windows/ListWindow";
import MoneyProductCard from "client/roact/components/cards/MoneyProductCard";

const ref = createRef<ScreenGui>();
WindowRefs.set("shop", ref);

export const ShopUI = (
  <screengui Ref={ref} Key="Shop" Enabled={false}>
    <ListWindow Title="Purchase Money" Screen={ref} ListChildren={
      <>
        <MoneyProductCard ItemName="$300" Icon="rbxassetid://46022281" ID={1369201265} />
        <MoneyProductCard ItemName="$650" Icon="rbxassetid://46022281" ID={1369202529} />
        <MoneyProductCard ItemName="$1000" Icon="rbxassetid://46022281" ID={1369203219} />
        <MoneyProductCard ItemName="$2150" Icon="rbxassetid://46022281" ID={1369203784} />
        <MoneyProductCard ItemName="$4500" Icon="rbxassetid://46022281" ID={1369203791} />
        <MoneyProductCard ItemName="$9350" Icon="rbxassetid://46022281" ID={1369203792} />
      </>
    } />
  </screengui>
);
