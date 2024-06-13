"use client";

type ClientProviderProps = {
  children: React.ReactNode;
};

const ClientProvider = ({ children }: ClientProviderProps) => {
  return <>{children}</>;
};
export default ClientProvider;
