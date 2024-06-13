"use client";

import useLogin from "@/hooks/useLogin";
import Box from "./Box";
import Input from "./Input";
import useRegister from "@/hooks/useRegister";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginBox = () => {
  const { isOpen, close } = useLogin();
  const { open: openRegister } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const email = watch("email");
  const password = watch("password");

  return (
    <Box
      title="Logging in"
      subtitle="Enter your data to log in."
      buttonLabel="Log in"
      alternativeLabel="Don't have any account?"
      alternativeLink="Sign up"
      close={close}
      isOpen={isOpen}
      alternativeOpen={openRegister}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="email"
        type="email"
        label="Your email"
        register={register}
        errors={errors}
        validation={{ required: "Email is required" }}
        value={email}
      />
      <Input
        id="password"
        type="password"
        label="Your password"
        register={register}
        errors={errors}
        validation={{ required: "Password is required" }}
        value={password}
      />
    </Box>
  );
};
export default LoginBox;
