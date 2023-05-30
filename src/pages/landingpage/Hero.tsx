import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components";
import { useAppSelector } from "../../hooks";
import heroImg from '../../assets/backgrounds/Minimalist Website Launch Computer Mockup Instagram Post .png' 
export default function Hero() {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((s) => s.authReducer);

  return (
    <HeroContainer>
      <HeroText>
        <div className="title">
          <div>
            <span className="violet">Updated</span>
          </div>
          <div>
            <span className="plum">To</span>
          </div>
          <div>
            <span className="violet">Pro.</span>
          </div>
        </div>
        <div className="sub-title">
          Social media app for connecting with people of similar intrests
        </div>
        {!currentUser?.uid ? (
          <CTAButtons>
            <CtaButton
              variant="primary__block"
              onClick={() => navigate("/auth/signup")}>
              Signup for Free
            </CtaButton>
            <CtaButton
              variant="primary__outline"
              onClick={() => navigate("/auth/signin")}>
              Login
            </CtaButton>
          </CTAButtons>
        ) : (
          <CTAButtons>
            <CtaButton
              variant="primary__block"
              onClick={() => navigate("/home")}>
              Visit Timeline
            </CtaButton>
            <CtaButton
              variant="primary__outline"
              onClick={() => navigate(`/profile/${currentUser?.userName}`)}>
              View Profile
            </CtaButton>
          </CTAButtons>
        )}
      </HeroText>
      <HeroImage>
        <img
          src={heroImg}
          alt="preview"
        />
      </HeroImage>
    </HeroContainer>
  );
}

const HeroContainer = styled.section`
  padding: 2rem 0;
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-columns: 2fr 3fr;
    padding: 4rem 0;
  }
`;

const HeroText = styled.div`
  .title {
    font-size: clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem);
    color: ${(props) => props.theme.colors.slate12};
    font-weight: 700;
    letter-spacing: -0.055em;
    line-height: 1.2;
    padding: 2rem 0;
  }

  .sub-title {
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.slate11};
    font-weight: 500;
    letter-spacing: -0.025em;
    padding: 1rem 0 2rem;
  }

  .plum {
    color: ${(props) => props.theme.colors.plum10};
  }

  .violet {
    color: ${(props) => props.theme.colors.violet10};
  }
`;

const HeroImage = styled.div``;

const CtaButton = styled(Button)`
  padding: 1rem 2rem;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
