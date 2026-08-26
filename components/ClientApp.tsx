'use client';

import { useState } from 'react';
import { BookingFlow } from '@/components/BookingFlow';
import { Icon } from '@/components/Icon';
import { PetEditor } from '@/components/PetEditor';
import { useApp } from '@/components/AppProvider';
import { getPetPhoto, servicePhotos } from '@/lib/demo-images';
import { CLINIC_HERO } from '@/lib/clinic-hero';
import { localizedPetValue, ui } from '@/lib/i18n';
import { services } from '@/lib/demo-data';
import type { Language, Pet } from '@/types';

type Screen='home'|'services'|'booking'|'pet'|'profile';
const MAP_URL='https://maps.app.goo.gl/EYqkZDvWYvKATLU1A';

const pageCopy:Record<Language,Record<string,string>>={
 ru:{heroTitle:'Запишитесь на приём в PET NIKA',heroSub:'Спокойная и внимательная ветеринарная помощь в Нячанге',hours:'Вт–Сб',hoursDetail:'10:00–16:00',map:'Как нас найти',mapDetail:'Google Maps',bookNow:'Записаться',bookDetail:'Выбрать услугу',popular:'Популярные услуги',primary:'Первичный осмотр',primarySub:'Осмотр и консультация ветеринара',diagnostic:'Диагностика и лечение',diagnosticSub:'Обследование и план лечения',preventive:'Профилактический осмотр, вакцинация',preventiveSub:'Профилактика и плановая вакцинация',microchip:'Чипирование',microchipSub:'Идентификация питомца',petHero:'Ваши любимцы в надёжных руках',petHeroSub:'Всё важное о здоровье и заботе — в одном месте',myPets:'Мои питомцы',important:'Важное',health:'Особенности здоровья',allergies:'Аллергии',behavior:'Поведение',lastVisit:'Последний визит',nextReminder:'Следующее напоминание',details:'Все данные',collapse:'Свернуть',add:'Добавить питомца'},
 en:{heroTitle:'Book a visit at PET NIKA',heroSub:'Calm, attentive veterinary care in Nha Trang',hours:'Tue–Sat',hoursDetail:'10:00–16:00',map:'Find us',mapDetail:'Google Maps',bookNow:'Book',bookDetail:'Choose a service',popular:'Popular services',primary:'Initial examination',primarySub:'Veterinary examination and consultation',diagnostic:'Diagnostics and treatment',diagnosticSub:'Assessment and treatment plan',preventive:'Preventive check-up, vaccination',preventiveSub:'Prevention and scheduled vaccination',microchip:'Microchipping',microchipSub:'Pet identification',petHero:'Your pets are in caring hands',petHeroSub:'Health and care essentials in one place',myPets:'My pets',important:'Important',health:'Health notes',allergies:'Allergies',behavior:'Behavior',lastVisit:'Last visit',nextReminder:'Next reminder',details:'All details',collapse:'Collapse',add:'Add pet'},
 vi:{heroTitle:'Đặt lịch tại PET NIKA',heroSub:'Chăm sóc thú y nhẹ nhàng và tận tâm tại Nha Trang',hours:'T3–T7',hoursDetail:'10:00–16:00',map:'Chỉ đường',mapDetail:'Google Maps',bookNow:'Đặt lịch',bookDetail:'Chọn dịch vụ',popular:'Dịch vụ phổ biến',primary:'Khám ban đầu',primarySub:'Khám và tư vấn bác sĩ thú y',diagnostic:'Chẩn đoán và điều trị',diagnosticSub:'Kiểm tra và kế hoạch điều trị',preventive:'Khám định kỳ, tiêm phòng',preventiveSub:'Phòng bệnh và tiêm phòng định kỳ',microchip:'Gắn microchip',microchipSub:'Nhận dạng thú cưng',petHero:'Thú cưng của bạn luôn được chăm sóc',petHeroSub:'Thông tin sức khỏe và chăm sóc trong một nơi',myPets:'Thú cưng của tôi',important:'Quan trọng',health:'Ghi chú sức khỏe',allergies:'Dị ứng',behavior:'Hành vi',lastVisit:'Lần khám gần nhất',nextReminder:'Nhắc lịch tiếp theo',details:'Tất cả dữ liệu',collapse:'Thu gọn',add:'Thêm thú cưng'}
};

const serviceDescription: Record<Language,Record<string,string>> = {
 ru:{consult:'Осмотр, жалобы и дальнейший план',vaccine:'Плановая вакцинация и напоминание',diagnostic:'Результаты и рекомендации в карточке',procedure:'Повторный визит без лишних данных'},
 en:{consult:'Check-up, concerns and the next care plan',vaccine:'Planned vaccination with a reminder',diagnostic:'Results and recommendations in one place',procedure:'An easy repeat visit without re-entering data'},
 vi:{consult:'Khám, triệu chứng và kế hoạch chăm sóc tiếp theo',vaccine:'Tiêm phòng định kỳ kèm nhắc lịch',diagnostic:'Kết quả và khuyến nghị trong một hồ sơ',procedure:'Tái khám nhanh không cần nhập lại thông tin'}
};

