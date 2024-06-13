import { create } from "zustand";

type RegisterStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useRegister = create<RegisterStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useRegister;
