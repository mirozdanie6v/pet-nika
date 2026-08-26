import type { Pet } from '@/types';

export const demoImages = {
  lucky: '/pets/lucky.svg',
  mia: '/pets/mia.svg',
} as const;

export const servicePhotos: Record<string, string> = {
  consult: demoImages.lucky,
  vaccine: demoImages.mia,
  diagnostic: demoImages.mia,
  procedure: demoImages.lucky,
};

export function getPetPhoto(pet?: Pick<Pet, 'id' | 'species' | 'photo'> | null): string {
  if (!pet) return demoImages.lucky;
  if (pet.photo?.trim()) return pet.photo;
  if (pet.id === 'mia') return demoImages.mia;
  if (pet.id === 'lucky') return demoImages.lucky;
  const species = pet.species.toLowerCase();
  return species.includes('кош') || species.includes('cat') || species.includes('mèo') ? demoImages.mia : demoImages.lucky;
}
