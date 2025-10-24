"use client";

import { useModalStore } from "@/store";

const Modal = () => {
	const { content, isVisible } = useModalStore();
	return (
		isVisible && (
			<>
				<div className="fixed inset-0 bg-white/80 z-40"></div>
				<div className="fixed inset-0 flex items-center justify-center z-50">
					{content}
				</div>
			</>
		)
	);
};

export default Modal;
