'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { services } from '@/lib/demo-data';
import { getPetPhoto } from '@/lib/demo-images';
import { localizedPetValue, ui } from '@/lib/i18n';
import { useApp } from '@/components/AppProvider';

export function BookingFlow({onDone}:{onDone:()=>void}){
 const{state,addRequest}=useApp();
 const c=ui(state.language);
 const[step,setStep]=useState(1),[serviceId,setServiceId]=useState('consult'),[petId,setPetId]=useState(state.activePetId),[date,setDate]=useState('27 Aug'),[time,setTime]=useState('11:30');
 const pet=state.pets.find(p=>p.id===petId)??state.pets[0],service=services.find(s=>s.id===serviceId)??services[0];
 const dates=['27 Aug','28 Aug','29 Aug','1 Sep','2 Sep','3 Sep'],times=['10:30','11:30','13:00','14:30','15:30','16:00'];
 const pct=useMemo(()=>Math.min(step,7)/7*100,[step]);
 const finish=()=>{addRequest({id:`r-${Date.now()}`,client:pet.owner,petId:pet.id,serviceId,date,time,contact:'Demo contact',source:'Mini App',status:'Новая',comment:'Prototype request'});setStep(8)};
 return <div className="booking-card premium-booking paw-surface">
   <div className="progress"><span style={{width:`${pct}%`}}/></div><div className="step-label">{step<=7?`${step}/7`:'✓'}</div>
   {step===1&&<Choice title={c.chooseService}>{services.map(s=><button key={s.id} className={`choice ${serviceId===s.id?'selected':''}`} onClick={()=>setServiceId(s.id)}><Icon name={s.icon}/><b>{s[state.language]}</b></button>)}</Choice>}
   {step===2&&<Choice title={c.choosePet}>{state.pets.map(p=><button key={p.id} className={`choice pet-choice ${petId===p.id?'selected':''}`} onClick={()=>setPetId(p.id)}><span className="choice-pet-photo"><img src={getPetPhoto(p)} alt={p.name}/></span><span><b>{p.name}</b><small>{p.breed} · {localizedPetValue(state.language,p.age)}</small></span></button>)}</Choice>}
   {step===3&&<Choice title={c.specialist}><div className="demo-note">{c.specialistDemo}</div><button className="choice selected"><Icon name="user"/><b>{c.anySpecialist}</b></button></Choice>}
   {step===4&&<Choice title={c.chooseDate}><div className="option-grid">{dates.map(d=><button key={d} className={`option ${date===d?'selected':''}`} onClick={()=>setDate(d)}>{d}</button>)}</div></Choice>}
   {step===5&&<Choice title={c.chooseTime}><div className="option-grid">{times.map(t=><button key={t} className={`option ${time===t?'selected':''}`} onClick={()=>setTime(t)}>{t}</button>)}</div></Choice>}
   {step===6&&<Choice title={c.contactComment}><label className="field"><span>{c.phone}</span><input placeholder="+84 ..." inputMode="tel"/></label><label className="field"><span>{c.comment}</span><textarea placeholder={c.commentPlaceholder}/></label></Choice>}
   {step===7&&<Choice title={c.review}><div className="booking-review-pet"><img src={getPetPhoto(pet)} alt={pet.name}/><span><small>{c.pet}</small><b>{pet.name}</b><em>{pet.breed}</em></span></div><div className="summary"><Row a={c.service} b={service[state.language]}/><Row a={c.date} b={date}/><Row a={c.time} b={time}/></div></Choice>}
   {step===8&&<div className="success"><div className="success-icon"><Icon name="check"/></div><h2>{c.requestCreated}</h2><p>{c.requestCreatedText}</p><button className="btn primary" onClick={onDone}>{c.backHome}</button></div>}
   {step<=7&&<div className="booking-actions"><button className="btn ghost" disabled={step===1} onClick={()=>setStep(s=>Math.max(1,s-1))}>{c.back}</button><button className="btn premium-cta" onClick={()=>step===7?finish():setStep(s=>s+1)}>{c.next}</button></div>}
 </div>
}
function Choice({title,children}:{title:string;children:React.ReactNode}){return <div><h2 className="booking-title">{title}</h2><div className="choice-stack">{children}</div></div>}
function Row({a,b}:{a:string;b:string}){return <div className="summary-row"><span>{a}</span><b>{b}</b></div>}
