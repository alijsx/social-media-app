import styled from "styled-components";
import { BsGoogle } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiDatabase } from "react-icons/fi";

export default function Features(): JSX.Element {
  const features = [
    {
      id: 1,
      text: "Fast",
      icon: <AiOutlineThunderbolt />,
    },
   
    {
      id: 3,
      text: "Realtime Sync with firebase",
      icon: <FiDatabase />,
    },
  ];

  return (
    <Container>
      <div className="features__list">
        {features.map((feature) => (
          <div className="feature" key={feature.id}>
            <div className="icon">{feature.icon}</div>
            <div className="text">{feature?.text}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 0;
  text-align: center;

  .features__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 2rem;
  }

  .feature {
    padding: 2rem;
    display: flex;
    gap: 2rem;
    background-color: ${(props) => props.theme.colors.violet3};

    .icon {
      font-size: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.colors.plum10};
    }

    .text {
      text-transform: capitalize;
      color: ${(props) => props.theme.colors.violet10};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
