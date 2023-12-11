import { Work } from "@server/works/works.entity";
import { create } from "zustand";

interface WorkState {
  work: null | Work;
  setWork: (work: null | Work) => void;
}

export const useWorkStore = create<WorkState>((set) => ({
  work: null,
  setWork: (work) => set(() => ({ work }))
}))