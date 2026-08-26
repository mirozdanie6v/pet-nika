'use client';
import { useState } from 'react';
import { AdminApp } from '@/components/AdminApp';
import { AppProvider, useApp } from '@/components/AppProvider';
import { ClientApp } from '@/components/ClientApp';
import { Icon } from '@/components/Icon';
import type { AppRole, Language } from '@/types';
export function PetNikaApp(){return <AppProvider><Inner/></AppProvider>}
function Inner(){ const [role,setRole]=useState<AppRole>('client'); const {state,setLanguage}=useApp(); return <div className="app"><header className="topbar"><div className="topbar-inner"><div className="brand"><span className="brand-mark"><Icon name="paw"/></span><div><b>PET NIKA</b><small>digital care system</small></div></div><div className="top-actions"><div className="role-switch"><button className={role==='client'?'active':''} onClick={()=>setRole('client')}><Icon name="user"/><span>Профиль клиента</span></button><button className={role==='admin'?'active':''} onClick={()=>setRole('admin')}><Icon name="layout"/><span>Демо-админка</span></button></div><div className="language-switch">{(['ru','en','vi'] as Language[]).map(l=><button key={l} className={state.language===l?'active':''} onClick={()=>setLanguage(l)}>{l.toUpperCase()}</button>)}</div></div></div></header>{role==='client'?<ClientApp/>:<AdminApp/>}</div>; }
