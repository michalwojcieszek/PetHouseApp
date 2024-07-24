import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function getUser() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return null;
    }

    const { name, email } = session.user;

    let image;
    if (session?.user?.image) {
      image = session.user.image;
    } else {
      image = null;
    }

    const userEmail = session?.user?.email;

    let currentUser = await User.findOne({ email: userEmail });
    // if no user found, create a new one and send to DB
    if (!currentUser) {
      const newUser = new User({ email, name });
      await newUser.save();
      currentUser = newUser;
    }

    if (image) {
      return JSON.parse(JSON.stringify({ ...currentUser.toObject(), image }));
    } else {
      return JSON.parse(JSON.stringify({ ...currentUser.toObject() }));
    }
  } catch (error) {
    return null;
  }
}
