import { DocumentData } from "firebase/firestore";
import { useMemo } from "react";
import styled from "styled-components";
import { AllCaughtUp, NoPosts, PostCard, Loader } from "../../components";
import { useAppSelector } from "../../hooks";

export default function Posts(): JSX.Element {
  const { posts, loading } = useAppSelector((s) => s.postsReducer);
  const { currentUser, loading: authLoader } = useAppSelector(
    (s) => s.authReducer
  );

  const followingIds = useMemo(() => {
    return currentUser?.following?.reduce(
      (acc: string[], cur: any) => {
        return [...acc, cur?.uid];
      },
      [currentUser?.uid]
    );
  }, [currentUser]);

  const getTimelinePosts = (
    posts: DocumentData[] | undefined,
    userIds: string[]
  ) => posts?.filter((post) => userIds.includes(post?.userId));

  const timelinePosts = getTimelinePosts(posts, followingIds);

  if (loading || authLoader) return <Loader />;

  return (
    <>
      {timelinePosts?.length === 0 ? (
        <NoPosts
          message="No posts to show"
          redirect={true}
          redirectText="Discover others on Updated To Pro or add a post yourself."
          redirectPath="discover"
        />
      ) : (
        <Container>
          {timelinePosts?.map((post) => (
            <PostCard key={post?.pid} post={post} />
          ))}
          <AllCaughtUp />
        </Container>
      )}
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
