'use client';

import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import Icon from '@/components/Icon';

interface SearchBoxProps {
	onChange: (value: string) => void;
	placeholder?: string;
	delay?: number;
	className?: string;
}

const SearchBox = ({ placeholder, onChange, delay = 300, className }: SearchBoxProps) => {
	const [inputValue, setInputValue] = useState<string>('');

	const debouncedChange = useMemo(() => debounce(onChange, delay), [onChange, delay]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setInputValue(value);
		debouncedChange(value);
	};

	useEffect(() => {
		// Cleanup to cancel debounce on unmount
		return () => debouncedChange.cancel();
	}, [debouncedChange]);

	return (
		<div className={`relative ${className}`}>
			<Icon icon="search" className="absolute top-1/2 left-4 -translate-y-1/2 transform" />
			<input
				className="border-grey-200 bg-background w-full rounded-md border py-4 pr-4 pl-10"
				type="search"
				value={inputValue}
				placeholder={placeholder}
				onChange={handleChange}
				aria-label="Search input"
			/>
		</div>
	);
};

export default SearchBox;