export function ClientApp(){
 const {state,setActivePet,savePet,addPet}=useApp();
 const c=ui(state.language),p=pageCopy[state.language];
 const [screen,setScreen]=useState<Screen>('home');
 const [editor,setEditor]=useState<Pet|null>(null);
 const [expandedPetId,setExpandedPetId]=useState(state.activePetId);
 const [bookingService,setBookingService]=useState('consult');
 const active=state.pets.find(x=>x.id===state.activePetId)??state.pets[0];
 const defaultSpecies=state.language==='ru'?'Собака':state.language==='en'?'Dog':'Chó';
 const newPet=()=>setEditor({id:`pet-${Date.now()}`,petId:`#N${Math.floor(Math.random()*9000+1000)}`,owner:'Ольга',name:'',species:defaultSpecies,breed:'',birthDate:'',age:'',sex:'',weight:'',color:'',sterilized:false,behavior:'',allergies:'',healthNotes:'',ownerNotes:'',clinicNotes:'',lastVisit:'—',nextReminder:'—'});
 const persist=(pet:Pet)=>state.pets.some(x=>x.id===pet.id)?savePet(pet):addPet(pet);
 const petValue=(value:string)=>localizedPetValue(state.language,value);
 const startBooking=(id:string)=>{setBookingService(id);setScreen('booking')};

 return <>
  <div className="role-banner"><div><span className="eyebrow">{c.clientEyebrow}</span><b>{c.clientHint}</b></div></div>
  <div className="client-shell">
   {screen==='home'&&<>
    <section className="clinic-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(24,24,40,.66) 0%,rgba(24,24,40,.20) 55%,rgba(24,24,40,.05) 100%),url(${CLINIC_HERO})`}}>
      <div className="clinic-hero-copy"><h1>{p.heroTitle}</h1><p>{p.heroSub}</p></div>
    </section>
    <div className="clinic-actions">
      <div className="clinic-action gradient-lavender"><span className="icon-tile"><Icon name="calendar"/></span><span><b>{p.hours}</b><small>{p.hoursDetail}</small></span></div>
      <a className="clinic-action gradient-mint" href={MAP_URL} target="_blank" rel="noreferrer"><span className="icon-tile"><Icon name="map"/></span><span><b>{p.map}</b><small>{p.mapDetail}</small></span><span>›</span></a>
      <button className="clinic-action gradient-peach" onClick={()=>setScreen('services')}><span className="icon-tile"><Icon name="stethoscope"/></span><span><b>{p.bookNow}</b><small>{p.bookDetail}</small></span><span>›</span></button>
    </div>

    <SectionTitle title={p.popular}/>
    <div className="popular-service-grid">
      <PopularService tone="lavender" icon="stethoscope" title={p.primary} text={p.primarySub} onClick={()=>startBooking('consult')}/>
      <PopularService tone="peach" icon="flask" title={p.diagnostic} text={p.diagnosticSub} onClick={()=>startBooking('diagnostic')}/>
      <PopularService tone="mint" icon="syringe" title={p.preventive} text={p.preventiveSub} onClick={()=>startBooking('vaccine')}/>
      <PopularService tone="blue" icon="paw" title={p.microchip} text={p.microchipSub} onClick={()=>startBooking('procedure')}/>
    </div>
   </>}

   {screen==='services'&&<>
     <PageHead title={c.services} subtitle={c.servicesSubtitle}/>
     <div className="service-list">
       {services.map((s,index)=><button className={`card service-row photo-service service-tone-${index%4} paw-card`} key={s.id} onClick={()=>startBooking(s.id)}>
         <span className="icon-tile"><Icon name={s.icon}/></span>
         <span className="service-photo"><img src={servicePhotos[s.id]} alt="" /></span>
         <span><b>{s[state.language]}</b><small>{serviceDescription[state.language][s.id]}</small></span><span>›</span>
       </button>)}
     </div>
   </>}

   {screen==='booking'&&<><PageHead title={c.booking} subtitle={c.bookingSubtitle}/><BookingFlow key={bookingService} initialServiceId={bookingService} onDone={()=>setScreen('home')}/></>}

   {screen==='pet'&&<>
     <section className="pet-care-hero paw-surface">
       <div><small>{c.hello}</small><h1>{c.howToday(active.name)}</h1><p>{p.petHeroSub}</p></div>
       <img src={getPetPhoto(active)} alt={active.name}/>
     </section>
     <div className="pet-section-head"><div><span className="eyebrow">{p.petHero}</span><h2>{p.myPets}</h2></div><button className="btn premium-cta" onClick={newPet}><Icon name="plus"/>{p.add}</button></div>
     <div className="pet-accordion-list">
       {state.pets.map(pet=><PetAccordion key={pet.id} pet={pet} expanded={expandedPetId===pet.id} onToggle={()=>{setActivePet(pet.id);setExpandedPetId(expandedPetId===pet.id?'':pet.id)}} onEdit={()=>setEditor(pet)} language={state.language}/>) }
     </div>
     <div className="pet-support-grid">
       <div><SectionTitle title={c.upcoming}/><div className="card appointment-card gradient-lavender paw-card"><div className="date-box"><b>27</b><small>{c.august}</small></div><div><b>{c.routine} · {active.name}</b><p>11:30 · PET NIKA VET CLINIC</p></div><span className="status confirmed">{c.confirmed}</span></div></div>
       <div><SectionTitle title={c.reminders}/><div className="card reminder gradient-peach paw-card"><Icon name="bell"/><div><b>{c.vaccinationCheck}</b><p>{c.reminderText}</p></div><span className="status new">{c.in24}</span></div></div>
     </div>
   </>}

   {screen==='profile'&&<>
     <PageHead title={c.profile} subtitle={c.profileSubtitle}/>
     <button className="profile-pet-banner paw-card" onClick={()=>setScreen('pet')}><img src={getPetPhoto(active)} alt={active.name}/><span><small>{c.yourPet}</small><b>{active.name}</b><em>{active.breed} · {petValue(active.age)}</em></span><span>›</span></button>
     <div className="profile-list"><ActionRow icon="paw" title={c.myPets} text={`${state.pets.length}`} onClick={()=>setScreen('pet')}/><ActionRow icon="calendar" title={c.myAppointments} text={c.activeDemo}/><ActionRow icon="bell" title={c.reminders} text={c.repeatVisits}/><ActionRow icon="message" title={c.contactClinic} text={c.channelPending}/></div>
   </>}
  </div>

  <nav className="client-nav">{([['home','home',c.home],['services','stethoscope',c.services],['booking','plus',c.booking],['pet','paw',c.pet],['profile','user',c.profile]] as const).map(([id,ic,label])=><button key={id} className={screen===id?'active':''} onClick={()=>setScreen(id)}><Icon name={ic}/><span>{label}</span></button>)}</nav>
  {editor&&<PetEditor pet={editor} onSave={persist} onClose={()=>setEditor(null)}/>} 
 </>;
}

