import { Link } from "react-router-dom";
import styled from "styled-components";

type LinkType = {
  to: string;
  children: string | JSX.Element;
};

export default function NavigationLink({ to, children }: LinkType) {
  return <StyledLink to={to}>{children}</StyledLink>;
}

const StyledLink = styled(Link)`
  border-bottom: 2px solid ${(props) => props.theme.colors.plum7};
  color: ${(props) => props.theme.colors.plum11};
`;
