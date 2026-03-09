import { CartStore } from 'store/CartStore';
import { CatalogStore } from 'store/CatalogStore';
import QueryParamsStore from 'store/QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly catalog = new CatalogStore();
  readonly cart = new CartStore();
}
