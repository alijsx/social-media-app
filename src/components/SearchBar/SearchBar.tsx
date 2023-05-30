import { useMemo, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import Input from "../Input/Input";
import SmallUserCard from "../UserCard/SmallCard";

export default function SearchBar(): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const { otherUsers } = useAppSelector((s) => s.userReducer);

  const filteredUsers = useMemo(() => {
    return otherUsers?.filter(
      (user) =>
        user?.firstName
          ?.toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase()) ||
        user?.lastName
          ?.toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
    );
  }, [searchText, otherUsers]);

  return (
    <Container>
      <Input
        name="search"
        type="text"
        label=""
        placeholder="Search users"
        value={searchText}
        onChange={(e: any) => setSearchText(e.target.value)}
      />
      {searchText.length > 0 && (
        <SearchResults>
          {filteredUsers?.map((user) => (
            <SmallUserCard user={user} showBtn={false} />
          ))}
        </SearchResults>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0.5rem 0;
  position: relative;
`;

const SearchResults = styled.div`
  margin: 0 0.5rem;
  z-index: 4;
  position: absolute;
  top: 90%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.slate3};
  border: 1px solid ${(props) => props.theme.colors.slate7};
`;
