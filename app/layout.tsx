import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterBox from "@/components/box/RegisterBox";
import LoginBox from "@/components/box/LoginBox";
import ClientProvider from "@/components/ClientProvider";
import Container from "@/components/Container";
import ToasterProvider from "@/providers/ToastProvider";
import getUser from "./actions/getAuthUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PetHouse",
  description: "Find accommodation for your pet!",
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const font = Nunito({ subsets: ["latin"] });

const MainLayout = async ({ children }: MainLayoutProps) => {
  const currentUser = await getUser();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
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
