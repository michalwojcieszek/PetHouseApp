import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterBox from "@/components/box/RegisterBox";
import LoginBox from "@/components/box/LoginBox";
import ClientProvider from "@/components/ClientProvider";

type MainLayoutProps = {
  children: React.ReactNode;
};

const font = Nunito({ subsets: ["latin"] });

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientProvider>
          <Navbar />
          <RegisterBox />
          <LoginBox />
          <div className="pb-20 pt-28">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
};
export default MainLayout;
