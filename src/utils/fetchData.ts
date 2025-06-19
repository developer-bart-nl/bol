import chalk from 'chalk';

const BASE_URL = 'http://localhost:3000';

export const fetchData = async <T>(path: string): Promise<T | null> => {
	try {
		const response = await fetch(`${BASE_URL}/${path}`, {
			method: 'GET',
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();

		return data as T;
	} catch (error) {
		console.error(
			chalk.red(`Something went wrong fetching the data from ${BASE_URL}/${path}.\n${error}.`)
		);
		return null;
	}
};
