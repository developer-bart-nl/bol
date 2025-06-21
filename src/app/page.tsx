import { decode } from 'he';
import { fetchData } from '@/utils/fetchData';
import MultiSelect from '@/components/MultiSelect';

const Home = async () => {
	const categories = await fetchData<{ data: string[] }>('items.json');
	const decodedCategories = categories?.data?.map((category) => decode(category)) || [];

	return (
		<section className="content-wrapper py-12">
			{decodedCategories?.length > 0 && (
				<MultiSelect title="Product categorieën" filterName="categorie" items={decodedCategories} />
			)}
		</section>
	);
};

export default Home;
