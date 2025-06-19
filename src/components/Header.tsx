import Link from 'next/link';
import Logo from '@/components/Logo';

const Header = () => (
	<header className="bg-primary py-6">
		<div className="content-wrapper">
			<Link href="/">
				<Logo className="text-background w-[82px]" />
			</Link>
		</div>
	</header>
);

export default Header;
