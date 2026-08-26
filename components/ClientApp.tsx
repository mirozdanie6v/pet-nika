'use client';

import { useMemo, useState } from 'react';
import { BookingFlow } from '@/components/BookingFlow';
import { Icon } from '@/components/Icon';
import { PetEditor } from '@/components/PetEditor';
import { useApp } from '@/components/AppProvider';
import { getPetPhoto } from '@/lib/demo-images';
import { CLINIC_HERO } from '@/lib/clinic-hero';
import { localizedPetValue, ui } from '@/lib/i18n';
import { services } from '@/lib/demo-data';
import type { Language, Pet } from '@/types';

type Screen='home'|'services'|'booking'|'pet'|'profile';
const MAP_URL='https://maps.app.goo.gl/EYqkZDvWYvKATLU1A';

const copy:Record<Language,Record<string,string>>={
 ru:{
  heroTitle:'Профессиональная забота о здоровье питомца',heroSub:'Ветеринарная помощь и профилактика в PET NIKA',heroCta:'Записаться',
  hours:'Вт–Сб',hoursDetail:'10:00–16:00',map:'Как нас найти',mapDetail:'Google Maps',bookNow:'Записаться',bookDetail:'Выбрать время',popular:'Популярные услуги',
  consultSub:'Консультация ветеринара',diagnosticSub:'Точное обследование и эффективное лечение',vaccineSub:'Защита здоровья вашего питомца',procedureSub:'Безопасность и идентификация питомца',
  servicesTitle:'Услуги PET NIKA',servicesSub:'Выберите услугу, посмотрите подробности и запишитесь без переписки.',included:'Что включает',recommended:'Когда рекомендуется',preparation:'Перед визитом',serviceBook:'Записаться на эту услугу',
  petHero:'Ваши любимцы в надёжных руках',petHeroSub:'Все важные данные, здоровье и забота о каждом питомце — рядом.',myPets:'Мои питомцы',addPet:'Добавить питомца',mainPet:'Основной',weight:'Вес',age:'Возраст',vaccination:'Вакцинация актуальна',health:'Особенности здоровья',allergies:'Аллергии / препараты',lastVaccine:'Последняя вакцина',chip:'Чип',speciesBreed:'Вид / порода',editDetailed:'Редактировать подробно',
  upcoming:'Ближайшая запись',routine:'Плановый осмотр',generalExam:'Общий осмотр',untilVisit:'До записи 2 дня',reminders:'Напоминания',checkVaccine:'Проверить срок вакцинации',reminderText:'Система напоминает о вакцинации Лаки',in24:'через 24 дня',
  profileHero:'Профиль владельца',profileHeroSub:'Записи, питомцы, история и документы в одном месте.',personal:'Личная информация',contact:'Контакт',language:'Язык интерфейса',pets:'Мои питомцы',visitHistory:'История визитов',upcomingVisits:'Предстоящие записи',documents:'Документы и соглашения',privacy:'Политика конфиденциальности',dataConsent:'Согласие на обработку данных',notifyConsent:'Согласие на уведомления',accepted:'Принято',enabled:'Включено',notifications:'Настройки уведомлений',clinicContact:'Связь с клиникой',channelDemo:'Канал связи будет подключён в рабочей версии',completed:'Завершено',confirmed:'Подтверждено',
 },
 en:{
  heroTitle:'Professional care for your pet’s health',heroSub:'Veterinary care and preventive support at PET NIKA',heroCta:'Book a visit',
  hours:'Tue–Sat',hoursDetail:'10:00–16:00',map:'Find us',mapDetail:'Google Maps',bookNow:'Book',bookDetail:'Choose a time',popular:'Popular services',
  consultSub:'Veterinary consultation',diagnosticSub:'Accurate diagnostics and effective treatment',vaccineSub:'Preventive care and protection',procedureSub:'Safe pet identification',
  servicesTitle:'PET NIKA services',servicesSub:'Choose a service, review the details and book without messaging.',included:'What is included',recommended:'When it is recommended',preparation:'Before the visit',serviceBook:'Book this service',
  petHero:'Your pets are in caring hands',petHeroSub:'Health, care and essential information for every pet in one place.',myPets:'My pets',addPet:'Add pet',mainPet:'Primary',weight:'Weight',age:'Age',vaccination:'Vaccination up to date',health:'Health notes',allergies:'Allergies / medication',lastVaccine:'Last vaccination',chip:'Chip',speciesBreed:'Species / breed',editDetailed:'Edit details',
  upcoming:'Upcoming appointment',routine:'Routine check-up',generalExam:'General examination',untilVisit:'2 days until visit',reminders:'Reminders',checkVaccine:'Check vaccination date',reminderText:'The system reminds you about Lucky’s vaccination',in24:'in 24 days',
  profileHero:'Owner profile',profileHeroSub:'Appointments, pets, history and documents in one place.',personal:'Personal information',contact:'Contact',language:'Interface language',pets:'My pets',visitHistory:'Visit history',upcomingVisits:'Upcoming appointments',documents:'Documents and agreements',privacy:'Privacy policy',dataConsent:'Personal data consent',notifyConsent:'Notification consent',accepted:'Accepted',enabled:'Enabled',notifications:'Notification settings',clinicContact:'Contact clinic',channelDemo:'The real contact channel will be connected in production',completed:'Completed',confirmed:'Confirmed',
 },
 vi:{
  heroTitle:'Chăm sóc chuyên nghiệp cho sức khỏe thú cưng',heroSub:'Khám thú y và chăm sóc phòng ngừa tại PET NIKA',heroCta:'Đặt lịch',
  hours:'T3–T7',hoursDetail:'10:00–16:00',map:'Chỉ đường',mapDetail:'Google Maps',bookNow:'Đặt lịch',bookDetail:'Chọn thời gian',popular:'Dịch vụ phổ biến',
  consultSub:'Tư vấn bác sĩ thú y',diagnosticSub:'Chẩn đoán chính xác và điều trị hiệu quả',vaccineSub:'Phòng bệnh và bảo vệ sức khỏe',procedureSub:'Nhận dạng thú cưng an toàn',
  servicesTitle:'Dịch vụ PET NIKA',servicesSub:'Chọn dịch vụ, xem chi tiết và đặt lịch nhanh.',included:'Bao gồm',recommended:'Khi nào nên sử dụng',preparation:'Trước khi đến khám',serviceBook:'Đặt dịch vụ này',
  petHero:'Thú cưng của bạn luôn được chăm sóc',petHeroSub:'Sức khỏe, chăm sóc và thông tin quan trọng ở cùng một nơi.',myPets:'Thú cưng của tôi',addPet:'Thêm thú cưng',mainPet:'Chính',weight:'Cân nặng',age:'Tuổi',vaccination:'Tiêm phòng còn hiệu lực',health:'Ghi chú sức khỏe',allergies:'Dị ứng / thuốc',lastVaccine:'Lần tiêm gần nhất',chip:'Chip',speciesBreed:'Loài / giống',editDetailed:'Chỉnh sửa chi tiết',
  upcoming:'Lịch hẹn sắp tới',routine:'Khám định kỳ',generalExam:'Khám tổng quát',untilVisit:'Còn 2 ngày',reminders:'Nhắc lịch',checkVaccine:'Kiểm tra lịch tiêm',reminderText:'Hệ thống nhắc lịch tiêm của Lucky',in24:'sau 24 ngày',
  profileHero:'Hồ sơ chủ nuôi',profileHeroSub:'Lịch hẹn, thú cưng, lịch sử và tài liệu ở một nơi.',personal:'Thông tin cá nhân',contact:'Liên hệ',language:'Ngôn ngữ giao diện',pets:'Thú cưng',visitHistory:'Lịch sử khám',upcomingVisits:'Lịch hẹn sắp tới',documents:'Tài liệu và thỏa thuận',privacy:'Chính sách quyền riêng tư',dataConsent:'Đồng ý xử lý dữ liệu',notifyConsent:'Đồng ý nhận thông báo',accepted:'Đã đồng ý',enabled:'Đã bật',notifications:'Cài đặt thông báo',clinicContact:'Liên hệ phòng khám',channelDemo:'Kênh liên hệ thật sẽ được kết nối trong phiên bản chính thức',completed:'Hoàn thành',confirmed:'Đã xác nhận',
 }
};

