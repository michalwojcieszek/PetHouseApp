import getUser from "@/app/actions/getAuthUser";
import connectDB from "@/config/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

type IParams = {
  propertyId: string;
};

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    await connectDB();

    const currentUser = await getUser();
    if (!currentUser || !currentUser.favourites) return NextResponse.error();

    const user = await User.findOne({ _id: currentUser._id });

    if (!user) return NextResponse.error();

    const { propertyId } = params;
    let message;

    if (user.favourites.includes(propertyId)) {
      user.favourites = user.favourites.filter(
        (curId: string) => curId != propertyId
      );
      message = "Successfully removed property from favourites";
    } else {
      user.favourites = [...user.favourites, propertyId];
      message = "Successfully added property to favourites";
    }
    await user.save();

    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
  }
}
