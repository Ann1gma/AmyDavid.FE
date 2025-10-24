import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

const cormorantGarmond = Cormorant_Garamond({
	variable: "--font-cormorant-garmond",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Amy&David",
	description: "Amy & Davids bröllop",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${cormorantGarmond.variable} antialiased`}>
				<Header />
				<Modal />
				{children}
			</body>
		</html>
	);
}
