import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart, AiOutlineTag } from "react-icons/ai";
import {
  MdOutlineComment,
  MdOutlineBookmarkAdd,
  MdBookmark,
} from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { FlexCenter } from "../../styles/globals";
import { IconType } from "react-icons/lib";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addBookmark,
  addComment,
  deletePost,
  likePost,
  removeBookmark,
  unLikePost,
} from "../../redux/features/Posts/thunk";
import { useState } from "react";
import LikesDialog from "./Dialogs/LikesDialog";
import {
  checkIfPostIsBookmarked,
  checkIfPostIsLiked,
  checkIfUserAllowedToEditDelete,
  getProfileUser,
} from "./Utils";
import EditDialog from "./Dialogs/EditDialog";
import DeleteDialog from "./Dialogs/DeleteDialog";
import { CommentType } from "../../types";
import { Button } from "..";

type PostCardProps = {
  post: DocumentData;
};

type ActionType = {
  id: string;
  icon: IconType;
  actionHandler: any;
  text: string;
  active?: boolean;
};

interface IAction {
  active?: boolean;
}

export default function PostCard({ post }: PostCardProps): JSX.Element {
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [comment, setComment] = useState<CommentType>({
    pid: post?.pid,
    text: "",
  });

  const [showLikesDialog, setShowLikesDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const openLikesDialog = () => setShowLikesDialog(true);
  const closeLikesDialog = () => setShowLikesDialog(false);
  const openEditDialog = () => setShowEditDialog(true);
  const closeEditDialog = () => setShowEditDialog(false);
  const openDeleteDialog = () => setShowDeleteDialog(true);
  const closeDeleteDialog = () => setShowDeleteDialog(false);
  const postDateTime =
    new Date(post?.timeStamp?.seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    ", " +
    new Date(post?.timeStamp?.seconds * 1000).toLocaleDateString();

  const dispatch = useAppDispatch();
  const { otherUsers: users } = useAppSelector((s) => s.userReducer);
  const { currentUser: user } = useAppSelector((s) => s.authReducer);

  const postUser = getProfileUser(users, post?.userId);
  const isLiked = checkIfPostIsLiked(post, user?.uid);
  const isBookmarked = checkIfPostIsBookmarked(post, user?.uid);
  const isAllowedToEditDelete = checkIfUserAllowedToEditDelete(
    post?.userId,
    user?.uid
  );

  const handleCommentSubmit = () => {
    dispatch(addComment(comment));
    setComment((c) => ({ ...c, text: "" }));
  };

  const options = [
    {
      id: "edit",
      text: "Edit Post",
      actionHandler: openEditDialog,
    },
    {
      id: "delet",
      text: "Delete Post",
      actionHandler: openDeleteDialog,
    },
  ];

  const deleteActions = [
    {
      id: "cancel",
      variant: "primary__outline",
      text: "Cancel",
      actionHandler: closeDeleteDialog,
    },
    {
      id: "delete",
      variant: "primary__block",
      text: "Delete",
      actionHandler: () => dispatch(deletePost(post?.pid)),
    },
  ];

  const actions: ActionType[] = [
    {
      id: "like",
      icon: isLiked ? AiFillHeart : AiOutlineHeart,
      actionHandler: isLiked
        ? () => dispatch(unLikePost(post?.pid))
        : () => dispatch(likePost(post?.pid)),
      text: isLiked ? "Liked" : "Like",
      active: isLiked,
    },
    {
      id: "comment",
      icon: MdOutlineComment,
      actionHandler: () => setShowComment((c) => !c),
      text: "Comment",
    },
    {
      id: "bookmark",
      icon: isBookmarked ? MdBookmark : MdOutlineBookmarkAdd,
      actionHandler: isBookmarked
        ? () => dispatch(removeBookmark(post?.pid))
        : () => dispatch(addBookmark(post?.pid)),
      text: isBookmarked ? "Bookmarked" : "Bookmark",
      active: isBookmarked,
    },
   
  ];

  return (
    <PostContainer>
      <PostHeader>
        <PostProfileImage>
          <img
            src={postUser?.photoURL || user?.photoURL}
            alt={`${post?.userName}'s profile`}
          />
        </PostProfileImage>
        <PostUserInfo>
          <PostFullName>{post?.fullName}</PostFullName>
          <PostUserName>&#64;{post?.userName}</PostUserName>
        </PostUserInfo>
        {isAllowedToEditDelete && (
          <PostOptions onClick={() => setShowOptions((s) => !s)}>
            <FlexCenter>
              <IoEllipsisVertical />
            </FlexCenter>
            {showOptions && (
              <div className="options__container">
                {options.map((option) => (
                  <div
                    className="option"
                    key={option.id}
                    onClick={option.actionHandler}>
                    {option.text}
                  </div>
                ))}
              </div>
            )}
          </PostOptions>
        )}
      </PostHeader>
      <TimeEdit>
        <div>{postDateTime}</div>
        {post?.isEdited && (
          <p>
            <em>Edited</em>
          </p>
        )}
      </TimeEdit>
      <PostBody>
        <PostContent>{post?.content}</PostContent>
        {post?.imageURL && (
          <PostImageContainer>
            <img src={post?.imageURL} alt={post?.imgAltText} />
            {post?.imgAltText && (
              <PostImageAltText>
                <small>
                  <FlexCenter>
                    <AiOutlineTag />
                  </FlexCenter>
                  &nbsp;Image ALT text: {post?.imgAltText}
                </small>
              </PostImageAltText>
            )}
          </PostImageContainer>
        )}
      </PostBody>
      <PostStats onClick={openLikesDialog}>
        {isLiked
          ? post?.likes?.length > 1
            ? `You and ${post?.likes?.length - 1} other(s) liked this`
            : "You liked this"
          : post?.likes?.length > 1
          ? `${post?.likes[0]?.firstName} & ${
              post?.likes?.length - 1
            } other(s) liked this`
          : post?.likes?.length
          ? `${post?.likes[0]?.firstName} liked this`
          : "Be the first one to like this"}
      </PostStats>
      <PostActions>
        {actions.map((action) => (
          <Action
            key={action.id}
            onClick={action.actionHandler}
            active={action.active}>
            <FlexCenter className="icon">{<action.icon />}</FlexCenter>
            <div>{action.text}</div>
          </Action>
        ))}
      </PostActions>
      {showComment && (
        <AddComment>
          <CommentInput
            type="text"
            value={comment.text}
            placeholder="Add a comment"
            onChange={(e) =>
              setComment((c) => ({ ...c, text: e.target.value }))
            }
          />
          <CmtBtn
            variant="secondary__block"
            radius={0.25}
            fullwidth
            disabled={comment.text === "" || comment.text.length > 100}
            onClick={handleCommentSubmit}>
            Add Comment
          </CmtBtn>
        </AddComment>
      )}
      {post?.comments?.length > 0 ? (
        <Comments>
          {post.comments?.map((comment: any) => (
            <Comment key={comment?.text + comment?.text?.length}>
              <div className="image">
                <img
                  src={comment?.photoURL}
                  alt={`${comment?.userName}'s avatar`}
                />
              </div>
              <div className="header">
                <div className="userinfo">
                  <div className="fullname">{comment?.fullName}</div>
                  <div className="userName">&#64;{comment?.userName}</div>
                </div>
                <div className="content">{comment?.text}</div>
              </div>
            </Comment>
          ))}
        </Comments>
      ) : null}
      <LikesDialog
        showLikesDialog={showLikesDialog}
        closeLikesDialog={closeLikesDialog}
        likes={post?.likes}
      />
      <EditDialog
        showEditDialog={showEditDialog}
        closeEditDialog={closeEditDialog}
        postData={post}
      />
      <DeleteDialog
        showDeleteDialog={showDeleteDialog}
        closeDeleteDialog={closeDeleteDialog}
        actions={deleteActions}
      />
    </PostContainer>
  );
}

const PostContainer = styled.article`
  :not(:last-child) {
    border-bottom: 2px solid ${(props) => props.theme.colors.slate8};
  }

  :hover {
    background-color: ${(props) => props.theme.colors.mauve2};
  }
`;

const PostHeader = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 6fr 1fr;
`;

const PostProfileImage = styled.div`
  align-self: center;
  justify-self: center;
  position: relative;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    aspect-ratio: 1;
    border: 2px solid ${(props) => props.theme.colors.slate1};
  }
`;

const PostUserInfo = styled.div`
  justify-self: start;
  align-self: center;
`;

const PostFullName = styled.div`
  font-size: clamp(1rem, 10vw, 1.2rem);
  font-weight: 500;
  letter-spacing: -0.15px;
  margin: 0;
`;

const PostUserName = styled.div`
  color: ${(props) => props.theme.colors.gray10};
`;

const PostOptions = styled.div`
  font-size: 1.25rem;
  align-self: center;
  justify-self: center;
  padding: 0.25rem;
  position: relative;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.gray4};
  }

  .options__container {
    font-size: 14px;
    position: absolute;
    width: 8rem;
    right: 0;
    top: 110%;
  }

  .option {
    background-color: ${(props) => props.theme.colors.violet4};
    padding: 0.4rem 0.75rem;
    cursor: pointer;

    :hover {
      background-color: ${(props) => props.theme.colors.violet4};
      outline: 1px solid ${(props) => props.theme.colors.violet8};
      outline-offset: -1px;
    }

    :active {
      background-color: ${(props) => props.theme.colors.violet5};
    }

    :not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.colors.violet7};
    }
  }
