type Header3Props = {
  children: string | React.ReactNode;
};

const Header3 = ({ children }: Header3Props) => {
  return <h3 className="text-grey-main text-base font-semibold">{children}</h3>;
};
export default Header3;
