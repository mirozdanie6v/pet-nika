import { initialState } from '@/lib/demo-data';
import type { AppState, Pet } from '@/types';

const KEY = 'pet-nika-demo-state-v1';

function withDefaultPhoto(pet: Pet): Pet {
  if (pet.photo?.trim()) return pet;
  if (pet.id === 'mia') return { ...pet, photo: '/pets/mia.svg' };
  if (pet.id === 'lucky') return { ...pet, photo: '/pets/lucky.svg' };
  const species = pet.species.toLowerCase();
  return { ...pet, photo: species.includes('кош') || species.includes('cat') || species.includes('mèo') ? '/pets/mia.svg' : '/pets/lucky.svg' };
}

function migrateState(parsed: Partial<AppState>): AppState {
  const merged = { ...structuredClone(initialState), ...parsed } as AppState;
  merged.version = initialState.version;
  merged.pets = (Array.isArray(parsed.pets) ? parsed.pets : initialState.pets).map((pet) => withDefaultPhoto({ ...pet } as Pet));
  if (!merged.pets.some((pet) => pet.id === merged.activePetId)) merged.activePetId = merged.pets[0]?.id ?? initialState.activePetId;
  return merged;
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return structuredClone(initialState);
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (!Array.isArray(parsed.pets)) return structuredClone(initialState);
    const migrated = migrateState(parsed);
    window.localStorage.setItem(KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return structuredClone(initialState);
  }
}

export function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify({ ...state, version: initialState.version }));
}

export function resetStoredState() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}
