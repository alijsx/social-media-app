import styled from "styled-components";

type MainContainerProps = {
  showNavMenu?: boolean;
};

const Container = styled.section`
  width: min(100% - 2rem, 75em);
  margin: 0 auto;
`;

const MainContainer = styled.main<MainContainerProps>`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 56.25em) {
    grid-template-columns: ${({ showNavMenu }) =>
      showNavMenu ? "1fr 5fr" : "1fr"};
  }
  gap: 0.5rem;
`;

const Content = styled.section`
  padding: 2rem 0;
  min-height: 80vh;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Container, Content, FlexCenter, MainContainer, Page };
