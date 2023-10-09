import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { axiosClient } from "../../service/axios.service";
import AuthLayout from "../../components/layouts/auth-layout";
import ClientInput from "../../components/auth/inputs/client-input";
import FormFieldError from "../../components/auth/form/form-field-error";
import Button from "../../components/elements/button";
import { Link } from "react-router-dom";

type LoginFields = {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string,
  lastname: string,
  street1: string,
  street2: string,
  city: string,
  state: string,
  zipcode: string,
};

const schema = yup
  .object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    street1: yup.string().required(),
    street2: yup.string(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  console.log(
    "🚀 ~ file: signup-page.tsx:32 ~ SignupPage ~ submissionErrors",
    submissionErrors
  );

  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: yupResolver(schema) });
  const { ref: firstnameRef, ...firstnameRest } = register("firstname");
  const { ref: lastnameRef, ...lastnameRest } = register("lastname");
  const { ref: street1Ref, ...street1Rest } = register("street1");
  const { ref: street2Ref, ...street2Rest } = register("street2");
  const { ref: cityRef, ...cityRest } = register("city");
  const { ref: stateRef, ...stateRest } = register("state");
  const { ref: zipcodeRef, ...zipcodeRest } = register("zipcode");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: confirmPasswordRef, ...confirmPasswordRest } =
    register("confirmPassword");

  const onsubmit = async (data: LoginFields) => {
    setSubmissionErrors([]);
    setIsLoading(true);

    try {
      await axiosClient.post("/auth/signup", data).finally(() => {
        setIsLoading(false);
        resetField("password");
        resetField("confirmPassword");
      });

      setSuccess(true);
    } catch (error) {
      if (
        (error as any).response.data.errors &&
        (error as any).response.data.errors.length > 0
      ) {
        const errorsArray = (error as any).response.data.errors.map(
          (err: { msg: string }) => err.msg
        );
        setSubmissionErrors(errorsArray);
      } else if ((error as any).response.data.message) {
        setSubmissionErrors([(error as any).response.data.message]);
      }
    }
  };

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white/20"
      >
        <h1 className="text-center font-bold text-slate-800 text-3xl mb-4 text-indigo-900">
          Registration
        </h1>
        {submissionErrors.length > 0 ? (
          <ul className="p-4 border-[1px] border-red-500 rounded-xl mb-5 max-w-sm flex items-center justify-center flex-col space-y-3">
            {submissionErrors.map((err, i) => (
              <li key={i} className="text-red-500 font-bold">
                • {err}.
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
        {success ? (
          <div className="flex flex-col justify-center text-slate-800 items-center space-y-6 max-w-sm">
            <h1 className="text-3xl font-light">
              You've successfully signed up!
            </h1>
            <p className="text-xl font-light text-center">
              You can now go and login to your new account and get our
              hot-special-delivery cookies suggestions!
            </p>
            <Link to="/auth/login">
              <Button
                value="Go Login!"
                className="bg-green-500 hover:bg-green-600"
              />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <ClientInput
                  placeholder="First name"
                  reference={firstnameRef}
                  {...firstnameRest}
              />
              {errors.firstname?.message ? (
                  <FormFieldError errorMessage={errors.firstname.message} />
              ) : (
                  ""
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <ClientInput
                  placeholder="Last name"
                  reference={lastnameRef}
                  {...lastnameRest}
              />
              {errors.lastname?.message ? (
                  <FormFieldError errorMessage={errors.lastname.message} />
              ) : (
                  ""
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <ClientInput
                placeholder="Email"
                reference={emailRef}
                {...emailRest}
              />
              {errors.email?.message ? (
                <FormFieldError errorMessage={errors.email.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                type={"password"}
                placeholder="Password"
                reference={passwordRef}
                {...passwordRest}
              />
              {errors.password?.message ? (
                <FormFieldError errorMessage={errors.password.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                type={"password"}
                placeholder="Confirm Password"
                reference={confirmPasswordRef}
                {...confirmPasswordRest}
              />
              {errors.confirmPassword?.message ? (
                <FormFieldError errorMessage={errors.confirmPassword.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                  placeholder="Street 1"
                  reference={street1Ref}
                  {...street1Rest}
              />
              {errors.street1?.message ? (
                  <FormFieldError errorMessage={errors.street1.message} />
              ) : (
                  ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                  placeholder="Street 2"
                  reference={street2Ref}
                  {...street2Rest}
              />
              {errors.street2?.message ? (
                  <FormFieldError errorMessage={errors.street2.message} />
              ) : (
                  ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                  placeholder="City"
                  reference={cityRef}
                  {...cityRest}
              />
              {errors.city?.message ? (
                  <FormFieldError errorMessage={errors.city.message} />
              ) : (
                  ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                  placeholder="State"
                  reference={stateRef}
                  {...stateRest}
              />
              {errors.state?.message ? (
                  <FormFieldError errorMessage={errors.state.message} />
              ) : (
                  ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                  placeholder="Zipcode"
                  reference={zipcodeRef}
                  {...zipcodeRest}
              />
              {errors.zipcode?.message ? (
                  <FormFieldError errorMessage={errors.zipcode.message} />
              ) : (
                  ""
              )}
            </div>
            <Button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg" isLoading={isLoading} value="Register" type="submit">
              Sing up
            </Button>
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default SignupPage;