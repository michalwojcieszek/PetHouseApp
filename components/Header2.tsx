type Header2Props = {
  children: string;
};

const Header2 = ({ children }: Header2Props) => {
  return <h2 className="text-grey-main text-lg">{children}</h2>;
};
export default Header2;
