"use client";

import MenuItem from "./MenuItem";
import useRegister from "@/hooks/useRegister";
import useLogin from "@/hooks/useLogin";

type LoggedMenuProps = {
  handleToggle: (
    openCheck: boolean,
    open: () => void,
    close: () => void
  ) => void;
};

const NotLoggedMenu = ({ handleToggle }: LoggedMenuProps) => {
  const {
    isOpen: isRegisterOpen,
    open: openRegister,
    close: closeRegister,
  } = useRegister();
  const {
    isOpen: isLoginOpen,
    open: openLogin,
    close: closeLogin,
  } = useLogin();

  return (
    <>
      <MenuItem action={() => handleToggle(isLoginOpen, openLogin, closeLogin)}>
        Login
      </MenuItem>
      <hr />
      <MenuItem
        action={() => handleToggle(isRegisterOpen, openRegister, closeRegister)}
      >
        Sign Up
      </MenuItem>
    </>
  );
};
export default NotLoggedMenu;
