import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      setSearch: action,
    });
  }

  get search(): string {
    return this._search;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] | (string | qs.ParsedQs)[] {
    return this._params[key];
  }

  setSearch(search: string) {
    const normalized = search.startsWith('?') ? search.slice(1) : search;
    if (this._search !== normalized) {
      this._search = normalized;
      this._params = qs.parse(normalized);
    }
  }
}
