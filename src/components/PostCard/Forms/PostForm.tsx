import { DocumentData } from "firebase/firestore";
import { AiOutlineCamera } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { uploadPostPhoto } from "../../../redux/features/Posts/services";
import { FlexCenter } from "../../../styles/globals";
import { PostType } from "../../../types";
import { Button } from "../../Button/Button";
import { useState } from "react";

type FormProps = {
  post: DocumentData | PostType;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
  actions: any[];
};

interface ICharCount {
  charCount: number;
}

export default function PostForm({
  post,
  setPost,
  actions,
}: FormProps): JSX.Element {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const closeEmojiPicker = () => setShowEmojiPicker(false);

  const handleImage = async (file: any) => {
    const url = await uploadPostPhoto(file);
    setPost((post) => ({ ...post, imageURL: url }));
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setPost((p) => ({ ...p, content: p.content + emojiObject.emoji }));
    closeEmojiPicker();
  };

  return (
    <FormContainer>
      <Textarea
        id="post-text"
        value={post?.content}
        placeholder="Whats on your mind?"
        onChange={(e) =>
          setPost((post) => ({ ...post, content: e.target.value }))
        }></Textarea>

      <FileEmojiPicker>
        <label htmlFor="post-image-input">
          <FlexCenter className="icon">
            <PostImageInput
              type="file"
              name="imageURL"
              id="post-image-input"
              onChange={(e: any) => handleImage(e.target.files[0])}
            />
            <AiOutlineCamera />
          </FlexCenter>
        </label>
        <FlexCenter className="icon emoji">
          <BsEmojiSmile onClick={() => setShowEmojiPicker((s) => !s)} />
          {showEmojiPicker && (
            <EmojiPicker>
              <Picker onEmojiClick={onEmojiClick} />
            </EmojiPicker>
          )}
        </FlexCenter>
        {post?.content?.length > 0 && (
          <CharCount charCount={post?.content?.length}>
            {post?.content?.length} / 10000 Chars
          </CharCount>
        )}
      </FileEmojiPicker>
      {post?.imageURL && (
        <>
          <FlexCenter>
            <PostImg
              src={post.imageURL}
              alt={post.imgAltText}
              width={400}
              height={300}
            />
          </FlexCenter>
          <FlexCenter>
            <ImgAltText
              type="text"
              placeholder="ALT Text for the image"
              value={post?.imgAltText}
              onChange={(e) =>
                setPost((post) => ({ ...post, imgAltText: e.target.value }))
              }
            />
          </FlexCenter>
        </>
      )}
      <BtnGroup>
        {actions.map((action) => (
          <Button
            key={action.id}
            radius={0.25}
            disabled={action.disabled}
            variant={action.variant}
            onClick={action.onClickHandler}>
            {action.text}
          </Button>
        ))}
      </BtnGroup>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  padding: 0 1rem;
`;

const Textarea = styled.textarea`
  min-height: 6rem;
  width: 100%;
  resize: none;
  font-family: inherit;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  color: ${(props) => props.theme.colors.violet12};
  background-color: ${(props) => props.theme.colors.violet3};
  border: 0;

  ::placeholder {
    font-family: inherit;
    color: ${(props) => props.theme.colors.slate11};
  }

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet8};
  }
`;

const CharCount = styled.small<ICharCount>`
  margin-left: auto;
  font-size: smaller;
  padding: 0.25rem;
  color: ${(props) => {
    if (props?.charCount > 120 && props.charCount <= 140)
      return props.theme.colors.orange10;
    if (props?.charCount > 140 && props.charCount <= 160)
      return props.theme.colors.red10;
    return props.theme.colors.teal10;
  }};
  background-color: ${(props) => {
    if (props?.charCount > 120 && props.charCount <= 140)
      return props.theme.colors.orange3;
    if (props?.charCount > 140 && props.charCount <= 160)
      return props.theme.colors.red3;
    return props.theme.colors.teal3;
  }};
`;

const ImgAltText = styled.input`
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  background-color: inherit;
  border: 0;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.violet12};
  box-shadow: 0 0 4px ${(props) => props.theme.colors.gray7};
  border-radius: 0.25rem;

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet8};
    box-shadow: 0 0 4px ${(props) => props.theme.colors.violet9};
  }
`;

const PostImg = styled.img``;

const PostImageInput = styled.input`
  display: none;
`;

const FileEmojiPicker = styled.div`
  display: flex;
  padding: 0.5rem 0;
  align-items: center;
  gap: 0.5rem;

  .icon {
    color: ${(props) => props.theme.colors.violet9};
    background-color: ${(props) => props.theme.colors.violet3};
    border: 1px solid ${(props) => props.theme.colors.violet7};
    border-radius: 50%;
    padding: 0.25rem;
    cursor: pointer;
    font-size: 1.25rem;
    bottom: 0;

    :hover {
      background-color: ${(props) => props.theme.colors.violet4};
    }

    :active {
      background-color: ${(props) => props.theme.colors.violet5};
    }
  }

  .emoji {
    position: relative;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const EmojiPicker = styled.div`
  z-index: 3;
  position: absolute;
  left: 10px;
  top: 110%; ;
`;
