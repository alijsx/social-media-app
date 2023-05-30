import styled from "styled-components";
import { LargeUserCard, Loader, SearchBar } from "../../components";
import { useAppSelector, useDocumentTitle } from "../../hooks";

export default function Bookmarks(): JSX.Element {
  const { otherUsers: users, loading } = useAppSelector((s) => s.userReducer);

  useDocumentTitle({ title: "Discover | Breakout" });
  if (loading) return <Loader />;

  return (
    <Container>
      <div className="left-side">
        <SearchBar />
        <div className="profiles__container">
          {users?.map((user) => (
            <LargeUserCard user={user} key={user?.uid} showBtn={true} />
          ))}
        </div>
      </div>
      <div className="right-side"></div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  gap: 0.5rem;

  .left-side {
    border-left: 1px solid ${(props) => props.theme.colors.gray7};
    border-right: 1px solid ${(props) => props.theme.colors.gray7};
  }

  .profiles__container {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
  }

  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr;

    .profiles__container {
      border: 0;
    }

    .left-side {
      border: none;
    }

    .right-side {
      display: none;
    }
  }
`;
