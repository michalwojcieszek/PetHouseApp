"use client";

import useRegister from "@/hooks/useRegister";
import Box from "./Box";
import Input from "./Input";
import useLogin from "@/hooks/useLogin";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMemo } from "react";

const RegisterBox = () => {
  const { isOpen, close } = useRegister();
  const { open: openLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const email = watch("email");
  const name = watch("name");
  const password = watch("password");

  return (
    <Box
      title="Signing in"
      subtitle="Enter your data to sign up."
      buttonLabel="Sign up"
      alternativeLabel="Already have an account?"
      alternativeLink="Log in"
      close={close}
      isOpen={isOpen}
      alternativeOpen={openLogin}
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
        id="name"
        type="text"
        label="Your name"
        register={register}
        errors={errors}
        validation={{ required: "Name is required" }}
        value={name}
      />
      <Input
        id="password"
        type="password"
        label="Your password"
        register={register}
        errors={errors}
        validation={{
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password must be at least 5 characters long",
          },
        }}
        value={password}
      />
    </Box>
  );
};
export default RegisterBox;
