import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import styled from "styled-components";
import { NavigationLink, SmallUserCard } from "..";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsers } from "../../redux/features/User/thunk";
import { FlexCenter } from "../../styles/globals";

const getFiveUsers = (users: DocumentData | undefined) => users?.slice(0, 5);

export default function Members(): JSX.Element {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((s) => s.authReducer);
  const { otherUsers } = useAppSelector((s) => s.userReducer);

  const users = getFiveUsers(otherUsers);

  useEffect(() => {
    if (currentUser?.uid) dispatch(getUsers(currentUser?.uid));
  }, [dispatch, currentUser?.uid]);

  return (
    <Container>
      <h3>Who to Follow?</h3>
      {users?.slice(0, 5).map((user: any) => (
        <SmallUserCard user={user} key={user?.uid} />
      ))}
      <FlexCenter className="nav">
        <NavigationLink to="/discover">View All</NavigationLink>
      </FlexCenter>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray2};
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  height: max-content;
  position: sticky;
  top: 4.5rem;

  h3 {
    padding-bottom: 1rem;
  }

  @media screen and (max-width: 56.25em) {
    display: none;
  }

  .nav {
    padding: 1rem 0;
  }
`;
