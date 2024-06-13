import { create } from "zustand";

type MenuStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useMenu = create<MenuStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useMenu;
