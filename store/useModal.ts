import { ReactNode } from "react";
import { create } from "zustand";

type TModalStore = {
	isVisible: boolean;
	content: ReactNode | null;
	showModal: (content: ReactNode) => void;
	hideModal: () => void;
};

export const useModalStore = create<TModalStore>((set) => ({
	isVisible: false,
	content: null,
	showModal: (content) => set({ isVisible: true, content }),
	hideModal: () => set({ isVisible: false, content: null }),
}));
