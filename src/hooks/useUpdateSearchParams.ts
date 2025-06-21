import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParams = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateSearchParams = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());

			if (value.trim()) {
				params.set(key, value);
			} else {
				params.delete(key);
			}

			const queryString = params.toString().replace(/%2C/g, ',');

			router.push(`?${queryString}`);
		},
		[router, searchParams]
	);

	return updateSearchParams;
};
