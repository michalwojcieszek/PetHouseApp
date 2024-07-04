import { IconType } from "react-icons";
import Header3 from "../Header3";

type FeaturesHeaderProps = {
  icon: IconType;
  children: string;
};

const FeaturesHeader = ({ icon: Icon, children }: FeaturesHeaderProps) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-2xl">
        <Icon />
      </p>
      <Header3>{children}</Header3>
    </div>
  );
};
export default FeaturesHeader;
