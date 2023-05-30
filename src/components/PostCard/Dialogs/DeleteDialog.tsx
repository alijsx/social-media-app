import styled from "styled-components";
import { Button } from "../..";
import Modal from "../../Modal/Modal";

type DialogProps = {
  showDeleteDialog: boolean;
  closeDeleteDialog: () => void;
  actions: any;
};

export default function DeleteDialog({
  showDeleteDialog,
  closeDeleteDialog,
  actions,
}: DialogProps): JSX.Element {
  return (
    <Modal
      showModal={showDeleteDialog}
      closeModal={closeDeleteDialog}
      header="Liked by">
      <Container>
        <div className="message">
          Are you sure you want to delete this Post?
        </div>
        <div className="actions">
          {actions.map((action: any) => (
            <Button
              key={action.id}
              onClick={action.actionHandler}
              variant={action.variant}
              radius={0.25}>
              {action.text}
            </Button>
          ))}
        </div>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`;
