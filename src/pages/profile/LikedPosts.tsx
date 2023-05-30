import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Loader, NoPosts, PostCard } from "../../components";
import { useAppSelector } from "../../hooks";

const getLikedPosts = (posts: DocumentData[] | undefined, uid: string) =>
  posts &&
  posts?.filter((post) => post?.likes?.find((p: any) => p.uid === uid));

export default function LikedPosts(): JSX.Element {
  const { posts, loading } = useAppSelector((s) => s.postsReducer);
  const { user } = useAppSelector((s) => s.userReducer);
  const { currentUser } = useAppSelector((s) => s.authReducer);

  const likedPosts = getLikedPosts(posts, user?.uid);

  if (loading) return <Loader />;

  return (
    <>
      {!loading ? (
        <>
          {likedPosts?.length === 0 ? (
            <NoPosts
              message={
                currentUser?.email === user?.email
                  ? "You have not like any of the posts"
                  : `You haven't like any of ${user?.firstName}'s posts`
              }
              redirect={true}
              redirectText="Checkout other posts that you might find interesting"
              redirectPath="home"
            />
          ) : (
            <Container>
              {likedPosts?.map((post) => (
                <PostCard key={post?.pid} post={post} />
              ))}
            </Container>
          )}
        </>
      ) : null}
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
