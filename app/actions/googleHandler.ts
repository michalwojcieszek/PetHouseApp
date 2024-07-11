import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";

export default function googleHandler() {
  const asyncGoogleHandler = async () => {
    await signIn("google");
    const session = await getServerSession(authOptions);
    if (!session || !session?.user || !session.user.email) {
      return null;
    }

    const newUserData = {
      email: session.user.email,
      name: session.user.name,
    };

    await axios.post("/api/register/google", newUserData);
  };
  asyncGoogleHandler();
}
