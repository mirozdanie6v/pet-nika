'use client';

import { useState } from 'react';
import { BookingFlow } from '@/components/BookingFlow';
import { Icon } from '@/components/Icon';
import { PetEditor } from '@/components/PetEditor';
import { useApp } from '@/components/AppProvider';
import { demoImages, getPetPhoto, servicePhotos } from '@/lib/demo-images';
import { services } from '@/lib/demo-data';
import type { Pet } from '@/types';

type Screen='home'|'services'|'booking'|'pet'|'profile';

export function ClientApp(){
 const {state,setActivePet,savePet,addPet}=useApp();
 const [screen,setScreen]=useState<Screen>('home');
 const [editor,setEditor]=useState<Pet|null>(null);
 const active=state.pets.find(p=>p.id===state.activePetId)??state.pets[0];
 const newPet=()=>setEditor({id:`pet-${Date.now()}`,petId:`#N${Math.floor(Math.random()*9000+1000)}`,owner:'Ольга',name:'',species:'Собака',breed:'',birthDate:'',age:'',sex:'',weight:'',color:'',sterilized:false,behavior:'',allergies:'',healthNotes:'',ownerNotes:'',clinicNotes:'',lastVisit:'—',nextReminder:'—'});
 const persist=(pet:Pet)=>state.pets.some(p=>p.id===pet.id)?savePet(pet):addPet(pet);

 return <>
  <div className="role-banner"><div><span className="eyebrow">ПРОФИЛЬ КЛИЕНТА</span><b>То, что видит владелец питомца</b></div></div>
  <div className="client-shell">
   {screen==='home'&&<>
    <section className="client-hero">
      <div className="hero-copy"><small>Добрый день, Ольга</small><h1>Как {active.name} сегодня?</h1><p>Всё важное о питомце — рядом, без лишней суеты.</p></div>
      <button className="pet-chip photo-chip" onClick={()=>setScreen('pet')}>
        <img src={getPetPhoto(active)} alt={active.name}/>
        <span><b>{active.name}</b><small>{active.breed} · {active.age}</small></span>
      </button>
      <div className="hero-actions">
        <button className="btn light" onClick={()=>setScreen('booking')}><Icon name="calendar"/>Записаться</button>
        <button className="btn glass" onClick={()=>setScreen('booking')}>Повторить визит</button>
        <button className="btn glass">Спросить</button>
      </div>
    </section>

    <SectionTitle title="Ближайшая запись"/>
    <div className="card appointment-card">
      <div className="date-box"><b>27</b><small>авг</small></div>
      <div><b>Плановый осмотр · {active.name}</b><p>11:30 · PET NIKA VET CLINIC</p></div>
      <span className="status confirmed">Подтверждено</span>
    </div>

    <SectionTitle title="Быстрые действия"/>
    <div className="action-grid">
      <Action image={demoImages.lucky} icon="stethoscope" title="Услуги" text="Выберите повод визита" onClick={()=>setScreen('services')}/>
      <Action image={getPetPhoto(active)} icon="paw" title="Мой питомец" text="История, документы, заметки" onClick={()=>setScreen('pet')}/>
      <Action image={demoImages.mia} icon="bag" title="Nika Pet Store" text="Реальная точка рядом"/>
      <Action icon="map" title="Как добраться" text="OC3 · Phạm Văn Đồng"/>
    </div>

    <SectionTitle title="Напоминания"/>
    <div className="card reminder"><Icon name="bell"/><div><b>Проверить срок вакцинации</b><p>Система заранее показывает повод вернуться и позволяет записаться в один клик.</p></div><span className="status new">через 24 дня</span></div>
   </>}

   {screen==='services'&&<>
     <PageHead title="Услуги" subtitle="Демо-категории. Актуальный официальный прайс публично не подтверждён."/>
     <div className="service-list">
       {services.map(s=><button className="card service-row photo-service" key={s.id} onClick={()=>setScreen('booking')}>
         <span className="icon-tile"><Icon name={s.icon}/></span>
         <span className="service-photo"><img src={servicePhotos[s.id]} alt="" /></span>
         <span><b>{s[state.language]}</b><small>{s.description}</small></span><span>›</span>
       </button>)}
     </div>
   </>}

   {screen==='booking'&&<><PageHead title="Запись" subtitle="Сценарий без длинной переписки."/><BookingFlow onDone={()=>setScreen('home')}/></>}

   {screen==='pet'&&<>
     <PageHead title="Мой питомец" subtitle="Данные владельца редактируются, данные клиники защищены."/>
     <div className="pet-switcher">
       {state.pets.map(p=><button key={p.id} className={`pet-tab ${p.id===active.id?'active':''}`} onClick={()=>setActivePet(p.id)}>
         <span className="pet-tab-photo"><img src={getPetPhoto(p)} alt={p.name}/></span>
         <span><b>{p.name}</b><small>{p.breed}</small></span>
       </button>)}
       <button className="pet-tab add" onClick={newPet}><Icon name="plus"/>Добавить питомца</button>
     </div>
     <div className="pet-profile">
       <div className="pet-profile-head">
         <div className="pet-avatar pet-avatar-large"><img src={getPetPhoto(active)} alt={active.name}/></div>
         <div><span className="pet-kicker">Любимый питомец</span><h2>{active.name}</h2><p>{active.species} · {active.breed} · {active.age}</p></div>
         <button className="btn ghost" onClick={()=>setEditor(active)}><Icon name="edit"/>Редактировать</button>
       </div>
       <div className="pet-stats"><Stat label="Вес" value={active.weight}/><Stat label="Пол" value={active.sex}/><Stat label="PET ID" value={active.petId}/><Stat label="Напоминание" value={active.nextReminder}/></div>
     </div>
     <div className="split-panels"><div className="card info-panel"><span className="eyebrow">ДАННЫЕ ВЛАДЕЛЬЦА</span><Info label="Поведение" value={active.behavior}/><Info label="Аллергии" value={active.allergies}/><Info label="Заметки" value={active.ownerNotes}/></div><div className="card info-panel protected"><span className="eyebrow">ДАННЫЕ КЛИНИКИ</span><Info label="Последний визит" value={active.lastVisit}/><Info label="Особенности здоровья" value={active.healthNotes}/><Info label="Заметка клиники" value={active.clinicNotes}/></div></div>
   </>}

   {screen==='profile'&&<>
     <PageHead title="Профиль" subtitle="Записи, питомцы и связь с клиникой."/>
     <button className="profile-pet-banner" onClick={()=>setScreen('pet')}>
       <img src={getPetPhoto(active)} alt={active.name}/>
       <span><small>Ваш питомец</small><b>{active.name}</b><em>{active.breed} · {active.age}</em></span><span>›</span>
     </button>
     <div className="profile-list"><ActionRow icon="paw" title="Мои питомцы" text={`${state.pets.length} питомца`} onClick={()=>setScreen('pet')}/><ActionRow icon="calendar" title="Мои записи" text="1 активная · demo"/><ActionRow icon="bell" title="Напоминания" text="вакцинации · повторные визиты"/><ActionRow icon="message" title="Связаться с клиникой" text="реальный канал пока не подключён"/></div>
   </>}
  </div>

  <nav className="client-nav">{([['home','home','Главная'],['services','stethoscope','Услуги'],['booking','plus','Запись'],['pet','paw','Питомец'],['profile','user','Профиль']] as const).map(([id,ic,label])=><button key={id} className={screen===id?'active':''} onClick={()=>setScreen(id)}><Icon name={ic}/><span>{label}</span></button>)}</nav>
  {editor&&<PetEditor pet={editor} onSave={persist} onClose={()=>setEditor(null)}/>} 
 </>;
}

function PageHead({title,subtitle}:{title:string;subtitle:string}){return <div className="page-head"><h1>{title}</h1><p>{subtitle}</p></div>}
function SectionTitle({title}:{title:string}){return <div className="section-title"><h2>{title}</h2></div>}
function Action({image,icon,title,text,onClick}:{image?:string;icon:string;title:string;text:string;onClick?:()=>void}){return <button className={`card action-card ${image?'has-photo':''}`} onClick={onClick}>{image&&<img className="action-photo" src={image} alt=""/>}<span className="icon-tile"><Icon name={icon}/></span><b>{title}</b><small>{text}</small></button>}
function ActionRow({icon,title,text,onClick}:{icon:string;title:string;text:string;onClick?:()=>void}){return <button className="card action-row" onClick={onClick}><span className="icon-tile"><Icon name={icon}/></span><span><b>{title}</b><small>{text}</small></span><span>›</span></button>}
function Stat({label,value}:{label:string;value:string}){return <div className="stat"><small>{label}</small><b>{value||'—'}</b></div>}
function Info({label,value}:{label:string;value:string}){return <div className="info"><small>{label}</small><p>{value||'—'}</p></div>}
