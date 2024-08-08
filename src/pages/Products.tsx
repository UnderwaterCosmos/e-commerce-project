import { ProductsFilters } from '../components/ProductsFilters';
import { CardList } from '../components/CardList';

export function Products() {
  return (
    <main className="grow">
      <ProductsFilters />
      <CardList />
    </main>
  );
}
