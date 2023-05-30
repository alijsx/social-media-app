import { useState } from "react";
import styled from "styled-components";
import { Modal } from "../..";
import { useAppDispatch } from "../../../hooks";
import { createPost } from "../../../redux/features/Posts/thunk";
import { PostType } from "../../../types";
import PostForm from "../../PostCard/Forms/PostForm";

type DialogProps = {
  showAddDialog: boolean;
  closeAddDialog: () => void;
};

export default function AddDialog({
  showAddDialog,
  closeAddDialog,
}: DialogProps): JSX.Element {
  const initialValues = {
    content: "",
    imageURL: "",
    imgAltText: "",
    isEdited: false,
  };

  const [post, setPost] = useState<PostType>({
    content: "",
    imageURL: "",
    imgAltText: "",
    isEdited: false,
  });

  const isValidAdd = post?.content !== "" && post?.content?.length <= 160;

  const handlePostSubmission = (post: PostType) => {
    dispatch(createPost(post));
    closeAddDialog();
    setPost(initialValues);
  };

  const handleCancel = () => {
    setPost(initialValues);
    closeAddDialog();
  };

  const actions = [
    {
      id: "cancel",
      text: "Cancel",
      variant: "primary__outline",
      disabled: false,
      onClickHandler: handleCancel,
    },
    {
      id: "add",
      text: "Add Post",
      variant: "primary__block",
      disabled: !isValidAdd,
      onClickHandler: () => handlePostSubmission(post),
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <Modal
      showModal={showAddDialog}
      closeModal={closeAddDialog}
      header="Add Post">
      <Container>
        <PostForm post={post} setPost={setPost} actions={actions} />
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 0.5rem 0;
`;
