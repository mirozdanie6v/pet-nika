'use client';

import { useState } from 'react';
import { BookingFlow } from '@/components/BookingFlow';
import { Icon } from '@/components/Icon';
import { PetEditor } from '@/components/PetEditor';
import { useApp } from '@/components/AppProvider';
import { demoImages, getPetPhoto, servicePhotos } from '@/lib/demo-images';
import { ui } from '@/lib/i18n';
import { localizedPetDisplay } from '@/lib/pet-display';
import { services } from '@/lib/demo-data';
import type { Language, Pet } from '@/types';

type Screen='home'|'services'|'booking'|'pet'|'profile';

const serviceDescription: Record<Language,Record<string,string>> = {
 ru:{consult:'Осмотр, жалобы и дальнейший план',vaccine:'Плановая вакцинация и напоминание',diagnostic:'Результаты и рекомендации в карточке',procedure:'Повторный визит без лишних данных'},
 en:{consult:'Check-up, concerns and the next care plan',vaccine:'Planned vaccination with a reminder',diagnostic:'Results and recommendations in one place',procedure:'An easy repeat visit without re-entering data'},
 vi:{consult:'Khám, triệu chứng và kế hoạch chăm sóc tiếp theo',vaccine:'Tiêm phòng định kỳ kèm nhắc lịch',diagnostic:'Kết quả và khuyến nghị trong một hồ sơ',procedure:'Tái khám nhanh không cần nhập lại thông tin'}
};

