import User from "@/models/User";

export const getUserById = async (id: string) => {
  const userNotJSON = await User.findOne({ _id: id });
  //fixing error 'Only plain objects can be passed to Client Components from Server Components'
  const user = JSON.parse(JSON.stringify(userNotJSON));
  return user;
};
