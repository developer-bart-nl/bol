import { fetchData } from '@/utils/fetchData';

const Home = async () => {
	const categories = await fetchData<{ data: string[] }>('items.json');

	return (
		<section className="content-wrapper py-12">
			<h1 className="font-heading text-xl">All product categories</h1>
			<ul>
				{categories?.data.map((category: string, index: number) => <li key={index}>{category}</li>)}
			</ul>
		</section>
	);
};

export default Home;
