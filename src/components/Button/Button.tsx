import styled from "styled-components";
import { ReactNode } from "react";

interface IButtonProps {
  variant?: string;
  fullwidth?: boolean;
  margin?: number;
  radius?: number;
  children?: JSX.Element | string;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface IIconButtonProps extends IButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

const Button = (props: IButtonProps) => {
  const {
    variant,
    fullwidth,
    margin,
    radius,
    children,
    type,
    disabled,
    onClick,
  } = props;

  return (
    <StyledButton
      variant={variant}
      fullwidth={fullwidth}
      margin={margin}
      radius={radius}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {children}
    </StyledButton>
  );
};

const IconButton = (props: IIconButtonProps) => {
  const { icon, ...rest } = props;
  return <StyledIconButton {...rest}>{icon}</StyledIconButton>;
};

export { Button, IconButton };

const StyledButton = styled.button<IButtonProps>`
  outline: 2px solid transparent;
  background-color: ${(props) => {
    if (props.variant === "primary__block") return props.theme.colors.plum9;
    if (props.variant === "primary__cta") return props.theme.colors.plum4;
    if (props.variant === "primary__outline") return props.theme.colors.plum2;
    if (props.variant === "secondary__block") return props.theme.colors.violet9;
    if (props.variant === "secondary__cta") return props.theme.colors.violet4;
    if (!props.variant) return props.theme.colors.blue2;
  }};
  color: ${(props) => {
    if (props.variant === "primary__block") return props.theme.colors.white;
    if (props.variant === "primary__cta") return props.theme.colors.plum11;
    if (props.variant === "primary__outline") return props.theme.colors.plum10;
    if (props.variant === "secondary__block") return props.theme.colors.white;
    if (props.variant === "secondary__cta") return props.theme.colors.violet11;
    if (!props.variant) return props.theme.colors.gray12;
  }};
  border-radius: ${({ radius }) => (radius ? `${radius}rem` : "0")};
  border: ${(props) => {
    if (props.variant === "primary__block") return "none";
    if (props.variant === "secondary__block") return "none";
    if (props.variant === "primary__outline")
      return `1px solid ${props.theme.colors.plum7}`;
    if (props.variant === "primary__cta")
      return `1px solid ${props.theme.colors.plum6}`;
    if (props.variant === "secondary__cta")
      return `1px solid ${props.theme.colors.violet6}`;
    if (!props.variant) return 0;
  }};
  font-weight: 500;
  outline-offset: 2px;
  padding: 0.25rem 0.75rem;
  width: ${(props) => (props.fullwidth ? "100%" : "fit-content")};

  :hover {
    background-color: ${(props) => {
      if (props.variant === "primary__block") return props.theme.colors.plum10;
      if (props.variant === "primary__cta") return props.theme.colors.plum5;
      if (props.variant === "primary__outline") return props.theme.colors.plum3;
      if (props.variant === "secondary__block")
        return props.theme.colors.violet10;
      if (props.variant === "secondary__cta") return props.theme.colors.violet5;
      if (!props.variant) return props.theme.colors.blue4;
    }};
  }

  :active {
    background-color: ${(props) => {
      if (props.variant === "primary__block") return props.theme.colors.plum6;
      if (props.variant === "primary__cta") return props.theme.colors.plum6;
      if (props.variant === "primary__outline") return props.theme.colors.plum4;
      if (props.variant === "secondary__block")
        return props.theme.colors.violet9;
      if (props.variant === "secondary__cta") return props.theme.colors.violet6;
      if (!props.variant) return props.theme.colors.blue5;
    }};
  }

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledIconButton = styled.button`
  border: 1px solid transparent;
  background-color: ${(props) => props.theme.colors.violet1};
  color: ${(props) => props.theme.colors.violet12};
  align-items: center;
  border-radius: 0.25rem;
  display: flex;
  font-size: 14px;
  width: 25px;
  height: 25px;
  justify-content: center;

  :hover {
    background-color: ${(props) => props.theme.colors.violet3};
  }

  :focus {
    outline: 1px solid ${(props) => props.theme.colors.violet7};
  }
`;