export function ClientApp(){
 const {state,setActivePet,savePet,addPet}=useApp();
 const c=ui(state.language);
 const [screen,setScreen]=useState<Screen>('home');
 const [editor,setEditor]=useState<Pet|null>(null);
 const active=state.pets.find(p=>p.id===state.activePetId)??state.pets[0];
 const defaultSpecies=state.language==='ru'?'Собака':state.language==='en'?'Dog':'Chó';
 const newPet=()=>setEditor({id:`pet-${Date.now()}`,petId:`#N${Math.floor(Math.random()*9000+1000)}`,owner:'Ольга',name:'',species:defaultSpecies,breed:'',birthDate:'',age:'',sex:'',weight:'',color:'',sterilized:false,behavior:'',allergies:'',healthNotes:'',ownerNotes:'',clinicNotes:'',lastVisit:'—',nextReminder:'—'});
 const persist=(pet:Pet)=>state.pets.some(p=>p.id===pet.id)?savePet(pet):addPet(pet);
 const petValue=(value:string)=>localizedPetDisplay(state.language,value);

 return <>
  <div className="role-banner"><div><span className="eyebrow">{c.clientEyebrow}</span><b>{c.clientHint}</b></div></div>
  <div className="client-shell">
   {screen==='home'&&<>
    <section className="client-hero premium-hero paw-surface">
      <div className="hero-copy"><small>{c.hello}</small><h1>{c.howToday(petValue(active.name))}</h1><p>{c.heroText}</p></div>
      <button className="pet-chip photo-chip" onClick={()=>setScreen('pet')}>
        <img src={getPetPhoto(active)} alt={petValue(active.name)}/>
        <span><b>{petValue(active.name)}</b><small>{petValue(active.breed)} · {petValue(active.age)}</small></span>
      </button>
      <div className="hero-floating"><span className="floating-pill lavender-pill">27 {c.august} · 11:30</span><span className="floating-pill peach-pill">{c.in24}</span></div>
      <div className="hero-actions">
        <button className="btn premium-cta" onClick={()=>setScreen('booking')}><Icon name="calendar"/>{c.book}</button>
        <button className="btn glass" onClick={()=>setScreen('booking')}>{c.repeat}</button>
        <button className="btn glass">{c.ask}</button>
      </div>
    </section>

    <SectionTitle title={c.upcoming}/>
    <div className="card appointment-card gradient-peach paw-card">
      <div className="date-box"><b>27</b><small>{c.august}</small></div>
      <div><b>{c.routine} · {petValue(active.name)}</b><p>11:30 · PET NIKA VET CLINIC</p></div>
      <span className="status confirmed">{c.confirmed}</span>
    </div>

    <SectionTitle title={c.quick}/>
    <div className="action-grid">
      <Action variant="lavender" image={demoImages.lucky} icon="stethoscope" title={c.services} text={c.servicesText} onClick={()=>setScreen('services')}/>
      <Action variant="blue" image={getPetPhoto(active)} icon="paw" title={c.myPet} text={c.myPetText} onClick={()=>setScreen('pet')}/>
      <Action variant="peach" image={demoImages.mia} icon="bag" title="Nika Pet Store" text={c.storeText}/>
      <Action variant="mint" icon="map" title={c.route} text="OC3 · Phạm Văn Đồng"/>
    </div>

    <SectionTitle title={c.reminders}/>
    <div className="card reminder gradient-lilac paw-card"><Icon name="bell"/><div><b>{c.vaccinationCheck}</b><p>{c.reminderText}</p></div><span className="status new">{c.in24}</span></div>
   </>}

   {screen==='services'&&<>
     <PageHead title={c.services} subtitle={c.servicesSubtitle}/>
     <div className="service-list">
       {services.map((s,index)=><button className={`card service-row photo-service service-tone-${index%4} paw-card`} key={s.id} onClick={()=>setScreen('booking')}>
         <span className="icon-tile"><Icon name={s.icon}/></span>
         <span className="service-photo"><img src={servicePhotos[s.id]} alt="" /></span>
         <span><b>{s[state.language]}</b><small>{serviceDescription[state.language][s.id]}</small></span><span>›</span>
       </button>)}
     </div>
   </>}

   {screen==='booking'&&<><PageHead title={c.booking} subtitle={c.bookingSubtitle}/><BookingFlow onDone={()=>setScreen('home')}/></>}

   {screen==='pet'&&<>
     <PageHead title={c.petTitle} subtitle={c.petSubtitle}/>
     <div className="pet-switcher">
       {state.pets.map(p=><button key={p.id} className={`pet-tab ${p.id===active.id?'active':''}`} onClick={()=>setActivePet(p.id)}>
         <span className="pet-tab-photo"><img src={getPetPhoto(p)} alt={petValue(p.name)}/></span>
         <span><b>{petValue(p.name)}</b><small>{petValue(p.breed)}</small></span>
       </button>)}
       <button className="pet-tab add" onClick={newPet}><Icon name="plus"/>{c.addPet}</button>
     </div>
     <div className="pet-profile premium-pet-profile paw-surface">
       <div className="pet-profile-head">
         <div className="pet-avatar pet-avatar-large"><img src={getPetPhoto(active)} alt={petValue(active.name)}/></div>
         <div><span className="pet-kicker">{c.favourite}</span><h2>{petValue(active.name)}</h2><p>{petValue(active.species)} · {petValue(active.breed)} · {petValue(active.age)}</p></div>
         <button className="btn ghost" onClick={()=>setEditor(active)}><Icon name="edit"/>{c.edit}</button>
       </div>
       <div className="pet-stats"><Stat label={c.weight} value={active.weight}/><Stat label={c.sex} value={petValue(active.sex)}/><Stat label="PET ID" value={active.petId}/><Stat label={c.reminder} value={active.nextReminder}/></div>
     </div>
     <div className="split-panels"><div className="card info-panel gradient-mint"><span className="eyebrow">{c.ownerData}</span><Info label={c.behavior} value={petValue(active.behavior)}/><Info label={c.allergies} value={petValue(active.allergies)}/><Info label={c.notes} value={petValue(active.ownerNotes)}/></div><div className="card info-panel protected gradient-lavender"><span className="eyebrow">{c.clinicData}</span><Info label={c.lastVisit} value={active.lastVisit}/><Info label={c.health} value={petValue(active.healthNotes)}/><Info label={c.clinicNote} value={petValue(active.clinicNotes)}/></div></div>
   </>}

   {screen==='profile'&&<>
     <PageHead title={c.profile} subtitle={c.profileSubtitle}/>
     <button className="profile-pet-banner paw-card" onClick={()=>setScreen('pet')}>
       <img src={getPetPhoto(active)} alt={petValue(active.name)}/>
       <span><small>{c.yourPet}</small><b>{petValue(active.name)}</b><em>{petValue(active.breed)} · {petValue(active.age)}</em></span><span>›</span>
     </button>
     <div className="profile-list"><ActionRow icon="paw" title={c.myPets} text={`${state.pets.length}`} onClick={()=>setScreen('pet')}/><ActionRow icon="calendar" title={c.myAppointments} text={c.activeDemo}/><ActionRow icon="bell" title={c.reminders} text={c.repeatVisits}/><ActionRow icon="message" title={c.contactClinic} text={c.channelPending}/></div>
   </>}
  </div>

  <nav className="client-nav">{([['home','home',c.home],['services','stethoscope',c.services],['booking','plus',c.booking],['pet','paw',c.pet],['profile','user',c.profile]] as const).map(([id,ic,label])=><button key={id} className={screen===id?'active':''} onClick={()=>setScreen(id)}><Icon name={ic}/><span>{label}</span></button>)}</nav>
  {editor&&<PetEditor pet={editor} onSave={persist} onClose={()=>setEditor(null)}/>} 
 </>;
}

function PageHead({title,subtitle}:{title:string;subtitle:string}){return <div className="page-head"><h1>{title}</h1><p>{subtitle}</p></div>}
function SectionTitle({title}:{title:string}){return <div className="section-title"><h2>{title}</h2></div>}
function Action({variant,image,icon,title,text,onClick}:{variant:'lavender'|'blue'|'peach'|'mint';image?:string;icon:string;title:string;text:string;onClick?:()=>void}){return <button className={`card action-card premium-action ${variant} ${image?'has-photo':''} paw-card`} onClick={onClick}>{image&&<img className="action-photo" src={image} alt=""/>}<span className="icon-tile"><Icon name={icon}/></span><b>{title}</b><small>{text}</small></button>}
function ActionRow({icon,title,text,onClick}:{icon:string;title:string;text:string;onClick?:()=>void}){return <button className="card action-row" onClick={onClick}><span className="icon-tile"><Icon name={icon}/></span><span><b>{title}</b><small>{text}</small></span><span>›</span></button>}
function Stat({label,value}:{label:string;value:string}){return <div className="stat"><small>{label}</small><b>{value||'—'}</b></div>}
function Info({label,value}:{label:string;value:string}){return <div className="info"><small>{label}</small><p>{value||'—'}</p></div>}
