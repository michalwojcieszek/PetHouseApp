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
  const currentUser = await getUser();
  console.log("CURRENTUSER");
  console.log(currentUser);
  // const currentUser = JSON.parse(JSON.stringify(currentUserNotJSON));

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientProvider>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <div className="pb-2 pt-4 xl:pt-8">
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
