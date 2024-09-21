import { ProductsFilters } from './ProductsFilters';
import { CardList } from './CardList';

export function ProductsPage() {
  return (
    <main className="grow">
      <ProductsFilters />
      <CardList />
    </main>
  );
}
