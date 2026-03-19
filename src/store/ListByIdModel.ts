export const ListByIdModel = {
  getById<T>(list: T[], getId: (item: T) => string, id: string): T | undefined {
    return list.find((item) => getId(item) === id);
  },

  getIndexById<T>(list: T[], getId: (item: T) => string, id: string): number {
    return list.findIndex((item) => getId(item) === id);
  },

  removeById<T>(list: T[], getId: (item: T) => string, id: string): T[] {
    return list.filter((item) => getId(item) !== id);
  },
};
