import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export default async function loginAuth(
  inputs: FieldValues,
  setIsLoading: (isLoading: boolean) => void
) {
  const { email, password } = inputs;
  const data = { email, password };
  setIsLoading(true);
  await signIn("credentials", { ...data, redirect: false }).then((callback) => {
    setIsLoading(false);
    if (callback?.ok) {
      toast.success("Logged in");
    }
    if (callback?.error) {
      toast.error(callback.error);
    }
  });
}
