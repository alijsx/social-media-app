import { ErrorMessage, Field } from "formik";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import styled from "styled-components";

type FormikFieldType = {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  error?: any;
};

export default function FormikField({
  label,
  id,
  name,
  type,
  placeholder,
}: FormikFieldType): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword((s) => !s);

  switch (type) {
    case "password":
      return (
        <FormItem>
          <Label htmlFor={id}>{label}</Label>
          <StyledField
            type={showPassword ? "text" : "password"}
            name={name}
            id={id}
            placeholder={placeholder}
          />
          <ErrorMessage name={name} component={TextError} />
          <ShowButton onClick={toggleShowPassword}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </ShowButton>
        </FormItem>
      );
    default:
      return (
        <FormItem>
          <Label htmlFor={id}>{label}</Label>
          <StyledField
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
          />
          <ErrorMessage name={name} component={TextError} />
        </FormItem>
      );
  }
}

function TextError({ children }: any) {
  return <Error>{children}</Error>;
}

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0 2rem;
  position: relative;
`;

const Label = styled.label`
  text-transform: capitalize;
  padding-bottom: 0.25rem;
`;

const StyledField = styled(Field)`
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.plum3};
  border: 1px solid ${(props) => props.theme.colors.plum7};
  color: ${(props) => props.theme.colors.plum12};

  :focus {
    background-color: ${(props) => props.theme.colors.plum5};
    outline: 1px solid ${(props) => props.theme.colors.plum8};
  }

  :disabled {
    background-color: ${(props) => props.theme.colors.plum3};
    cursor: not-allowed;
  }
`;

const ShowButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  border-radius: 0 0.25rem 0.25rem 0;
  justify-content: center;
  padding: 0.35rem;
  top: 32.5%;
  right: 1px;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.plum6};

  :hover {
    background-color: ${(props) => props.theme.colors.plum7};
  }
`;

const Error = styled.div`
  font-size: 0.6rem;
  padding: 0.25rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.red4};
  color: ${(props) => props.theme.colors.red10};
  position: absolute;
  bottom: 0;
`;
