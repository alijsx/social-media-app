import { DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { Modal, NavigationLink, SmallUserCard } from "../../../components";

type DialogProps = {
  showFollowingDialog: boolean;
  closeFollowingDialog: () => void;
  following: any;
};

export default function FollowingDialog({
  following,
  showFollowingDialog,
  closeFollowingDialog,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showFollowingDialog}
      closeModal={closeFollowingDialog}
      header="Following">
      <Container>
        {following?.length !== 0 ? (
          <>
            {following?.map((user: DocumentData) => (
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

  p {
    color: ${(props) => props.theme.colors.slate11};
  }

  .message__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
