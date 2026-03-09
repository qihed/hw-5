export const LocalStorageModel = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },

  getItemJson<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  setItemJson<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  },
};
