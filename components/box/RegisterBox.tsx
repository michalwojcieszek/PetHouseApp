"use client";

import useRegister from "@/hooks/useRegister";
import Box from "./Box";
import Input from "../Input";
import useLogin from "@/hooks/useLogin";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import loginAuth from "@/app/actions/loginAuth";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterBox = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async (inputs) => {
    async function register(inputs: FieldValues) {
      try {
        setIsLoading(true);
        await axios.post("/api/register", inputs);

        toast.success("Registered successfully");
        //automatic logging in after registration
        await loginAuth(inputs, setIsLoading);
        router.refresh();
        close();
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    await register(inputs);
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
        id="name"
        type="text"
        label="Your name"
        register={register}
        errors={errors}
        validation={{ required: "Name is required" }}
        disabled={isLoading}
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
        disabled={isLoading}
        value={password}
      />
    </Box>
  );
};
export default RegisterBox;
