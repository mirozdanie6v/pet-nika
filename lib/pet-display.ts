import type { Language } from '@/types';
import { localizedPetValue } from '@/lib/i18n';

const demoPetCopy: Record<Language, Record<string, string>> = {
  ru: {
    'Лаки': 'Лаки',
    'Мия': 'Мия',
    'Корги': 'Корги',
    'Британская': 'Британская',
    'Рыже-белый': 'Рыже-белый',
    'Серый': 'Серый',
    'Спокойнее чувствует себя рядом с владельцем': 'Спокойнее чувствует себя рядом с владельцем',
    'Боится громких звуков': 'Боится громких звуков',
    'Demo: без подтверждённых хронических особенностей': 'Demo: без подтверждённых хронических особенностей',
    'Переноску переносит спокойно': 'Переноску переносит спокойно',
    'Demo: без особенностей': 'Demo: без особенностей',
    'Домашняя кошка': 'Домашняя кошка',
  },
  en: {
    'Лаки': 'Lucky',
    'Мия': 'Mia',
    'Корги': 'Corgi',
    'Британская': 'British Shorthair',
    'Рыже-белый': 'Red and white',
    'Серый': 'Gray',
    'Спокойнее чувствует себя рядом с владельцем': 'Feels calmer when close to the owner',
    'Боится громких звуков': 'Afraid of loud noises',
    'Demo: без подтверждённых хронических особенностей': 'Demo: no confirmed chronic conditions',
    'Переноску переносит спокойно': 'Tolerates the carrier calmly',
    'Demo: без особенностей': 'Demo: no known issues',
    'Домашняя кошка': 'Indoor cat',
  },
  vi: {
    'Лаки': 'Lucky',
    'Мия': 'Mia',
    'Корги': 'Corgi',
    'Британская': 'British Shorthair',
    'Рыже-белый': 'Đỏ trắng',
    'Серый': 'Xám',
    'Спокойнее чувствует себя рядом с владельцем': 'Bình tĩnh hơn khi ở gần chủ',
    'Боится громких звуков': 'Sợ tiếng động lớn',
    'Demo: без подтверждённых хронических особенностей': 'Demo: chưa ghi nhận bệnh mạn tính',
    'Переноску переносит спокойно': 'Bình tĩnh khi ở trong lồng vận chuyển',
    'Demo: без особенностей': 'Demo: chưa ghi nhận vấn đề đặc biệt',
    'Домашняя кошка': 'Mèo nuôi trong nhà',
  },
};

export function localizedPetDisplay(language: Language, value: string) {
  return demoPetCopy[language][value] ?? localizedPetValue(language, value);
}
