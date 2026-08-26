import type { Pet } from '@/types';

export const demoImages = {
  lucky: 'https://images.unsplash.com/photo-1775018118638-f5d3a8c60f39?auto=format&fit=crop&w=900&q=82',
  mia: 'https://images.unsplash.com/photo-1497289277924-50d2b59346d4?auto=format&fit=crop&w=900&q=82',
} as const;

export const servicePhotos: Record<string, string> = {
  consult: demoImages.lucky,
  vaccine: demoImages.mia,
  diagnostic: demoImages.mia,
  procedure: demoImages.lucky,
};

export function getPetPhoto(pet?: Pick<Pet, 'id' | 'species' | 'photo'> | null): string {
  if (!pet) return demoImages.lucky;
  if (pet.photo) return pet.photo;
  if (pet.id === 'mia') return demoImages.mia;
  if (pet.id === 'lucky') return demoImages.lucky;
  return pet.species.toLowerCase().includes('кош') || pet.species.toLowerCase().includes('cat')
    ? demoImages.mia
    : demoImages.lucky;
}
