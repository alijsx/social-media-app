import { ThemeProvider } from "styled-components";
import {
  Header,
  Footer,
  NavMenu,
  ToastComponent,
  ScrollToTop,
} from "./components";
import { LightTheme, DarkTheme } from "./styles/themes";
import { GlobalStyle } from "./styles";
import { useAppDispatch, useLocalStorage } from "./hooks";
import { Container, MainContainer, Page } from "./styles/globals";
import { useLocation } from "react-router-dom";
import Router from "./router";
import { useEffect } from "react";
import { loggedInUserInfo } from "./redux/features/Auth/thunk";
import { getAllPosts, getPostsOfFollowing } from "./redux/features/Posts/thunk";
import { getUsers } from "./redux/features/User/thunk";

function App(): JSX.Element {
  const [theme, setTheme] = useLocalStorage("breakout-theme", "light");
  const dispatch = useAppDispatch();

  const toggleTheme: () => void = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const { pathname } = useLocation();

  const uid = localStorage.getItem("breakout/user-id");
  useEffect(() => {
    if (uid) {
      dispatch(loggedInUserInfo(uid));
      dispatch(getUsers(uid));
      dispatch(getAllPosts());
      dispatch(getPostsOfFollowing());
    }
  }, [uid, dispatch]);

  const showNavMenu =
    pathname !== "/" &&
    pathname !== "/auth/signin" &&
    pathname !== "/auth/signup";

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <ScrollToTop />
      <Page>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Container>
          <MainContainer showNavMenu={showNavMenu}>
            {showNavMenu && <NavMenu />}
            <Router />
          </MainContainer>
        </Container>
        <Footer />
      </Page>
      <ToastComponent />
    </ThemeProvider>
  );
}

export default App;
