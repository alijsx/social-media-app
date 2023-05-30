import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";

type ACProps = {
  message?: string;
};

export default function AllCaughtUp({ message = "" }: ACProps): JSX.Element {
  return (
    <Container>
      <div className="icon">
        <AiOutlineCheckCircle />
      </div>
      <div className="message">
        {message !== "" ? `${message}` : "You are all caught up"}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 10rem 0 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;

    svg {
      fill: ${(props) => props.theme.colors.teal10};
    }
  }
`;
