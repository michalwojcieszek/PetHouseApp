import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterBox from "@/components/box/RegisterBox";
import LoginBox from "@/components/box/LoginBox";
import ClientProvider from "@/components/ClientProvider";
import Container from "@/components/Container";
import ToasterProvider from "@/providers/ToastProvider";
import getUser from "./actions/getAuthUser";

type MainLayoutProps = {
  children: React.ReactNode;
};

const font = Nunito({ subsets: ["latin"] });

const MainLayout = async ({ children }: MainLayoutProps) => {
  const currentUserNotJSON = await getUser();
  const currentUser = JSON.parse(JSON.stringify(currentUserNotJSON));

  console.log(currentUser);
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientProvider>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <div className="pb-2 pt-10">
            <Container>{children}</Container>
          </div>
          <RegisterBox />
          <LoginBox />
        </ClientProvider>
      </body>
    </html>
  );
};
export default MainLayout;
