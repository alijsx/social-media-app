import { DocumentData } from "firebase/firestore";
import { useMemo } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  followUserHandler,
  unfollowUserHandler,
} from "../../redux/features/Auth/thunk";
import { getUserInfo } from "../../redux/features/User/thunk";
import { FlexCenter } from "../../styles/globals";
import { Button } from "../Button/Button";

type CardProps = {
  user: DocumentData;
  showBtn?: boolean;
};

export default function LargeUserCard({
  user,
  showBtn = true,
}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.authReducer.currentUser);

  const handleFollow = (e: Event, user: any) => {
    e.stopPropagation();
    dispatch(followUserHandler(user?.uid));
    dispatch(getUserInfo(user?.userName));
  };

  const handleUnfollow = (e: Event, user: any) => {
    e.stopPropagation();
    dispatch(unfollowUserHandler(user?.uid));
    dispatch(getUserInfo(user?.userName));
  };

  const followingIds = useMemo(() => {
    return currentUser?.following?.reduce((acc: string[], cur: any) => {
      return [...acc, cur?.uid];
    }, []);
  }, [currentUser]);

  const isAlreadyBeingFollowed = followingIds?.some(
    (id: string) => id === user?.uid
  );

  return (
    <Container>
      <div className="profile__header">
        <div className="profile__image__container">
          <img src={user?.photoURL} alt={user?.userName} />
        </div>
        <div className="profile__text">
          <Link to={`/profile/${user?.userName}`}>
            <div className="profile__text--fullname">
              {user?.firstName}&nbsp;{user?.lastName}
            </div>
            <div className="profile__text--username">&#64;{user?.userName}</div>
          </Link>
        </div>
        {showBtn && (
          <div className="profile__button">
            {isAlreadyBeingFollowed ? (
              <FFButton
                variant="primary__cta"
                radius={3}
                onClick={(e: any) => handleUnfollow(e, user)}>
                Unfollow
              </FFButton>
            ) : (
              <FFButton
                variant="primary__block"
                radius={3}
                onClick={(e: any) => handleFollow(e, user)}>
                Follow
              </FFButton>
            )}
          </div>
        )}
      </div>
      <div className="profile__user">
        <Bio>{user?.bio && user?.bio}</Bio>
        {user?.website && (
          <WebsiteLink
            href={`${user?.website}`}
            rel="noopener noreferer"
            target="_blank">
            <FlexCenter>
              <AiOutlineLink />
            </FlexCenter>
            {user?.website}
          </WebsiteLink>
        )}
      </div>
      <FollowFollowers>
        <FFCount>
          <div className="count">{user?.followers?.length}</div>
          <div className="text">Followers</div>
        </FFCount>
        <FFCount>
          <div className="count">{user?.following?.length}</div>
          <div className="text">Following</div>
        </FFCount>
      </FollowFollowers>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.colors.slate6};

  .profile__header {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    gap: 0.5rem;
  }

  :hover {
    background-color: ${(props) => props.theme.colors.slate3};
  }

  .profile__text {
    align-self: center;
  }

  .profile__image__container {
    width: 80px;
    display: flex;
    align-content: center;
    justify-content: center;

    img {
      border-radius: 50%;
      aspect-ratio: 1;
    }
  }

  .profile__text--fullname {
    color: ${(props) => props.theme.colors.gray12};
    font-size: 1.25rem;
    font-weight: 600;
  }

  .profile__text--username {
    color: ${(props) => props.theme.colors.mauve11};
  }

  .profile__button {
    align-self: center;
    justify-self: end;
  }
`;

const FFButton = styled(Button)`
  width: 80px;
  font-size: 0.88rem;
`;

const Bio = styled.div`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.gray12};
`;

const WebsiteLink = styled.a`
  display: flex;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.plum11};

  :hover {
    color: ${(props) => props.theme.colors.plum10};
  }
`;

const FFCount = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0 0;
  cursor: pointer;

  .text {
    color: ${(props) => props.theme.colors.slate9};

    :hover {
      text-decoration: underline;
      text-underline-offset: 0.25rem;
      color: ${(props) => props.theme.colors.slate11};
    }
  }
`;

const FollowFollowers = styled.div`
  display: flex;
  gap: 2rem;
`;
