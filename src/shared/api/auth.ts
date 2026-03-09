import api from 'api/api';
import { LocalStorageModel } from 'store/LocalStorageModel';

const AUTH_TOKEN_KEY = 'auth_token';

export function getToken(): string | null {
  return LocalStorageModel.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string): void {
  LocalStorageModel.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken(): void {
  LocalStorageModel.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Вызов API выхода и очистка токена. После вызова нужно перенаправить пользователя на главную.
 */
export async function logout(): Promise<void> {
  const token = getToken();
  try {
    await api.post('/auth/logout', undefined, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  } finally {
    clearToken();
  }
}
