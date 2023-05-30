import { toast, Toaster } from "react-hot-toast";
import styled from "styled-components";

type ToastType = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type }: ToastType) {
  return toast[type](message);
}

export function ToastComponent(props: any) {
  return <StyledToaster theme={props.theme} />;
}

const StyledToaster = styled(Toaster)`
  background-color: ${(props) => props.theme.colors.violet5};
`;
