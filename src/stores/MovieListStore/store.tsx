import { createStore } from "zustand";
import { devtools } from "zustand/middleware";

export type MLState = {
  page: number;
  target: string;
};

export type MLActions = {
  getList: (page: number, target: string) => void;
};

export type MLStore = MLState & MLActions;

export const initMLStore = (): MLState => {
  return { page: 1, target: "now_playing" };
};

export const defaultMLState: MLState = {
  page: 1,
  target: "now_playing",
};

export const createMLStore = (initState: MLState = defaultMLState) => {
  return createStore<MLStore>()(
    devtools((set) => ({
      ...initState,
      getList: (page, target) => set(() => ({ page, target })),
    }))
  );
};
