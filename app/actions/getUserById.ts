import connectDB from "@/config/database";
import User from "@/models/User";

export const getUserById = async (id: string) => {
  await connectDB();
  const userNotJSON = await User.findOne({ _id: id });
  //fixing error 'Only plain objects can be passed to Client Components from Server Components'
  const user = JSON.parse(JSON.stringify(userNotJSON));
  return user;
};
