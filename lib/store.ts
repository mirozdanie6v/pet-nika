import { initialState } from '@/lib/demo-data';
import { loadState, resetStoredState, saveState } from '@/lib/storage';
import type { AppState } from '@/types';

let currentState: AppState = initialState;
let initialized = false;
const listeners = new Set<() => void>();

function ensureClientState() {
  if (!initialized && typeof window !== 'undefined') {
    currentState = loadState();
    initialized = true;
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  ensureClientState();
  return currentState;
}

export function getServerSnapshot() {
  return initialState;
}

export function updateState(updater: (state: AppState) => AppState) {
  ensureClientState();
  currentState = updater(currentState);
  saveState(currentState);
  listeners.forEach((listener) => listener());
}

export function resetState() {
  resetStoredState();
  currentState = structuredClone(initialState);
  initialized = true;
  saveState(currentState);
  listeners.forEach((listener) => listener());
}
