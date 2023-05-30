import styled, { keyframes } from "styled-components";

export default function Loader(): JSX.Element {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
}

export function LoaderCircle(props: LoaderCircleType): JSX.Element {
  return <LoaderRing size={props.size} />;
}

type LoaderCircleType = {
  size?: number;
};

const LoaderContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderRing = styled.div<LoaderCircleType>`
  border: 0.25rem solid ${({ theme }) => theme.colors.plum3};
  border-top: 0.25rem solid ${({ theme }) => theme.colors.plum9};
  border-radius: 50%;
  width: ${({ size }) => (size ? `${size}rem` : "40px")};
  height: ${({ size }) => (size ? `${size}rem` : "40px")};
  animation: ${spinAnimation} 0.5s linear infinite;
`;