const detailCopy:Record<Language,Record<string,{included:string;recommended:string;preparation:string}>>={
 ru:{
  consult:{included:'Осмотр, сбор жалоб, оценка общего состояния и рекомендации.',recommended:'При новых симптомах, изменении поведения, аппетита или для первого знакомства с клиникой.',preparation:'Возьмите предыдущие заключения и список препаратов, если они есть.'},
  diagnostic:{included:'Подбор диагностического маршрута, оценка результатов и план дальнейших действий.',recommended:'Когда симптом требует уточнения причины или динамического контроля.',preparation:'Уточните заранее, нужна ли специальная подготовка к конкретному исследованию.'},
  vaccine:{included:'Профилактический осмотр перед вакцинацией и план дальнейшей профилактики.',recommended:'По индивидуальному календарю питомца и перед поездками, если это требуется.',preparation:'Сообщите о самочувствии, препаратах и предыдущих реакциях на вакцинацию.'},
  procedure:{included:'Идентификация питомца и фиксация данных чипа в карточке.',recommended:'Для безопасности, поездок и надёжной идентификации питомца.',preparation:'Специальная подготовка обычно не требуется; детали уточняются в клинике.'}
 },
 en:{
  consult:{included:'Examination, concerns, general assessment and recommendations.',recommended:'For new symptoms, changes in behaviour or appetite, or a first clinic visit.',preparation:'Bring previous reports and a medication list if available.'},
  diagnostic:{included:'A diagnostic plan, review of results and next-step recommendations.',recommended:'When symptoms need clarification or follow-up assessment.',preparation:'Ask whether a specific test requires preparation.'},
  vaccine:{included:'Preventive examination before vaccination and a follow-up prevention plan.',recommended:'According to the pet’s individual schedule and travel needs.',preparation:'Tell the clinic about current health, medication and previous vaccine reactions.'},
  procedure:{included:'Pet identification and chip details recorded in the pet profile.',recommended:'For safety, travel and reliable identification.',preparation:'Usually no special preparation; confirm details with the clinic.'}
 },
 vi:{
  consult:{included:'Khám, ghi nhận triệu chứng, đánh giá tổng quát và tư vấn.',recommended:'Khi có triệu chứng mới, thay đổi hành vi, ăn uống hoặc lần đầu đến phòng khám.',preparation:'Mang theo hồ sơ cũ và danh sách thuốc nếu có.'},
  diagnostic:{included:'Lập kế hoạch chẩn đoán, đánh giá kết quả và bước tiếp theo.',recommended:'Khi cần làm rõ nguyên nhân triệu chứng hoặc theo dõi diễn tiến.',preparation:'Hỏi trước xem xét nghiệm cụ thể có cần chuẩn bị hay không.'},
  vaccine:{included:'Khám phòng ngừa trước tiêm và kế hoạch phòng bệnh tiếp theo.',recommended:'Theo lịch cá nhân của thú cưng và nhu cầu đi lại.',preparation:'Thông báo tình trạng sức khỏe, thuốc và phản ứng tiêm trước đây.'},
  procedure:{included:'Nhận dạng thú cưng và lưu thông tin chip trong hồ sơ.',recommended:'Để tăng an toàn, đi lại và nhận dạng đáng tin cậy.',preparation:'Thường không cần chuẩn bị đặc biệt; xác nhận với phòng khám.'}
 }
};

