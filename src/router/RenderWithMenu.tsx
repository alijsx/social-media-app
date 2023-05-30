import { Outlet } from "react-router-dom";
import { NavMenu } from "../components";
import { MainContainer } from "../styles/globals";

export default function RenderWithMenu(): JSX.Element {
  return (
    <>
      <MainContainer>
        <NavMenu />
        <Outlet />
      </MainContainer>
    </>
  );
}
