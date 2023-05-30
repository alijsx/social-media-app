import styled from "styled-components";
import { Button } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AiOutlineLink, AiOutlineCamera } from "react-icons/ai";
import { FlexCenter } from "../../styles/globals";
import { useEffect, useMemo, useState } from "react";
import FollowersDialog from "./Dialogs/FollowersDialog";
import FollowingDialog from "./Dialogs/FollowingDialog";
import EditProfileDialog from "./Dialogs/EditProfileDialog";
import banner from  '../../assets/banner.png'
import {
  followUserHandler,
  unfollowUserHandler,
} from "../../redux/features/Auth/thunk";
import PhotoDialog from "./Dialogs/PhotoDialog";

export default function ProfileHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.userReducer);
  const { currentUser, loading: authLoading } = useAppSelector(
    (s) => s.authReducer
  );

  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showPhotoDialog, setShowPhotoDialog] = useState<boolean>(false);
  const [showFollowersDialog, setShowFollowersDialog] =
    useState<boolean>(false);
  const [showFollowingDialog, setShowFollowingDialog] =
    useState<boolean>(false);

  const openEditDialog = () => setShowEditDialog(true);
  const closeEditDialog = () => setShowEditDialog(false);
  const openPhotoDialog = () => setShowPhotoDialog(true);
  const closePhotoDialog = () => setShowPhotoDialog(false);
  const openFollowersDialog = () => setShowFollowersDialog(true);
  const closeFollowersDialog = () => setShowFollowersDialog(false);
  const openFollowingDialog = () => setShowFollowingDialog(true);
  const closeFollowingDialog = () => setShowFollowingDialog(false);

  useEffect(() => {
    closeFollowersDialog();
    closeFollowingDialog();
  }, [user?.userName]);

  const followingIds = useMemo(() => {
    return currentUser?.following?.reduce((acc: string[], cur: any) => {
      return [...acc, cur?.uid];
    }, []);
  }, [currentUser]);

  const isAlreadyBeingFollowed = followingIds?.some(
    (id: string) => id === user?.uid
  );

  return (
    <BannerSection>
      {!loading || authLoading ? (
        <>
          <Banner>
            <img
              src={banner}
              alt="profile header"
            />
            <ProfileImage>
              <img src={user?.photoURL} alt={`${user?.firstName}'s profile`} />
              {user?.email === currentUser?.email && (
                <FlexCenter className="icon" onClick={openPhotoDialog}>
                  <AiOutlineCamera />
                </FlexCenter>
              )}
            </ProfileImage>
          </Banner>
          <InfoContainer>
            <UserInfo>
              <FullName>
                {user?.firstName}&nbsp;{user?.lastName}
              </FullName>
              <UserName>&#64;{user?.userName}</UserName>
            </UserInfo>
            {user?.email === currentUser?.email ? (
              <Button
                variant="primary__cta"
                radius={0.25}
                onClick={openEditDialog}>
                Edit Profile
              </Button>
            ) : (
              <>
                {isAlreadyBeingFollowed ? (
                  <Button
                    variant="primary__cta"
                    radius={3}
                    onClick={() => dispatch(unfollowUserHandler(user?.uid))}>
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    variant="primary__cta"
                    radius={3}
                    onClick={() => dispatch(followUserHandler(user?.uid))}>
                    Follow
                  </Button>
                )}
              </>
            )}
          </InfoContainer>
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
          <FollowFollowers>
            <FFCount onClick={openFollowersDialog}>
              <div className="count">{user?.followers?.length}</div>
              <div className="text">Followers</div>
            </FFCount>
            <FFCount onClick={openFollowingDialog}>
              <div className="count">{user?.following?.length}</div>
              <div className="text">Following</div>
            </FFCount>
          </FollowFollowers>
          <EditProfileDialog
            showEditDialog={showEditDialog}
            closeEditDialog={closeEditDialog}
          />
          <FollowersDialog
            followers={user?.followers}
            showFollowersDialog={showFollowersDialog}
            closeFollowersDialog={closeFollowersDialog}
          />
          <FollowingDialog
            following={user?.following}
            showFollowingDialog={showFollowingDialog}
            closeFollowingDialog={closeFollowingDialog}
          />
          <PhotoDialog
            user={user}
            showPhotoDialog={showPhotoDialog}
            closePhotoDialog={closePhotoDialog}
          />
        </>
      ) : null}
    </BannerSection>
  );
}

const BannerSection = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colors.slate7};
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const Banner = styled.div``;

const ProfileImage = styled.div`
  position: relative;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    aspect-ratio: 1;
    margin-top: -2.5rem;
    margin-left: 2rem;
    border: 4px solid ${(props) => props.theme.colors.slate1};
  }

  .icon {
    color: ${(props) => props.theme.colors.plum9};
    background-color: ${(props) => props.theme.colors.plum3};
    border: 1px solid ${(props) => props.theme.colors.plum7};
    border-radius: 50%;
    padding: 0.25rem;
    position: absolute;
    cursor: pointer;
    right: -1rem;
    bottom: 0;

    :hover {
      background-color: ${(props) => props.theme.colors.plum4};
    }

    :active {
      background-color: ${(props) => props.theme.colors.plum5};
    }
  }

  @media screen and (max-width: 540px) {
    img {
      /* width: 55px; */
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 420px) {
    padding: 1.75rem 0 0;
  }
`;

const UserInfo = styled.div``;

const FullName = styled.div`
  font-size: clamp(1.25rem, 10vw, 1.75rem);
  font-weight: 600;
  margin: 0;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.colors.mauve10};
`;

const Bio = styled.div`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.gray12};
`;

const WebsiteLink = styled.a`
  display: flex;
  gap: 0.25rem;
  color: ${(props) => props.theme.colors.plum11};

  :hover {
    color: ${(props) => props.theme.colors.plum10};
  }
`;

const FFCount = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
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
