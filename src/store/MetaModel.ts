import { makeAutoObservable } from 'mobx';

export class MetaModel {
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  start() {
    this.loading = true;
    this.error = null;
  }

  finish() {
    this.loading = false;
  }

  fail(e: unknown) {
    this.error = e instanceof Error ? e : new Error(String(e));
    this.loading = false;
  }

  reset() {
    this.loading = false;
    this.error = null;
  }
}
