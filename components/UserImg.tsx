import { CurrentUserType } from "@/types";
import Image from "next/image";
import placeholder from "@/public/images/placeholder.jpg";

type UserImgProps = {
  currentUser?: CurrentUserType;
};

const UserImg = ({ currentUser }: UserImgProps) => {
  return (
    <Image
      src={currentUser?.image || placeholder}
      alt="PetHouse logo"
      width="25"
      height="25"
      className="rounded-full"
    />
  );
};
export default UserImg;
