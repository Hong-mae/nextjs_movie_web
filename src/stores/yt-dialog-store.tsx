import { createStore } from "zustand";
import { devtools } from "zustand/middleware";

export type YTDialogState = {
  title: string;
  vId: string;
  open: boolean;
};

export type YTDialogActions = {
  isOpen: (title: string, vId: string, open: boolean) => void;
  Close: () => void;
};

export type YTDialogStore = YTDialogState & YTDialogActions;

export const initYTDialogStore = (): YTDialogState => {
  return { title: "", vId: "", open: false };
};

export const defaultInitState: YTDialogState = {
  title: "",
  vId: "",
  open: false,
};

export const createYTDialogStore = (
  initState: YTDialogState = defaultInitState
) => {
  return createStore<YTDialogStore>()(
    devtools((set) => ({
      ...initState,
      isOpen: (title, vId) =>
        set(() => ({ title: title, open: true, vId: vId })),
      Close: () => set(() => ({ open: false })),
    }))
  );
};
