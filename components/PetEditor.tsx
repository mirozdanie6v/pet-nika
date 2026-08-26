'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Icon } from '@/components/Icon';
import { getPetPhoto } from '@/lib/demo-images';
import { ui } from '@/lib/i18n';
import { useApp } from '@/components/AppProvider';
import type { Pet } from '@/types';

export function PetEditor({pet,admin,onSave,onClose}:{pet:Pet;admin?:boolean;onSave:(pet:Pet)=>void;onClose:()=>void}){
 const {state}=useApp();
 const c=ui(state.language);
 const[draft,setDraft]=useState<Pet>(pet);
 const[error,setError]=useState('');
 const field=<K extends keyof Pet>(key:K,value:Pet[K])=>setDraft(d=>({...d,[key]:value}));
 const upload=(e:ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=()=>field('photo',String(reader.result));reader.readAsDataURL(file)};
 const submit=(e:FormEvent)=>{e.preventDefault();if(!draft.name.trim()||!draft.species.trim()){setError(c.requiredPet);return;}onSave(draft);onClose()};
 return <div className="modal-backdrop" role="dialog" aria-modal="true"><form className="modal premium-modal" onSubmit={submit}><div className="modal-head"><div><span className="eyebrow">{admin?c.adminEyebrow:c.clientEyebrow}</span><h2>{c.editorTitle}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label={c.cancel}><Icon name="x"/></button></div><div className="form-grid"><label className="upload-card"><span>{c.photo}</span><img src={getPetPhoto(draft)} alt={draft.name||c.photo}/><span className="upload-button"><Icon name="edit"/>{c.choosePhoto}</span><input type="file" accept="image/*" onChange={upload}/></label><Field label={c.name} value={draft.name} onChange={v=>field('name',v)}/><Field label={c.species} value={draft.species} onChange={v=>field('species',v)}/><Field label={c.breed} value={draft.breed} onChange={v=>field('breed',v)}/><Field label={c.birthDate} type="date" value={draft.birthDate} onChange={v=>field('birthDate',v)}/><Field label={c.age} value={draft.age} onChange={v=>field('age',v)}/><Field label={c.sex} value={draft.sex} onChange={v=>field('sex',v)}/><Field label={c.weight} value={draft.weight} onChange={v=>field('weight',v)}/><Field label={c.color} value={draft.color} onChange={v=>field('color',v)}/><label className="check-field"><input type="checkbox" checked={draft.sterilized} onChange={e=>field('sterilized',e.target.checked)}/><span>{c.sterilized}</span></label><Field label="PET ID" value={draft.petId} disabled onChange={()=>{}}/><Area label={c.behavior} value={draft.behavior} onChange={v=>field('behavior',v)}/><Area label={c.allergies} value={draft.allergies} onChange={v=>field('allergies',v)}/><Area label={c.health} value={draft.healthNotes} onChange={v=>field('healthNotes',v)}/><Area label={c.ownerNotes} value={draft.ownerNotes} onChange={v=>field('ownerNotes',v)}/>{admin&&<><Field label={c.owner} value={draft.owner} onChange={v=>field('owner',v)}/><Field label={c.lastVisit} value={draft.lastVisit} onChange={v=>field('lastVisit',v)}/><Field label={c.nextReminder} value={draft.nextReminder} onChange={v=>field('nextReminder',v)}/><Area label={c.clinicNote} value={draft.clinicNotes} onChange={v=>field('clinicNotes',v)}/></>}</div>{error&&<div className="form-error" role="alert">{error}</div>}<div className="modal-actions"><button type="button" className="btn ghost" onClick={onClose}>{c.cancel}</button><button className="btn premium-cta">{c.save}</button></div></form></div>
}
function Field({label,value,onChange,type='text',disabled=false}:{label:string;value:string;onChange:(v:string)=>void;type?:string;disabled?:boolean}){return <label className="field"><span>{label}</span><input type={type} value={value} disabled={disabled} onChange={e=>onChange(e.target.value)}/></label>}
function Area({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}){return <label className="field span-2"><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)}/></label>}