export function ClientApp(){
 const {state,setActivePet,savePet,addPet}=useApp();
 const c=ui(state.language),t=copy[state.language];
 const [screen,setScreen]=useState<Screen>('home');
 const [editor,setEditor]=useState<Pet|null>(null);
 const [expandedPetId,setExpandedPetId]=useState(state.activePetId);
 const [expandedServiceId,setExpandedServiceId]=useState<string>('consult');
 const [bookingService,setBookingService]=useState('consult');
 const active=state.pets.find(x=>x.id===state.activePetId)??state.pets[0];
 const ownerRecord=state.clients.find(x=>x.petIds.some(id=>state.pets.some(p=>p.id===id&&p.owner===active.owner)));
 const petValue=(value:string)=>localizedPetValue(state.language,value);
 const defaultSpecies=state.language==='ru'?'Собака':state.language==='en'?'Dog':'Chó';
 const newPet=()=>setEditor({id:`pet-${Date.now()}`,petId:`#N${Math.floor(Math.random()*9000+1000)}`,owner:active.owner,name:'',species:defaultSpecies,breed:'',birthDate:'',age:'',sex:'',weight:'',color:'',sterilized:false,behavior:'',allergies:'',healthNotes:'',ownerNotes:'',clinicNotes:'',lastVisit:'—',nextReminder:'—'});
 const persist=(pet:Pet)=>state.pets.some(x=>x.id===pet.id)?savePet(pet):addPet(pet);
 const openService=(id:string)=>{setExpandedServiceId(id);setBookingService(id);setScreen('services')};
 const startBooking=(id=bookingService)=>{setBookingService(id);setScreen('booking')};
 const visitHistory=useMemo(()=>state.pets.map(p=>({pet:p.name,date:p.lastVisit,service:state.language==='vi'?'Khám thú y':state.language==='en'?'Veterinary visit':'Ветеринарный приём'})),[state.pets,state.language]);

 return <>
  <div className="role-banner"><div><span className="eyebrow">{c.clientEyebrow}</span><b>{c.clientHint}</b></div></div>
  <main className="client-shell">
   {screen==='home'&&<>
    <section className="clinic-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(24,22,48,.12) 0%,rgba(24,22,48,.03) 58%),url(${CLINIC_HERO})`}}>
      <div className="clinic-hero-copy"><h1>{t.heroTitle}</h1><p>{t.heroSub}</p><button className="hero-book-btn" onClick={()=>startBooking('consult')}>{t.heroCta}<Icon name="chevronRight"/></button></div>
    </section>
    <div className="clinic-actions">
      <div className="clinic-action action-lavender"><span className="clinic-action-icon"><Icon name="clock"/></span><span><b>{t.hours}</b><small>{t.hoursDetail}</small></span><Icon name="chevronRight"/></div>
      <a className="clinic-action action-mint" href={MAP_URL} target="_blank" rel="noreferrer"><span className="clinic-action-icon"><Icon name="map"/></span><span><b>{t.map}</b><small>{t.mapDetail}</small></span><Icon name="chevronRight"/></a>
      <button className="clinic-action action-peach" onClick={()=>startBooking('consult')}><span className="clinic-action-icon"><Icon name="stethoscope"/></span><span><b>{t.bookNow}</b><small>{t.bookDetail}</small></span><Icon name="chevronRight"/></button>
    </div>
    <SectionTitle title={t.popular}/>
    <div className="popular-service-grid">
      {services.map((service,index)=><PopularService key={service.id} tone={['lavender','peach','mint','blue'][index]} icon={service.icon} title={service[state.language]} text={[t.consultSub,t.diagnosticSub,t.vaccineSub,t.procedureSub][index]} onClick={()=>openService(service.id)}/>) }
    </div>
   </>}

   {screen==='services'&&<>
    <PageHead title={t.servicesTitle} subtitle={t.servicesSub}/>
    <div className="services-accordion">
      {services.map((service,index)=>{
       const open=expandedServiceId===service.id;
       const d=detailCopy[state.language][service.id];
       return <article className={`service-accordion-card service-tone-${index} ${open?'open':''}`} key={service.id}>
        <button className="service-accordion-head" onClick={()=>setExpandedServiceId(open?'':service.id)} aria-expanded={open}>
         <span className="service-big-icon"><Icon name={service.icon}/></span>
         <span><b>{service[state.language]}</b><small>{[t.consultSub,t.diagnosticSub,t.vaccineSub,t.procedureSub][index]}</small></span>
         <span className="service-toggle"><Icon name={open?'chevronUp':'chevronDown'}/></span>
        </button>
        {open&&<div className="service-accordion-body">
         <ServiceDetail icon="check" label={t.included} value={d.included}/>
         <ServiceDetail icon="heart" label={t.recommended} value={d.recommended}/>
         <ServiceDetail icon="document" label={t.preparation} value={d.preparation}/>
         <button className="service-book-btn" onClick={()=>startBooking(service.id)}>{t.serviceBook}<Icon name="chevronRight"/></button>
        </div>}
       </article>
      })}
    </div>
   </>}

   {screen==='booking'&&<><PageHead title={c.booking} subtitle={c.bookingSubtitle}/><BookingFlow key={bookingService} initialServiceId={bookingService} onDone={()=>setScreen('home')}/></>}

   {screen==='pet'&&<>
    <section className="pet-care-hero">
      <div className="pet-care-copy"><span className="pet-heart"><Icon name="heart"/></span><h1>{t.petHero}</h1><p>{t.petHeroSub}</p></div>
      <img src={getPetPhoto(active)} alt={active.name}/>
    </section>
    <div className="pet-section-head"><h2>{t.myPets}</h2><button className="add-pet-btn" onClick={newPet}>{t.addPet}<Icon name="plus"/></button></div>
    <div className="pet-accordion-list">
      {state.pets.map(pet=><PetAccordion key={pet.id} pet={pet} expanded={expandedPetId===pet.id} primary={pet.id===state.activePetId} onToggle={()=>{setActivePet(pet.id);setExpandedPetId(expandedPetId===pet.id?'':pet.id)}} onEdit={()=>setEditor(pet)} language={state.language}/>) }
    </div>
    <div className="pet-support-grid">
      <div><SectionTitle title={t.upcoming}/><button className="pet-support-card support-lavender" onClick={()=>startBooking('consult')}><span className="support-icon calendar-date"><b>27</b><small>{c.august}</small></span><span><b>{t.routine} · {active.name}</b><small>11:30 · {t.generalExam}</small><em>{t.untilVisit}</em></span><Icon name="chevronRight"/></button></div>
      <div><SectionTitle title={t.reminders}/><button className="pet-support-card support-peach" onClick={()=>openService('vaccine')}><span className="support-icon"><Icon name="bell"/></span><span><b>{t.checkVaccine}</b><small>{t.reminderText}</small><em>{t.in24}</em></span><Icon name="chevronRight"/></button></div>
    </div>
   </>}

   {screen==='profile'&&<>
    <section className="profile-hero"><span className="profile-hero-icon"><Icon name="user"/></span><div><span className="eyebrow">PET NIKA</span><h1>{t.profileHero}</h1><p>{t.profileHeroSub}</p></div></section>
    <div className="profile-dashboard-grid">
      <ProfileSection icon="user" title={t.personal}><ProfileInfo label={c.owner} value={active.owner}/><ProfileInfo label={t.contact} value={ownerRecord?.contact??'Demo contact'}/><ProfileInfo label={t.language} value={state.language.toUpperCase()}/></ProfileSection>
      <ProfileSection icon="paw" title={t.pets}>{state.pets.map(p=><button key={p.id} className="profile-pet-row" onClick={()=>{setActivePet(p.id);setScreen('pet')}}><img src={getPetPhoto(p)} alt={p.name}/><span><b>{p.name}</b><small>{p.breed} · {petValue(p.age)}</small></span><Icon name="chevronRight"/></button>)}</ProfileSection>
      <ProfileSection icon="history" title={t.visitHistory}>{visitHistory.map((v,i)=><div className="profile-timeline-row" key={`${v.pet}-${i}`}><span className="timeline-dot"/><span><b>{v.service} · {v.pet}</b><small>{v.date}</small></span><em>{t.completed}</em></div>)}</ProfileSection>
      <ProfileSection icon="calendar" title={t.upcomingVisits}>{state.requests.filter(r=>r.client===active.owner).slice(0,3).map(r=><button key={r.id} className="profile-visit-row" onClick={()=>startBooking(r.serviceId)}><span className="profile-visit-icon"><Icon name="calendar"/></span><span><b>{services.find(s=>s.id===r.serviceId)?.[state.language]??r.serviceId}</b><small>{r.date} · {r.time} · {state.pets.find(p=>p.id===r.petId)?.name??r.petId}</small></span><em>{t.confirmed}</em></button>)}</ProfileSection>
      <ProfileSection icon="document" title={t.documents}><AgreementRow title={t.privacy} status={t.accepted}/><AgreementRow title={t.dataConsent} status={t.accepted}/><AgreementRow title={t.notifyConsent} status={t.enabled}/></ProfileSection>
      <ProfileSection icon="bell" title={t.notifications}><button className="profile-settings-row"><span className="profile-visit-icon"><Icon name="bell"/></span><span><b>{t.notifications}</b><small>{c.reminders}</small></span><span className="toggle-on"/></button></ProfileSection>
      <ProfileSection icon="phone" title={t.clinicContact}><div className="clinic-contact-card"><span className="profile-visit-icon"><Icon name="message"/></span><span><b>{t.clinicContact}</b><small>{t.channelDemo}</small></span></div></ProfileSection>
    </div>
   </>}
  </main>

  <nav className="client-nav">{([['home','home',c.home],['services','stethoscope',c.services],['booking','plus',c.booking],['pet','paw',c.pet],['profile','user',c.profile]] as const).map(([id,ic,label])=><button key={id} className={screen===id?'active':''} onClick={()=>setScreen(id)}><Icon name={ic}/><span>{label}</span></button>)}</nav>
  {editor&&<PetEditor pet={editor} onSave={persist} onClose={()=>setEditor(null)}/>} 
 </>;
}

