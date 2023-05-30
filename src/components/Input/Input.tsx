import styled from "styled-components";

interface IInput {
  label: string;
  type: string;
  name: string;
  id?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  accept?: string;
  onChange?: any;
  [x: string]: any;
}

export default function Input(props: IInput): JSX.Element {
  const {
    label,
    type,
    name,
    id,
    value,
    accept,
    disabled,
    placeholder,
    onChange,
  } = props;

  return (
    <FormItem>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput
        type={type}
        id={id}
        name={name}
        value={value}
        accept={accept}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </FormItem>
  );
}

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 0;
  position: relative;
`;

const Label = styled.label`
  text-transform: capitalize;
`;

const StyledInput = styled.input`
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
