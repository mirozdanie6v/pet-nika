import type { AppState, ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  { id: 'consult', icon: 'stethoscope', ru: 'Первичный осмотр', en: 'Initial examination', vi: 'Khám ban đầu', description: 'Осмотр и консультация ветеринара' },
  { id: 'diagnostic', icon: 'heartPulse', ru: 'Диагностика и лечение', en: 'Diagnostics and treatment', vi: 'Chẩn đoán và điều trị', description: 'Точное обследование и план лечения' },
  { id: 'vaccine', icon: 'shieldPaw', ru: 'Профилактический осмотр, вакцинация', en: 'Preventive check-up, vaccination', vi: 'Khám định kỳ, tiêm phòng', description: 'Профилактика и плановая вакцинация' },
  { id: 'procedure', icon: 'chip', ru: 'Чипирование', en: 'Microchipping', vi: 'Gắn microchip', description: 'Идентификация питомца' },
];

export const initialState: AppState = {
  version: 2,
  language: 'ru',
  activePetId: 'lucky',
  pets: [
    {
      id: 'lucky', petId: '#N1048', owner: 'Ольга', name: 'Лаки', species: 'Собака', breed: 'Золотистый ретривер', birthDate: '2023-06-11', age: '3 года 2 мес.', sex: 'Самец', weight: '12 кг', color: 'Золотистый', sterilized: false,
      behavior: 'Спокойнее чувствует себя рядом с владельцем', allergies: 'Курица, пыльца трав', healthNotes: 'Чувствительный ЖКТ', ownerNotes: 'Боится громких звуков', clinicNotes: 'Demo note', lastVisit: '12 апр. 2025', nextReminder: 'через 24 дня', photo: '/pets/lucky.svg',
    },
    {
      id: 'mia', petId: '#N1182', owner: 'Ольга', name: 'Мия', species: 'Кошка', breed: 'Британская', birthDate: '2024-07-03', age: '2 года 1 мес.', sex: 'Самка', weight: '4 кг', color: 'Серый', sterilized: true,
      behavior: 'Переноску переносит спокойно', allergies: 'Нет известных', healthNotes: 'Уход за зубами', ownerNotes: 'Домашняя кошка', clinicNotes: 'Demo note', lastVisit: '21 июл. 2026', nextReminder: 'Вакцинация актуальна', photo: '/pets/mia.svg',
    },
  ],
  clients: [
    { id: 'c1', name: 'Ольга', contact: '+84 ••• 804', petIds: ['lucky', 'mia'], visits: 9, nextVisit: '27 Aug', status: 'Повторный' },
    { id: 'c2', name: 'Анна', contact: '+84 ••• 481', petIds: ['mia'], visits: 3, nextVisit: '26 Aug', status: 'Активный' },
    { id: 'c3', name: 'Minh', contact: 'Zalo', petIds: ['lucky'], visits: 5, nextVisit: '26 Aug', status: 'Повторный' },
  ],
  requests: [
    { id: 'r1', client: 'Анна', petId: 'mia', serviceId: 'vaccine', date: '26 Aug', time: '13:00', contact: '+84 ••• 481', source: 'Mini App', status: 'Новая', comment: 'Demo request' },
    { id: 'r2', client: 'Ольга', petId: 'lucky', serviceId: 'consult', date: '27 Aug', time: '11:30', contact: '+84 ••• 804', source: 'Repeat', status: 'Подтверждена', comment: 'Плановый осмотр' },
    { id: 'r3', client: 'Minh', petId: 'lucky', serviceId: 'procedure', date: '26 Aug', time: '15:30', contact: 'Zalo', source: 'QR', status: 'В обработке', comment: 'Demo request' },
  ],
  reminders: [
    { id: 'm1', client: 'Ольга', petId: 'lucky', reason: 'Проверить вакцинацию', date: '19 Sep', channel: 'Telegram', sent: false },
    { id: 'm2', client: 'Minh', petId: 'lucky', reason: 'Повторная процедура', date: '02 Sep', channel: 'Zalo', sent: false },
    { id: 'm3', client: 'Анна', petId: 'mia', reason: 'Контроль после визита', date: '30 Aug', channel: 'WhatsApp', sent: true },
  ],
};