function PetAccordion({pet,expanded,primary,onToggle,onEdit,language}:{pet:Pet;expanded:boolean;primary:boolean;onToggle:()=>void;onEdit:()=>void;language:Language}){
 const c=ui(language),t=copy[language],v=(value:string)=>localizedPetValue(language,value);
 return <article className={`pet-compact-card ${expanded?'expanded':''}`}>
  <button className="pet-compact-summary" onClick={onToggle} aria-expanded={expanded}>
   <img src={getPetPhoto(pet)} alt={pet.name}/>
   <span className="pet-main"><span className="pet-name-line"><b>{pet.name}</b>{primary&&<em className="primary-pet-chip">{t.mainPet}</em>}</span><small>{pet.breed} · {v(pet.age)}</small><em className="health-line"><Icon name="heart"/>{v(pet.healthNotes)||'—'}</em></span>
   <span className="pet-key"><b>{pet.weight||'—'}</b><small>{t.weight}</small></span>
   <span className="pet-key"><b>{v(pet.age)||'—'}</b><small>{t.age}</small></span>
   <span className="pet-vaccine"><Icon name="shieldPaw"/><b>{t.vaccination}</b></span>
   <span className="pet-chevron"><Icon name={expanded?'chevronUp':'chevronDown'}/></span>
  </button>
  {expanded&&<div className="pet-expanded-panel">
   <EditableDetail icon="paw" label={t.speciesBreed} value={`${v(pet.species)} · ${pet.breed}`} onEdit={onEdit}/>
   <EditableDetail icon="user" label={t.weight} value={pet.weight} onEdit={onEdit}/>
   <EditableDetail icon="calendar" label={t.age} value={v(pet.age)} onEdit={onEdit}/>
   <EditableDetail icon="heartPulse" label={t.health} value={v(pet.healthNotes)} onEdit={onEdit}/>
   <EditableDetail icon="bell" label={t.allergies} value={v(pet.allergies)} onEdit={onEdit}/>
   <EditableDetail icon="syringe" label={t.lastVaccine} value={pet.lastVisit} onEdit={onEdit}/>
   <EditableDetail icon="chip" label={t.chip} value={pet.petId} onEdit={onEdit}/>
   <button className="pet-edit-full" onClick={onEdit}><Icon name="edit"/>{t.editDetailed}</button>
  </div>}
 </article>
}