`;

const TimeEdit = styled.div`
  padding: 0 0.5rem;
  display: flex;
  font-size: smaller;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.gray11};
`;

const PostBody = styled.div`
  padding: 1rem 0.5rem;
`;

const PostContent = styled.div`
  padding-bottom: 1rem;
`;

const PostImageContainer = styled.div`
  padding: 1rem 0 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    object-fit: cover;
  }
`;

const PostImageAltText = styled.div`
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.colors.mauve3};
  color: ${(props) => props.theme.colors.slate11};
  border: 1px solid ${(props) => props.theme.colors.slate6};
  padding: 0.25rem;
  width: fit-content;

  small {
    display: flex;
  }
`;

const PostStats = styled.div`
  display: flex;
  font-size: smaller;
  padding: 0.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.gray4};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray4};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const PostActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Action = styled.div<IAction>`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0.5rem 0;
  font-size: smaller;
  gap: 1rem;
  cursor: pointer;
  border-bottom: 0.5px solid ${(props) => props.theme.colors.mauve4};
  color: ${(props) => props.theme.colors.slate11};

  .icon {
    font-size: 1rem;

    color: ${(props) => {
      if (props.active) {
        return props.theme.colors.red10;
      }
      return props.theme.colors.slate11;
    }};
  }

  :hover {
    background-color: ${(props) => props.theme.colors.violet3};
    color: ${(props) => props.theme.colors.violet10};
  }

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet6};
    outline-offset: 1px;
  }

  :active {
    background-color: ${(props) => {
      if (props.theme.title === "dark") {
        return props.theme.colors.violet5;
      }
      return props.theme.colors.violet5;
    }};
  }
`;

