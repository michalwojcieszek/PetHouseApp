"use client";

import useLogin from "@/hooks/useLogin";
import Box from "./Box";
import Input from "./Input";
import useRegister from "@/hooks/useRegister";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import loginAuth from "@/app/actions/loginAuth";

const LoginBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, close } = useLogin();
  const { open: openRegister } = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (inputs) => {
    await loginAuth(inputs, setIsLoading);
    console.log("2");
    close();
    // setIsLoading(true);
    // signIn("credentials", { ...inputs, redirect: false }).then((callback) => {
    //   setIsLoading(false);
    //   if (callback?.ok) {
    //     toast.success("Logged in");
    //     close();
    //   }
    //   if (callback?.error) {
    //     toast.error(callback.error);
    //   }
    // });
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
      isLoading={isLoading}
    >
      <Input
        id="email"
        type="email"
        label="Your email"
        register={register}
        errors={errors}
        validation={{ required: "Email is required" }}
        disabled={isLoading}
        value={email}
      />
      <Input
        id="password"
        type="password"
        label="Your password"
        register={register}
        errors={errors}
        validation={{ required: "Password is required" }}
        disabled={isLoading}
        value={password}
      />
    </Box>
  );
};
export default LoginBox;
