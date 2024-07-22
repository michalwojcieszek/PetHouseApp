import Image from "next/image";

type FlagImgProps = {
  code: string;
  name: string;
};

const FlagImg = ({ code, name }: FlagImgProps) => {
  return (
    <Image
      src={`https://flagsapi.com/${code}/flat/64.png`}
      alt={`Flag of ${name}`}
      width={30}
      height={30}
    />
  );
};
export default FlagImg;
