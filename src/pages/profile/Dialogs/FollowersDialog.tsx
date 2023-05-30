import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Modal, NavigationLink, SmallUserCard } from "../../../components";

type DialogProps = {
  showFollowersDialog: boolean;
  closeFollowersDialog: () => void;
  followers: any;
};

export default function FollowersDialog({
  followers,
  showFollowersDialog,
  closeFollowersDialog,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showFollowersDialog}
      closeModal={closeFollowersDialog}
      header="Followers">
      <Container>
        {followers?.length !== 0 ? (
          <>
            {followers?.map((user: DocumentData) => (
              <SmallUserCard key={user?.uid} user={user} showBtn={false} />
            ))}
          </>
        ) : (
          <div className="message__container">
            <p>You are not following anyone</p>
            <NavigationLink to="/explore">
              Check other people on Updated To Pro
            </NavigationLink>
          </div>
        )}
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
