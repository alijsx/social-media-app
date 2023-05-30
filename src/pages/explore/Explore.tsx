import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { Loader, PostCard } from "../../components";
import { useState } from "react";

interface IFilter {
  active?: boolean;
}

export default function Explore(): JSX.Element {
  const [filter, setFilter] = useState<string>("");
  const { loading, posts } = useAppSelector((s) => s.postsReducer);

  const getFilteredPosts: any = () => {
    if (posts) {
      switch (filter) {
        case "trending":
          return [...posts].sort(
            (postA, postB) => postB?.likes?.length - postA?.likes?.length
          );
        default:
          return [...posts];
      }
    }
    return [];
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="left-side">
        <Filters>
          <FilterButton
            active={filter === "trending"}
            onClick={() => setFilter("trending")}>
            Trending
          </FilterButton>
          <FilterButton active={filter === ""} onClick={() => setFilter("")}>
            Latest
          </FilterButton>
        </Filters>
        {getFilteredPosts()?.map((post: any) => (
          <PostCard post={post} key={post?.pid} />
        ))}
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

const Filters = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  background-color: ${(props) => {
    if (props.theme.title === "dark") return props.theme.colors.mauve2;
    return props.theme.colors.mauve3;
  }};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray7};
`;

const FilterButton = styled.button<IFilter>`
  font-size: 14px;
  background-color: ${(props) => {
    if (props.active) return props.theme.colors.plum10;
    return props.theme.colors.plum3;
  }};
  color: ${(props) => {
    if (props.active) return props.theme.colors.white;
    return props.theme.colors.plum10;
  }};
  padding: 0.25rem 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.plum7};

  :first-child {
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  :last-child {
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
`;
