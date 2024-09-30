import { create } from "zustand";
import { UserType } from "../interfaces";

const userGlobalStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user: UserType) => set({ currentUser: user }),
}));

export default userGlobalStore;

export interface UsersStoreType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType) => void;
}
