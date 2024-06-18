import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getUser() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return null;
    }

    let image;
    if (session?.user?.image) {
      image = session.user.image;
    } else {
      image = null;
    }

    const currentUser = await User.findOne({ email: session?.user?.email });
    if (!currentUser) return null;

    if (image) {
      return { ...currentUser.toObject(), image };
    } else {
      return currentUser;
    }
  } catch (error) {
    return null;
  }
}
