'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { PetEditor } from '@/components/PetEditor';
import { useApp } from '@/components/AppProvider';
import { getPetPhoto } from '@/lib/demo-images';
import { services } from '@/lib/demo-data';
import { statusLabel, ui } from '@/lib/i18n';
import type { Pet, RequestStatus } from '@/types';

type Section='overview'|'requests'|'schedule'|'clients'|'pets'|'reminders'|'broadcasts'|'analytics';
const navBase:[Section,string][]=[['overview','layout'],['requests','message'],['schedule','calendar'],['clients','users'],['pets','paw'],['reminders','bell'],['broadcasts','send'],['analytics','chart']];
const statuses:RequestStatus[]=['Новая','В обработке','Подтверждена','Завершена','Отменена'];

export function AdminApp(){
 const {state,savePet,setRequestStatus,sendReminder,resetDemo}=useApp();
 const c=ui(state.language);
 const [section,setSection]=useState<Section>('overview');
 const [query,setQuery]=useState('');
 const [editor,setEditor]=useState<Pet|null>(null);
 const filtered=useMemo(()=>state.requests.filter(r=>(r.client+' '+r.petId).toLowerCase().includes(query.toLowerCase())),[state.requests,query]);
 const reset=()=>{if(window.confirm(state.language==='ru'?'Сбросить все demo-изменения?':state.language==='en'?'Reset all demo changes?':'Đặt lại tất cả thay đổi demo?'))resetDemo()};
 const petById=(id:string)=>state.pets.find(p=>p.id===id);
 const serviceName=(id:string)=>services.find(s=>s.id===id)?.[state.language]??id;
 const navLabel=(id:Section)=>({overview:c.overview,requests:c.requests,schedule:c.schedule,clients:c.clients,pets:c.petsAdmin,reminders:c.reminders,broadcasts:c.broadcasts,analytics:c.analytics}[id]);
 const clientStatus=(value:string)=>state.language==='ru'?value:state.language==='en'?({'Новый':'New','Активный':'Active','Повторный':'Repeat'}[value]??value):({'Новый':'Mới','Активный':'Đang hoạt động','Повторный':'Quay lại'}[value]??value);
 const reason=(value:string)=>{
   if(state.language==='ru') return value;
   const en:Record<string,string>={'Проверить вакцинацию':'Check vaccination','Повторная процедура':'Repeat procedure','Контроль после визита':'Post-visit follow-up'};
   const vi:Record<string,string>={'Проверить вакцинацию':'Kiểm tra tiêm phòng','Повторная процедура':'Thủ thuật lặp lại','Контроль после визита':'Theo dõi sau khám'};
   return (state.language==='en'?en:vi)[value]??value;
 };

 return <>
  <div className="role-banner admin-role"><div><span className="eyebrow">{c.adminEyebrow}</span><b>{c.adminHint}</b></div><button className="btn ghost" onClick={reset}>{c.reset}</button></div>
  <div className="admin-layout"><aside className="admin-sidebar">{navBase.map(([id,ic])=><button key={id} className={section===id?'active':''} onClick={()=>setSection(id)}><Icon name={ic}/><span>{navLabel(id)}</span></button>)}</aside><main className="admin-main">
   <div className="mobile-admin-nav">{navBase.map(([id])=><button key={id} className={section===id?'active':''} onClick={()=>setSection(id)}>{navLabel(id)}</button>)}</div>
   {section==='overview'&&<><AdminHead title={c.overview} subtitle={c.overviewSub}/><div className="kpi-grid"><Kpi label={c.newRequests} value={String(state.requests.filter(r=>r.status==='Новая').length)} icon="message" tone="lavender"/><Kpi label={c.confirmedCount} value={String(state.requests.filter(r=>r.status==='Подтверждена').length)} icon="calendar" tone="blue"/><Kpi label={c.petsDb} value={String(state.pets.length)} icon="paw" tone="peach"/><Kpi label={c.reminderCount} value={String(state.reminders.filter(r=>!r.sent).length)} icon="bell" tone="mint"/></div><div className="admin-grid"><div className="card panel premium-panel"><h3>{c.upcomingVisits}</h3>{state.requests.slice(0,4).map(r=>{const pet=petById(r.petId);return <div className="mini-row visit-row" key={r.id}><div className="visit-pet">{pet?<img src={getPetPhoto(pet)} alt={pet.name}/>:<Icon name="paw"/>}</div><div><b>{r.time} · {r.client}</b><small>{pet?.name??r.petId} · {r.date}</small></div><span className={`status ${statusClass(r.status)}`}>{statusLabel(state.language,r.status)}</span></div>})}</div><div className="card panel premium-panel chart-panel"><h3>{c.dynamics}</h3><div className="bars">{[42,68,55,31,61,80,72].map((h,i)=><span key={i} style={{height:`${h}%`}}/>)}</div><small>{c.demoChart}</small></div></div></>}
   {section==='requests'&&<><AdminHead title={c.requests} subtitle={c.requestsSub}/><div className="toolbar"><label className="search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={c.searchPlaceholder}/></label></div><div className="table-card"><div className="table-row head"><span>{c.client}</span><span>{c.sourceService}</span><span>{c.date}</span><span>{c.status}</span></div>{filtered.map(r=>{const pet=petById(r.petId);return <div className="table-row" key={r.id}><span className="request-person">{pet&&<img src={getPetPhoto(pet)} alt={pet.name}/>}<span><b>{r.client}</b><small>{pet?.name??r.petId}</small></span></span><span>{serviceName(r.serviceId)}</span><span>{r.date}<small>{r.time}</small></span><select value={r.status} onChange={e=>setRequestStatus(r.id,e.target.value as RequestStatus)}>{statuses.map(s=><option value={s} key={s}>{statusLabel(state.language,s)}</option>)}</select></div>})}</div></>}
   {section==='schedule'&&<><AdminHead title={c.schedule} subtitle={c.scheduleSub}/><div className="card timeline premium-panel">{['10:30','11:30','13:00','14:30','15:30'].map((t,i)=>{const r=state.requests[i%state.requests.length];const p=r?petById(r.petId):undefined;return <div className="time-row" key={t}><b>{t}</b><div className={i===3?'free-slot':'appointment-slot'}>{i===3?c.freeTime:<span className="request-person">{p&&<img src={getPetPhoto(p)} alt={p.name}/>}<span>{r?.client} · {p?.name??r?.petId}</span></span>}</div></div>})}</div></>}
   {section==='clients'&&<><AdminHead title={c.clients} subtitle={c.clientsSub}/><div className="entity-grid">{state.clients.map(cn=>{const pet=state.pets.find(p=>cn.petIds.includes(p.id));return <div className="card entity premium-entity" key={cn.id}><div className="entity-avatar">{pet?<img src={getPetPhoto(pet)} alt={pet.name}/>:cn.name[0]}</div><h3>{cn.name}</h3><p>{cn.contact}</p><div className="entity-meta"><span>{c.visits} <b>{cn.visits}</b></span><span>{c.nextVisit} <b>{cn.nextVisit}</b></span></div><span className="status confirmed">{clientStatus(cn.status)}</span></div>})}</div></>}
   {section==='pets'&&<><AdminHead title={c.petsAdmin} subtitle={c.petsSub}/><div className="entity-grid">{state.pets.map(p=><button className="card entity pet-entity premium-entity paw-card" key={p.id} onClick={()=>setEditor(p)}><div className="entity-avatar pet-photo-admin"><img src={getPetPhoto(p)} alt={p.name}/></div><h3>{p.name}</h3><p>{p.owner} · {p.breed}</p><div className="entity-meta"><span>{c.weight} <b>{p.weight}</b></span><span>PET ID <b>{p.petId}</b></span></div><span className="edit-link"><Icon name="edit"/>{c.edit}</span></button>)}</div></>}
   {section==='reminders'&&<><AdminHead title={c.reminders} subtitle={c.remindersSub}/><div className="table-card">{state.reminders.map(r=>{const pet=petById(r.petId);return <div className="reminder-row" key={r.id}><div className="request-person">{pet&&<img src={getPetPhoto(pet)} alt={pet.name}/>}<span><b>{r.client} · {pet?.name??r.petId}</b><small>{reason(r.reason)} · {r.date} · {r.channel}</small></span></div><button className={`btn ${r.sent?'ghost':'primary'}`} disabled={r.sent} onClick={()=>sendReminder(r.id)}>{r.sent?c.sent:c.send}</button></div>})}</div></>}
   {section==='broadcasts'&&<><AdminHead title={c.broadcasts} subtitle={c.broadcastsSub}/><div className="segments">{[c.allClients,c.dogOwners,c.catOwners,c.inactive90,c.vaccineSoon,c.selectedGroup].map((x,i)=><button className={`card segment segment-${i%4}`} key={x}>{x}</button>)}</div><div className="admin-grid"><div className="card panel premium-panel"><label className="field"><span>{c.messageText}</span><textarea defaultValue={c.broadcastMessage}/></label><button className="btn premium-cta">{c.sendDemo}</button></div><div className="preview"><small>{c.preview}</small><div className="bubble">{c.broadcastMessage}</div></div></div></>}
   {section==='analytics'&&<><AdminHead title={c.analytics} subtitle={c.analyticsSub}/><div className="kpi-grid"><Kpi label={c.monthRequests} value="142" icon="message" tone="lavender"/><Kpi label={c.visitConversion} value="84%" icon="chart" tone="blue"/><Kpi label={c.activeClients} value="128" icon="users" tone="mint"/><Kpi label={c.repeatClients} value="64%" icon="paw" tone="peach"/></div><div className="card panel analytics premium-panel"><h3>{c.popularCategories}</h3>{[[c.consult,86],[c.vaccine,68],[c.diagnostic,52],[c.procedure,41]].map(([x,v])=><div className="metric" key={String(x)}><div><b>{x}</b><span>{v}</span></div><div className="metric-track"><span style={{width:`${v}%`}}/></div></div>)}</div></>}
  </main></div>
  <nav className="admin-bottom-nav">{navBase.slice(0,5).map(([id,ic])=><button key={id} className={section===id?'active':''} onClick={()=>setSection(id)}><Icon name={ic}/><span>{navLabel(id)}</span></button>)}</nav>
  {editor&&<PetEditor admin pet={editor} onSave={savePet} onClose={()=>setEditor(null)}/>} 
 </>;
}
function AdminHead({title,subtitle}:{title:string;subtitle:string}){return <div className="admin-head"><h1>{title}</h1><p>{subtitle}</p></div>}
function Kpi({label,value,icon,tone}:{label:string;value:string;icon:string;tone:string}){return <div className={`card kpi premium-kpi ${tone} paw-card`}><span className="icon-tile"><Icon name={icon}/></span><small>{label}</small><b>{value}</b></div>}
function statusClass(status:string){return status==='Новая'?'new':status==='Отменена'?'danger':'confirmed'}
