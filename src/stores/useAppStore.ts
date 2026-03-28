import { create } from "zustand";

interface AppState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) =>
    set({ mobileMenuOpen, notificationsOpen: false }),
  notificationsOpen: false,
  setNotificationsOpen: (notificationsOpen) =>
    set({ notificationsOpen, mobileMenuOpen: false }),
}));
