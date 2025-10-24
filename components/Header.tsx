"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const navItems = [
	{ label: "OSA", href: "/osaPage" },
	{ label: "Info", href: "/infoPage" },
	{ label: "Om oss", href: "/aboutUsPage" },
	{ label: "Start", href: "/" },
];

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="w-full z-50">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				{/* Left: Logo */}
				<div className="flex items-center">
					<Link href="/">
						<Image
							src="/assets/alt2-black.png"
							alt="Logo"
							width={100}
							height={100}
						/>
					</Link>
				</div>

				{/* Center: Navigation */}
				<nav className="hidden md:flex space-x-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-gray-700 hover:text-amber-400 font-medium"
						>
							{item.label}
						</Link>
					))}
				</nav>

				{/* Right: Hamburger for mobile */}
				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-gray-700 focus:outline-none"
					>
						{<FontAwesomeIcon icon={faBars} style={{ color: "#3f3f3f" }} />}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<div className="md:hidden bg-white shadow-md">
					<nav className="flex flex-col space-y-2 p-4">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-gray-700 hover:text-amber-400 font-medium"
								onClick={() => setIsOpen(false)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
