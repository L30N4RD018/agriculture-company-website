import type { Metadata } from "next";
import Session from "@/context/sessionProvider"
import "./globals.css";

export const metadata: Metadata = {
	title: "Agriculture Company",
	description: "A simple agriculture company website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className={'bg-white'}>
				<Session>
					{children}
				</Session>
			</body>
		</html>
	);
}
