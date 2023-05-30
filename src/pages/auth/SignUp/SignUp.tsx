import { useMemo } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useDocumentTitle } from "../../../hooks";
import { Button, FormikField, NavigationLink } from "../../../components";
import {
  signUpHandler,
  googleSignUpHandler,
} from "../../../redux/features/Auth/thunk";
import GoogleLogo from "../../../assets/icons/GoogleLogo.svg";
import { FlexCenter } from "../../../styles/globals";
import { SignUpType, FieldType } from "../../../types";

export default function SignUp(): JSX.Element {
  const dispatch = useAppDispatch();

  const initialValues: SignUpType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Cannot be empty").trim(),
    lastName: Yup.string().required("Cannot be empty").trim(),
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short"),
  });

  const handleSubmit = (values: SignUpType, { resetForm }: any) => {
    dispatch(signUpHandler(values));
    resetForm();
  };

  const formikFields: FieldType[] = useMemo(() => {
    return [
      {
        id: "firstName",
        type: "firstName",
        name: "firstName",
        label: "First Name",
      },
      {
        id: "lastName",
        type: "lastName",
        name: "lastName",
        label: "Last Name",
      },
      {
        id: "email",
        type: "email",
        name: "email",
        label: "email",
      },
      {
        id: "password",
        type: "password",
        name: "password",
        label: "password",
      },
    ];
  }, []);

  useDocumentTitle({ title: "SignUp | Updated To Pro" });

  return (
    <FormContainer>
      <FormHeading>Sign Up</FormHeading>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <>
          <Form>
            {formikFields.map((field) => (
              <FormikField
                key={field.id}
                id={field.id}
                label={field.label}
                name={field.name}
                type={field.type}
              />
            ))}
            <FlexCenter>
              <LoginBtn variant="primary__block" fullwidth radius={0.25}>
                Sign Up
              </LoginBtn>
            </FlexCenter>
          </Form>
          {/* <FlexCenter>
            <LoginBtn
              variant="primary__outline"
              fullwidth
              radius={0.25}
              onClick={() => dispatch(googleSignUpHandler())}>
              <FlexCenter>
                <FlexCenter>
                  <img src={GoogleLogo} alt="Google Logo" />
                </FlexCenter>
                &nbsp; Sign Up With Google
              </FlexCenter>
            </LoginBtn>
          </FlexCenter> */}
          <div>
            Already have an account?&nbsp;&nbsp;
            <NavigationLink to="/auth/signin">Sign In</NavigationLink>
          </div>
        </>
      </Formik>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 80vh;
  padding: 4rem 0;
`;

const FormHeading = styled.h3`
  font-size: 1.5rem;
  padding-bottom: 1rem;
`;

const LoginBtn = styled(Button)`
  margin: 1rem 0 0;
  padding: 0.45rem;

  :last-child {
    margin: 1rem 0;
    width: 18.025rem;
  }
`;
