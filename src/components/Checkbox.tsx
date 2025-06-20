import clsx from 'clsx';

interface CheckboxProps {
	label: string;
	checked: boolean;
	onChange: (value: string, checked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
	const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		onChange(label, checked);
	};

	return (
		<div className="flex cursor-pointer items-center">
			<input
				id={`checkbox-${label}`}
				type="checkbox"
				onChange={handleChecked}
				checked={checked}
				className={clsx(
					'border-grey-200 bg-background checked:border-background checked:bg-action h-5 w-5 cursor-pointer appearance-none rounded-sm border-1',
					{
						'text-action text-bold': checked,
					}
				)}
			/>
			<label
				htmlFor={`checkbox-${label}`}
				className={clsx('cursor-pointer pl-2 select-none', {
					'text-action': checked,
				})}
			>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
