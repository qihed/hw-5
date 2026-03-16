import { fetchCategoriesServer } from '../products/getProductsServer';
import CategoriesContent from './CategoriesContent';

export default async function CategoriesPage() {
  const categories = await fetchCategoriesServer();

  return <CategoriesContent categories={categories} />;
}
