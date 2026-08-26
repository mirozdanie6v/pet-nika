import type { AppState, ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  { id: 'consult', icon: 'stethoscope', ru: 'Консультация', en: 'Consultation', vi: 'Tư vấn', description: 'Осмотр, жалобы и дальнейший план' },
  { id: 'vaccine', icon: 'syringe', ru: 'Вакцинация', en: 'Vaccination', vi: 'Tiêm phòng', description: 'Плановая вакцинация и напоминание' },
  { id: 'diagnostic', icon: 'flask', ru: 'Диагностика', en: 'Diagnostics', vi: 'Chẩn đoán', description: 'Результаты и рекомендации в карточке' },
  { id: 'procedure', icon: 'bandage', ru: 'Процедуры', en: 'Procedures', vi: 'Thủ thuật', description: 'Повторный визит без лишних данных' },
];

export const initialState: AppState = {
  version: 1,
  language: 'ru',
  activePetId: 'lucky',
  pets: [
    {
      id: 'lucky', petId: '#N1048', owner: 'Ольга', name: 'Лаки', species: 'Собака', breed: 'Корги', birthDate: '2022-05-11', age: '4 года', sex: 'Самец', weight: '12.4 kg', color: 'Рыже-белый', sterilized: false,
      behavior: 'Спокойнее чувствует себя рядом с владельцем', allergies: 'Не указаны', healthNotes: 'Demo: без подтверждённых хронических особенностей', ownerNotes: 'Боится громких звуков', clinicNotes: 'Demo note', lastVisit: '12 Aug', nextReminder: '19 Sep',
    },
    {
      id: 'mia', petId: '#N1182', owner: 'Ольга', name: 'Мия', species: 'Кошка', breed: 'Британская', birthDate: '2024-02-03', age: '2 года', sex: 'Самка', weight: '4.8 kg', color: 'Серый', sterilized: true,
      behavior: 'Переноску переносит спокойно', allergies: 'Demo: без особенностей', healthNotes: 'Demo: без подтверждённых хронических особенностей', ownerNotes: 'Домашняя кошка', clinicNotes: 'Demo note', lastVisit: '21 Jul', nextReminder: '03 Oct',
    },
  ],
  clients: [
    { id: 'c1', name: 'Ольга', contact: '+84 ••• 804', petIds: ['lucky', 'mia'], visits: 9, nextVisit: '27 Aug', status: 'Повторный' },
    { id: 'c2', name: 'Анна', contact: '+84 ••• 481', petIds: ['demo-mia'], visits: 3, nextVisit: '26 Aug', status: 'Активный' },
    { id: 'c3', name: 'Minh', contact: 'Zalo', petIds: ['barsik'], visits: 5, nextVisit: '26 Aug', status: 'Повторный' },
  ],
  requests: [
    { id: 'r1', client: 'Анна', petId: 'mia', serviceId: 'vaccine', date: '26 Aug', time: '13:00', contact: '+84 ••• 481', source: 'Mini App', status: 'Новая', comment: 'Demo request' },
    { id: 'r2', client: 'Ольга', petId: 'lucky', serviceId: 'consult', date: '27 Aug', time: '11:30', contact: '+84 ••• 804', source: 'Repeat', status: 'Подтверждена', comment: 'Плановый осмотр' },
    { id: 'r3', client: 'Minh', petId: 'barsik', serviceId: 'procedure', date: '26 Aug', time: '15:30', contact: 'Zalo', source: 'QR', status: 'В обработке', comment: 'Demo request' },
  ],
  reminders: [
    { id: 'm1', client: 'Ольга', petId: 'lucky', reason: 'Проверить вакцинацию', date: '19 Sep', channel: 'Telegram', sent: false },
    { id: 'm2', client: 'Minh', petId: 'barsik', reason: 'Повторная процедура', date: '02 Sep', channel: 'Zalo', sent: false },
    { id: 'm3', client: 'Анна', petId: 'mia', reason: 'Контроль после визита', date: '30 Aug', channel: 'WhatsApp', sent: true },
  ],
};
