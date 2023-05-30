import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Modal } from "../../../components";
import EditProfileImage from "../Form/EditProfileImage";

type DialogProps = {
  showPhotoDialog: boolean;
  closePhotoDialog: () => void;
  user: DocumentData | undefined;
};

export default function PhotoDialog({
  showPhotoDialog,
  closePhotoDialog,
  user,
}: DialogProps) {
  return (
    <Modal
      showModal={showPhotoDialog}
      closeModal={closePhotoDialog}
      header="Change profile Picture">
      <Container>
        <EditProfileImage user={user} closePhotoDialog={closePhotoDialog} />
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
