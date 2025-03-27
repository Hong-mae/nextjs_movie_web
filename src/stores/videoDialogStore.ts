import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VideoDialogState {
  isOpen: boolean;
  title: string;
  vId: string;

  openDialog: (payload: { title: string; vId: string }) => void;
  closeDialog: () => void;
}

const useVideoDialogStore = create<VideoDialogState>()(
  devtools(
    (set) => ({
      isOpen: false,
      title: "",
      vId: "",

      openDialog: ({ title, vId }) =>
        set({ isOpen: true, title, vId }, false, "videoDialog/open"),

      closeDialog: () =>
        set({ isOpen: false, title: "", vId: "" }, false, "videoDialog/close"),
    }),
    { name: "🎞 VideoDialog", enabled: process.env.NODE_ENV === "development" }
  )
);

export default useVideoDialogStore;
