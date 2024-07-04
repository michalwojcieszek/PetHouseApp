type Header3Props = {
  children: string;
};

const Header3 = ({ children }: Header3Props) => {
  return <h3 className="text-grey-main text-xl font-semibold">{children}</h3>;
};
export default Header3;
