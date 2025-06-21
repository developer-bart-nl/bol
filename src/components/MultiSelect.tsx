'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import slugify from 'slugify';
import SearchBox from '@/components/SearchBox';
import Checkbox from '@/components/Checkbox';
import Icon from '@/components/Icon';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

interface MultiSelectProps {
	title: string;
	filterName: string;
	items: string[];
}

const MultiSelect = ({ title, filterName, items }: MultiSelectProps) => {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();
	const [options, setOptions] = useState<string[]>(items);

	const slugifiedFilterName = useMemo(() => slugify(filterName, { lower: true }), [filterName]);

	const itemToSlugMap = useMemo(() => {
		const map = new Map<string, string>();
		items.forEach((item) => {
			map.set(item, slugify(item, { lower: true, locale: 'nl' }));
		});
		return map;
	}, [items]);

	const slugToItemMap = useMemo(() => {
		const map = new Map<string, string>();
		items.forEach((item) => {
			const slug = slugify(item, { lower: true, locale: 'nl' });
			map.set(slug, item);
		});
		return map;
	}, [items]);

	const selectedOptions = useMemo(() => {
		const paramValue = searchParams.get(slugifiedFilterName);
		if (!paramValue) return [];

		const activeSlugifiedOptions = paramValue.split(',').filter(Boolean);

		return activeSlugifiedOptions
			.map((slug) => slugToItemMap.get(slug))
			.filter(Boolean) as string[];
	}, [searchParams, slugifiedFilterName, slugToItemMap]);

	const selectedSet = useMemo(() => new Set(selectedOptions), [selectedOptions]);

	const handleSearch = (value: string) => {
		const filteredItems = items.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
		setOptions(filteredItems);
	};

	const handleChecked = (value: string, checked: boolean) => {
		let newSelected: string[];

		if (checked) {
			newSelected = selectedSet.has(value) ? selectedOptions : [...selectedOptions, value];
		} else {
			newSelected = selectedOptions.filter((option) => option !== value);
		}

		const slugifiedValues = newSelected
			.map((option) => itemToSlugMap.get(option))
			.filter(Boolean)
			.join(',');

		updateSearchParams(slugifiedFilterName, slugifiedValues);
	};

	const handleRemoveSelected = (optionToRemove: string) => {
		handleChecked(optionToRemove, false);
	};

	return (
		<div className="border-grey-200 bg-grey-100 rounded-md border-1 p-4">
			<fieldset>
				<legend className="font-heading mb-2 text-lg">{title}</legend>
				<SearchBox className="mb-6" placeholder="Zoek op..." onChange={handleSearch} />

				{selectedOptions.length > 0 && (
					<div className="mb-3">
						<div className="flex flex-wrap items-center gap-1">
							<span className="text-sm font-medium">Geselecteerd:</span>
							{selectedOptions.map((option) => (
								<button
									onClick={() => handleRemoveSelected(option)}
									className="flex cursor-pointer items-center gap-1 rounded bg-blue-100 p-2 py-1 pl-2 text-xs text-blue-800 transition-colors hover:bg-blue-200"
									aria-label={`Remove ${option}`}
									key={option}
								>
									{option}
									<Icon icon="cross" className="mt-0.5 text-blue-600" />
								</button>
							))}
						</div>
					</div>
				)}

				<ul className="mb-2 max-h-50 overflow-y-scroll pl-1">
					{options.map((option, index) => (
						<li key={`${option}-${index}`} className="mb-2">
							<Checkbox label={option} checked={selectedSet.has(option)} onChange={handleChecked} />
						</li>
					))}
				</ul>
			</fieldset>
		</div>
	);
};

export default MultiSelect;
