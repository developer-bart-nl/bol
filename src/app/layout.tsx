import type { Metadata } from 'next';
import { Merriweather, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const merriweather = Merriweather({
	subsets: ['latin'],
	weight: ['700'],
	variable: '--font-merriweather',
});

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
});

export const metadata: Metadata = {
	title: 'Bol.com',
	description: 'De winkel van ons allemaal',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${merriweather.variable} ${openSans.variable} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