function PopularService({tone,icon,title,text,onClick}:{tone:string;icon:string;title:string;text:string;onClick:()=>void}){return <button className={`popular-service ${tone}`} onClick={onClick}><span className="popular-icon"><Icon name={icon}/></span><span><b>{title}</b><small>{text}</small></span><span className="popular-arrow"><Icon name="chevronRight"/></span></button>}
function EditableDetail({icon,label,value,onEdit}:{icon:string;label:string;value:string;onEdit:()=>void}){return <div className="editable-detail"><span className="detail-icon"><Icon name={icon}/></span><small>{label}</small><b>{value||'—'}</b><button onClick={onEdit} aria-label={label}><Icon name="edit"/></button></div>}
function ServiceDetail({icon,label,value}:{icon:string;label:string;value:string}){return <div className="service-detail"><span><Icon name={icon}/></span><div><b>{label}</b><p>{value}</p></div></div>}
function PageHead({title,subtitle}:{title:string;subtitle:string}){return <div className="page-head approved-page-head"><h1>{title}</h1><p>{subtitle}</p></div>}
function SectionTitle({title}:{title:string}){return <div className="section-title approved-section-title"><h2>{title}</h2></div>}
function ProfileSection({icon,title,children}:{icon:string;title:string;children:React.ReactNode}){return <section className="profile-section"><div className="profile-section-head"><span><Icon name={icon}/></span><h2>{title}</h2></div><div className="profile-section-body">{children}</div></section>}
function ProfileInfo({label,value}:{label:string;value:string}){return <div className="profile-info-row"><small>{label}</small><b>{value}</b></div>}
function AgreementRow({title,status}:{title:string;status:string}){return <div className="agreement-row"><span className="agreement-icon"><Icon name="check"/></span><b>{title}</b><em>{status}</em></div>}
