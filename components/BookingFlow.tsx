'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { services } from '@/lib/demo-data';
import { getPetPhoto } from '@/lib/demo-images';
import { localizedPetValue, ui } from '@/lib/i18n';
import { useApp } from '@/components/AppProvider';
import type { Language } from '@/types';

const serviceDescriptions:Record<Language,Record<string,string>>={
 ru:{consult:'Консультация ветеринара',diagnostic:'Точное обследование и эффективное лечение',vaccine:'Защита здоровья вашего питомца',procedure:'Безопасность и идентификация питомца'},
 en:{consult:'Veterinary consultation',diagnostic:'Accurate diagnostics and effective treatment',vaccine:'Preventive care and protection',procedure:'Safe pet identification'},
 vi:{consult:'Tư vấn bác sĩ thú y',diagnostic:'Chẩn đoán chính xác và điều trị hiệu quả',vaccine:'Phòng bệnh và bảo vệ sức khỏe',procedure:'Nhận dạng thú cưng an toàn'}
};

export function BookingFlow({onDone,initialServiceId='consult'}:{onDone:()=>void;initialServiceId?:string}){
 const{state,addRequest}=useApp();
 const c=ui(state.language);
 const [step,setStep]=useState(1);
 const [serviceId,setServiceId]=useState(initialServiceId);
 const [petId,setPetId]=useState(state.activePetId);
 const [date,setDate]=useState('27 Aug');
 const [time,setTime]=useState('11:30');
 const [contact,setContact]=useState(state.clients.find(x=>x.petIds.includes(petId))?.contact??'');
 const [comment,setComment]=useState('');
 const pet=state.pets.find(p=>p.id===petId)??state.pets[0];
 const service=services.find(s=>s.id===serviceId)??services[0];
 const dates=['27 Aug','28 Aug','29 Aug','1 Sep','2 Sep','3 Sep'];
 const times=['10:30','11:30','13:00','14:30','15:30','16:00'];
 const pct=useMemo(()=>Math.min(step,7)/7*100,[step]);
 const labels=state.language==='ru'?['Услуга','Питомец','Специалист','Дата','Время','Контакт','Проверка']:state.language==='en'?['Service','Pet','Specialist','Date','Time','Contact','Review']:['Dịch vụ','Thú cưng','Chuyên gia','Ngày','Giờ','Liên hệ','Kiểm tra'];
 const finish=()=>{
  addRequest({id:`r-${Date.now()}`,client:pet.owner,petId:pet.id,serviceId,date,time,contact:contact||'Demo contact',source:'Mini App',status:'Новая',comment:comment||'Prototype request'});
  setStep(8);
 };
 const goNext=()=>step===7?finish():setStep(s=>Math.min(8,s+1));

 return <section className="booking-experience">
  <div className="booking-overview">
   <div className="booking-overview-copy"><span className="eyebrow">PET NIKA</span><h2>{c.booking}</h2><p>{c.bookingSubtitle}</p></div>
   <div className="booking-selected"><span className="booking-selected-icon"><Icon name={service.icon}/></span><span><small>{c.service}</small><b>{service[state.language]}</b></span></div>
  </div>
  <div className="booking-progress"><span style={{width:`${pct}%`}}/><div className="booking-step-pills">{labels.map((label,index)=><span key={label} className={step===index+1?'active':step>index+1?'done':''}>{index+1}<em>{label}</em></span>)}</div></div>
  <div className="booking-stage">
   {step===1&&<Choice title={c.chooseService} subtitle={state.language==='ru'?'Можно изменить выбранную услугу.':state.language==='en'?'You can change the selected service.':'Bạn có thể thay đổi dịch vụ.'}>{services.map((s,index)=><button key={s.id} className={`booking-choice service-choice service-tone-${index} ${serviceId===s.id?'selected':''}`} onClick={()=>setServiceId(s.id)}><span className="choice-icon"><Icon name={s.icon}/></span><span><b>{s[state.language]}</b><small>{serviceDescriptions[state.language][s.id]}</small></span><span className="choice-check"><Icon name={serviceId===s.id?'check':'chevronRight'}/></span></button>)}</Choice>}
   {step===2&&<Choice title={c.choosePet} subtitle={state.language==='ru'?'Фото и данные питомца подтянутся в запись автоматически.':state.language==='en'?'The pet photo and profile will be attached automatically.':'Ảnh và hồ sơ thú cưng sẽ được tự động đính kèm.'}>{state.pets.map(p=><button key={p.id} className={`booking-choice pet-choice ${petId===p.id?'selected':''}`} onClick={()=>{setPetId(p.id);setContact(state.clients.find(x=>x.petIds.includes(p.id))?.contact??contact)}}><span className="choice-pet-photo"><img src={getPetPhoto(p)} alt={p.name}/></span><span><b>{p.name}</b><small>{p.breed} · {localizedPetValue(state.language,p.age)}</small></span><span className="choice-check"><Icon name={petId===p.id?'check':'chevronRight'}/></span></button>)}</Choice>}
   {step===3&&<Choice title={c.specialist} subtitle={c.specialistDemo}><button className="booking-choice selected"><span className="choice-icon"><Icon name="user"/></span><span><b>{c.anySpecialist}</b><small>PET NIKA</small></span><span className="choice-check"><Icon name="check"/></span></button></Choice>}
   {step===4&&<Choice title={c.chooseDate} subtitle={state.language==='ru'?'Выберите удобный день.':state.language==='en'?'Choose a convenient day.':'Chọn ngày phù hợp.'}><div className="booking-option-grid">{dates.map(d=><button key={d} className={`booking-option ${date===d?'selected':''}`} onClick={()=>setDate(d)}><Icon name="calendar"/><b>{d}</b></button>)}</div></Choice>}
   {step===5&&<Choice title={c.chooseTime} subtitle={state.language==='ru'?'Доступные интервалы в demo-расписании.':state.language==='en'?'Available demo schedule slots.':'Khung giờ demo đang trống.'}><div className="booking-option-grid time-grid">{times.map(t=><button key={t} className={`booking-option ${time===t?'selected':''}`} onClick={()=>setTime(t)}><Icon name="clock"/><b>{t}</b></button>)}</div></Choice>}
   {step===6&&<Choice title={c.contactComment} subtitle={state.language==='ru'?'Оставьте способ связи и важную информацию для клиники.':state.language==='en'?'Add a contact method and anything the clinic should know.':'Thêm liên hệ và thông tin quan trọng cho phòng khám.'}><div className="booking-form"><label className="field"><span>{c.phone}</span><input value={contact} onChange={e=>setContact(e.target.value)} placeholder="+84 ..." inputMode="tel"/></label><label className="field"><span>{c.comment}</span><textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder={c.commentPlaceholder}/></label></div></Choice>}
   {step===7&&<Choice title={c.review} subtitle={state.language==='ru'?'Проверьте данные перед отправкой заявки.':state.language==='en'?'Review the details before submitting.':'Kiểm tra thông tin trước khi gửi.'}><div className="booking-review-pet"><img src={getPetPhoto(pet)} alt={pet.name}/><span><small>{c.pet}</small><b>{pet.name}</b><em>{pet.breed}</em></span></div><div className="booking-summary"><Row icon="stethoscope" a={c.service} b={service[state.language]}/><Row icon="calendar" a={c.date} b={date}/><Row icon="clock" a={c.time} b={time}/><Row icon="phone" a={c.phone} b={contact||'—'}/></div></Choice>}
   {step===8&&<div className="booking-success"><span className="success-orb"><Icon name="check"/></span><h2>{c.requestCreated}</h2><p>{c.requestCreatedText}</p><button className="service-book-btn" onClick={onDone}>{c.backHome}<Icon name="chevronRight"/></button></div>}
  </div>
  {step<=7&&<div className="booking-actions premium-booking-actions"><button className="btn ghost" disabled={step===1} onClick={()=>setStep(s=>Math.max(1,s-1))}><Icon name="chevronRight" style={{transform:'rotate(180deg)'}}/>{c.back}</button><button className="service-book-btn" onClick={goNext}>{c.next}<Icon name="chevronRight"/></button></div>}
 </section>;
}

function Choice({title,subtitle,children}:{title:string;subtitle?:string;children:React.ReactNode}){return <div className="booking-choice-stage"><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}<div className="choice-stack">{children}</div></div>}
function Row({icon,a,b}:{icon:string;a:string;b:string}){return <div className="booking-summary-row"><span className="summary-icon"><Icon name={icon}/></span><span><small>{a}</small><b>{b}</b></span></div>}