const AddComment = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const CommentInput = styled.input`
  grid-column: 1/6;
  width: 100%;
  margin: 0.5rem auto;
  padding: 0.45rem;
  background-color: inherit;
  border: 1px solid ${(props) => props.theme.colors.gray6};
  font-size: smaller;
  color: ${(props) => props.theme.colors.violet12};
  border-radius: 0.25rem;

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.gray7};
  }
`;

const CmtBtn = styled(Button)`
  grid-column: 6/8;
  font-size: 14px;
  padding: 0.5rem 0.75rem;

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet8};
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;

  :not(:last-child) {
    border-bottom: 0.5px solid ${(props) => props.theme.colors.gray8};
  }

  :hover {
    background-color: ${(props) => props.theme.colors.mauve3};
  }

  .image {
    grid-column: 1/2;
    align-self: center;
    justify-self: center;

    img {
      aspect-ratio: 1;
      border-radius: 50%;
      width: 50px;
    }
  }

  .header {
    grid-column: 2 / 8;
    align-items: center;

    .userinfo {
      display: flex;
      gap: 0.5rem;

      .fullname {
        grid-column: 2 / 4;
        color: ${(props) => props.theme.colors.slate12};
        font-weight: 500;
      }

      .userName {
        grid-column: 4 / 5;
        color: ${(props) => props.theme.colors.mauve10};
      }
    }
  }

  .content {
    font-size: smaller;
    padding: 0.5rem 0;
    color: ${(props) => props.theme.colors.gray11};
  }
`;
