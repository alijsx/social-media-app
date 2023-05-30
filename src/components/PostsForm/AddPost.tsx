import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks";
import { createPost } from "../../redux/features/Posts/thunk";
import { PostType } from "../../types";
import PostForm from "../PostCard/Forms/PostForm";

export default function AddPost(): JSX.Element {
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

  const actions = [
    {
      id: "cancel",
      text: "Cancel",
      variant: "primary__outline",
      disabled: false,
      onClickHandler: () => setPost(initialValues),
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

  const handlePostSubmission = (post: PostType) => {
    dispatch(createPost(post));
    setPost(initialValues);
  };

  return (
    <Container>
      <PostForm post={post} setPost={setPost} actions={actions} />
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 0 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.slate7};
`;
