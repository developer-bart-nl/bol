export interface IconProps {
	icon: 'search' | 'cross';
	className?: string;
}

const Icon = ({ icon, className }: IconProps) => (
	<svg width={16} height={16} role="img" aria-label={`${icon} icon`} className={className}>
		<use href={`/icons.svg#${icon}`} crossOrigin="anonymous" />
	</svg>
);

export default Icon;
