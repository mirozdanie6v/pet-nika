import { initialState } from '@/lib/demo-data';
import type { AppState } from '@/types';

const KEY = 'pet-nika-demo-state-v1';

export function loadState(): AppState {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return structuredClone(initialState);
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (parsed.version !== initialState.version || !Array.isArray(parsed.pets)) return structuredClone(initialState);
    return { ...structuredClone(initialState), ...parsed } as AppState;
  } catch {
    return structuredClone(initialState);
  }
}

export function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetStoredState() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}
