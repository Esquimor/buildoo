import { User } from "@server/users/user.entity";
import { create } from "zustand";

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
    removeUser: () => set(() => ({ user: null }))
}))

export default useUserStore;