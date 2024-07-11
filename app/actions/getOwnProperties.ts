import connectDB from "@/config/database";
import getUser from "./getAuthUser";
import { NextResponse } from "next/server";
import Property from "@/models/Property";

export default async function getOwnProperties() {
  try {
    await connectDB();
    const currentUser = await getUser();
    if (!currentUser || !currentUser._id) return NextResponse.error();

    const userId = currentUser._id;

    const properties = await Property.find({ owner: userId });

    if (!properties) return NextResponse.error();

    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error(error);
  }
}
