import { Link } from "react-router-dom";
import styled from "styled-components";
import BreakoutBanner from "../../assets/backgrounds/BreakoutBanner.svg";
import { FlexCenter } from "../../styles/globals";

interface Props {
  message: string;
  redirect?: boolean;
  redirectText?: string;
  redirectPath?: string;
}

export default function NoPosts({
  message,
  redirect,
  redirectPath,
  redirectText,
}: Props): JSX.Element {
  return (
    <Container>
      <FlexCenter className="image">
        <img src={BreakoutBanner} alt="Breakout banner" width={150} />
      </FlexCenter>
      <div className="message">{message}</div>
      {redirect && redirectPath && (
        <div className="redirection">
          <div className="redicrect__text">{redirectText}</div>
          <Link to={`/${redirectPath}`} className="redirect__path">
            {redirectPath}
          </Link>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .message {
    color: ${(props) => props.theme.colors.mauve10};
  }

  .redirection {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .redicrect__text {
    padding: 0.5rem 0;
  }

  .redirect__path {
    padding: 0.5rem 0.75rem;
    color: ${(props) => props.theme.colors.plum10};
    border-bottom: 1px solid ${(props) => props.theme.colors.plum7};
  }

  img {
    opacity: 0.7;
  }
`;
