import { Poppins, Cardo } from 'next/font/google';
import { type ReactNode } from "react";
import "~/styles/globals.css";
import RootStyleRegistry from "~/components/RootStyleRegistry";

export const metadata = {
	title: "Piccinni Enhancers Demo",
};

const poppins = Poppins({
	variable: '--font-poppins',
	weight: ["400","500", "700"],
	subsets: ['latin-ext'],
	display: 'swap'
});

const cardo = Cardo({
	variable: '--font-cardo',
	weight: ["400", "700"],
	subsets: ['latin-ext'],
	display: 'swap'
});


export default function RootLayout({ children }: {
	children: ReactNode;
}) {
	return (
		<html lang="en" className={`${poppins.variable} ${cardo.variable}`}>
		<body>
		<RootStyleRegistry sansClass={poppins.variable} serifClass={cardo.variable} >
			{children}
		</RootStyleRegistry>
		</body>
		</html>
	);
}
