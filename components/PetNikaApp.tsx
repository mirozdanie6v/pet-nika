'use client';
import { useState } from 'react';
import { AdminApp } from '@/components/AdminApp';
import { AppProvider, useApp } from '@/components/AppProvider';
import { ClientApp } from '@/components/ClientApp';
import { Icon } from '@/components/Icon';
import type { AppRole, Language } from '@/types';

const roleLabels = {
  ru: { client: 'Профиль клиента', admin: 'Демо-админка', clientHint: 'Интерфейс владельца питомца', adminHint: 'Интерфейс сотрудников PET NIKA' },
  en: { client: 'Client profile', admin: 'Demo admin', clientHint: 'Pet owner interface', adminHint: 'PET NIKA staff interface' },
  vi: { client: 'Hồ sơ khách hàng', admin: 'Quản trị demo', clientHint: 'Giao diện chủ thú cưng', adminHint: 'Giao diện nhân viên PET NIKA' },
} as const;

export function PetNikaApp(){return <AppProvider><Inner/></AppProvider>}

function Inner(){
  const [role,setRole]=useState<AppRole>('client');
  const [roleMenuOpen,setRoleMenuOpen]=useState(false);
  const {state,setLanguage}=useApp();
  const labels=roleLabels[state.language];
  const selectRole=(nextRole:AppRole)=>{setRole(nextRole);setRoleMenuOpen(false)};

  return <div className="app">
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand"><span className="brand-mark"><Icon name="paw"/></span><div><b>PET NIKA</b><small>digital care system</small></div></div>
        <div className="top-actions">
          <div className="role-switch desktop-role-switch" aria-label="Режим приложения">
            <button className={role==='client'?'active':''} onClick={()=>selectRole('client')}><Icon name="user"/><span>{labels.client}</span></button>
            <button className={role==='admin'?'active':''} onClick={()=>selectRole('admin')}><Icon name="layout"/><span>{labels.admin}</span></button>
          </div>
          <div className="mobile-role-switch">
            <button className="mobile-role-trigger" aria-haspopup="menu" aria-expanded={roleMenuOpen} onClick={()=>setRoleMenuOpen(open=>!open)}>
              <Icon name={role==='client'?'user':'layout'}/><span>{role==='client'?labels.client:labels.admin}</span><span className="role-caret" aria-hidden="true">⌄</span>
            </button>
            {roleMenuOpen&&<div className="mobile-role-menu" role="menu">
              <button role="menuitem" className={role==='client'?'active':''} onClick={()=>selectRole('client')}><Icon name="user"/><span><b>{labels.client}</b><small>{labels.clientHint}</small></span></button>
              <button role="menuitem" className={role==='admin'?'active':''} onClick={()=>selectRole('admin')}><Icon name="layout"/><span><b>{labels.admin}</b><small>{labels.adminHint}</small></span></button>
            </div>}
          </div>
          <div className="language-switch">{(['ru','en','vi'] as Language[]).map(l=><button key={l} className={state.language===l?'active':''} onClick={()=>setLanguage(l)}>{l.toUpperCase()}</button>)}</div>
        </div>
      </div>
    </header>
    {role==='client'?<ClientApp/>:<AdminApp/>}
  </div>;
}
