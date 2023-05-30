import styled from "styled-components";
import { DocumentData } from "firebase/firestore";
import { Input, Button } from "../../../components";
import { FlexCenter } from "../../../styles/globals";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { profilePicChangeHandler } from "../../../redux/features/Auth/thunk";
import { getUserInfo } from "../../../redux/features/User/thunk";
import { changeUserProfileImage } from "../../../redux/features/Auth/services";

type EditProfileType = {
  user: DocumentData | undefined;
  closePhotoDialog: () => void;
};

export default function EditProfileImage({
  user,
  closePhotoDialog,
}: EditProfileType): JSX.Element {
  const [newURL, setNewURL] = useState<any>("");
  const dispatch = useAppDispatch();

  const handleFileChange = async (file: any) => {
    const url = await changeUserProfileImage(file);
    setNewURL(url);
  };

  const handleSaveChanges = () => {
    dispatch(profilePicChangeHandler(newURL));
    dispatch(getUserInfo(user?.userName));
    closePhotoDialog();
  };

  return (
    <Container>
      <FlexCenter>
        <img
          className="image"
          src={newURL || user?.photoURL}
          alt="profile"
          width={100}
          height={100}
        />
      </FlexCenter>
      <Input
        label="Profile Picture"
        id="profilePicture"
        name="photoURL"
        type="file"
        accept="image/*"
        onChange={(e: any) => handleFileChange(e.target.files[0])}
      />
      <BtnGroup>
        <Button
          variant="primary__outline"
          onClick={closePhotoDialog}
          radius={0.25}>
          Cancel
        </Button>
        <Button
          variant="primary__block"
          onClick={handleSaveChanges}
          radius={0.25}>
          Save Changes
        </Button>
      </BtnGroup>
    </Container>
  );
}

const Container = styled.div`
  .image {
    border-radius: 50%;
    aspect-ratio: 1;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