function PetAccordion({pet,expanded,onToggle,onEdit,language}:{pet:Pet;expanded:boolean;onToggle:()=>void;onEdit:()=>void;language:Language}){
 const c=ui(language),p=pageCopy[language],v=(value:string)=>localizedPetValue(language,value);
 return <article className={`pet-compact-card ${expanded?'expanded':''}`}>
   <button className="pet-compact-summary" onClick={onToggle} aria-expanded={expanded}>
     <img src={getPetPhoto(pet)} alt={pet.name}/><span className="pet-main"><b>{pet.name}</b><small>{v(pet.species)} · {pet.breed} · {v(pet.age)}</small><em>{p.health}: {v(pet.healthNotes)||'—'}</em></span>
     <span className="pet-key"><b>{pet.weight||'—'}</b><small>{c.weight}</small></span><span className="pet-key pet-reminder"><b>{pet.nextReminder||'—'}</b><small>{p.nextReminder}</small></span><span className="pet-chevron">{expanded?'⌃':'⌄'}</span>
   </button>
   {expanded&&<div className="pet-expanded-panel">
     <div className="pet-detail-grid"><Detail label={c.weight} value={pet.weight}/><Detail label={c.sex} value={v(pet.sex)}/><Detail label={c.breed} value={pet.breed}/><Detail label="PET ID" value={pet.petId}/><Detail label={p.health} value={v(pet.healthNotes)}/><Detail label={p.allergies} value={v(pet.allergies)}/><Detail label={p.behavior} value={v(pet.behavior)}/><Detail label={p.lastVisit} value={pet.lastVisit}/></div>
     <button className="btn premium-cta pet-edit-btn" onClick={onEdit}><Icon name="edit"/>{c.edit}</button>
   </div>}
 </article>
}

function PopularService({tone,icon,title,text,onClick}:{tone:string;icon:string;title:string;text:string;onClick:()=>void}){return <button className={`popular-service ${tone} paw-card`} onClick={onClick}><span className="popular-icon"><Icon name={icon}/></span><span><b>{title}</b><small>{text}</small></span><span className="popular-arrow">›</span></button>}
function Detail({label,value}:{label:string;value:string}){return <div className="pet-detail"><small>{label}</small><b>{value||'—'}</b></div>}
function PageHead({title,subtitle}:{title:string;subtitle:string}){return <div className="page-head"><h1>{title}</h1><p>{subtitle}</p></div>}
function SectionTitle({title}:{title:string}){return <div className="section-title"><h2>{title}</h2></div>}
function ActionRow({icon,title,text,onClick}:{icon:string;title:string;text:string;onClick?:()=>void}){return <button className="card action-row" onClick={onClick}><span className="icon-tile"><Icon name={icon}/></span><span><b>{title}</b><small>{text}</small></span><span>›</span></button>}
