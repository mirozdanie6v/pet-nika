export type Language = 'ru' | 'en' | 'vi';
export type AppRole = 'client' | 'admin';
export type RequestStatus = 'Новая' | 'В обработке' | 'Подтверждена' | 'Завершена' | 'Отменена';

export interface Pet {
  id: string;
  petId: string;
  owner: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  age: string;
  sex: string;
  weight: string;
  color: string;
  sterilized: boolean;
  behavior: string;
  allergies: string;
  healthNotes: string;
  ownerNotes: string;
  clinicNotes: string;
  lastVisit: string;
  nextReminder: string;
  photo?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  contact: string;
  petIds: string[];
  visits: number;
  nextVisit: string;
  status: 'Новый' | 'Активный' | 'Повторный';
}

export interface AppointmentRequest {
  id: string;
  client: string;
  petId: string;
  serviceId: string;
  date: string;
  time: string;
  contact: string;
  source: string;
  status: RequestStatus;
  comment: string;
}

export interface Reminder {
  id: string;
  client: string;
  petId: string;
  reason: string;
  date: string;
  channel: string;
  sent: boolean;
}

export interface ServiceItem {
  id: string;
  icon: string;
  ru: string;
  en: string;
  vi: string;
  description: string;
}

export interface AppState {
  version: number;
  pets: Pet[];
  clients: ClientRecord[];
  requests: AppointmentRequest[];
  reminders: Reminder[];
  language: Language;
  activePetId: string;
}
