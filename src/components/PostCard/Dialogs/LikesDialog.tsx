import styled from "styled-components";
import Modal from "../../Modal/Modal";
import SmallUserCard from "../../UserCard/SmallCard";

type DialogProps = {
  showLikesDialog: boolean;
  closeLikesDialog: () => void;
  likes: any;
};

export default function LikesDialog({
  showLikesDialog,
  closeLikesDialog,
  likes,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showLikesDialog}
      closeModal={closeLikesDialog}
      header="Liked by">
      <Container>
        {likes?.length !== 0 ? (
          <>
            {likes?.map((user: any) => (
              <SmallUserCard key={user?.uid} user={user} showBtn={false} />
            ))}
          </>
        ) : (
          <div className="message__container">
            <p>This post hasn't been liked by anyone</p>
          </div>
        )}
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;

  .message__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
