import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("triggered");
    console.log(session);

    if (!session || !session.user || !session.user.email || !session.user.name)
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );

    const { email, name } = session?.user;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({ email, name });
    await newUser.save();

    console.log("NEW USER CREATED");
    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
