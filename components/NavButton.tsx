"use client";

import { useRouter } from "next/navigation";

const NavButton = ({ text, url }: { text: string; url: string }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(url);
	};

	return (
		<button
			className="bg-amber-400 hover:bg-amber-300 px-8 py-2 rounded-2xl"
			onClick={handleClick}
		>
			<p className="font-semibold">{text}</p>
		</button>
	);
};

export default NavButton;
