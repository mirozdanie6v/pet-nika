'use client';
import { useEffect, useState } from 'react';
import { AdminApp } from '@/components/AdminApp';
import { AppProvider, useApp } from '@/components/AppProvider';
import { ClientApp } from '@/components/ClientApp';
import { Icon } from '@/components/Icon';
import { ui } from '@/lib/i18n';
import type { AppRole, Language } from '@/types';

export function PetNikaApp(){return <AppProvider><Inner/></AppProvider>}

function Inner(){
  const [role,setRole]=useState<AppRole>('client');
  const [roleMenuOpen,setRoleMenuOpen]=useState(false);
  const [langMenuOpen,setLangMenuOpen]=useState(false);
  const {state,setLanguage}=useApp();
  const c=ui(state.language);
  useEffect(()=>{document.documentElement.lang=state.language},[state.language]);
  const selectRole=(nextRole:AppRole)=>{setRole(nextRole);setRoleMenuOpen(false)};
  const selectLanguage=(language:Language)=>{setLanguage(language);setLangMenuOpen(false)};

  return <div className="app">
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand"><span className="brand-mark"><Icon name="paw"/></span><div><b>PET NIKA</b><small>PET CARE</small></div></div>
        <div className="top-actions">
          <div className="role-switch desktop-role-switch" aria-label="App role">
            <button className={role==='client'?'active':''} onClick={()=>selectRole('client')}><Icon name="user"/><span>{c.roleClient}</span></button>
            <button className={role==='admin'?'active':''} onClick={()=>selectRole('admin')}><Icon name="layout"/><span>{c.roleAdmin}</span></button>
          </div>
          <div className="mobile-role-switch">
            <button className="mobile-role-trigger" aria-haspopup="menu" aria-expanded={roleMenuOpen} onClick={()=>{setRoleMenuOpen(open=>!open);setLangMenuOpen(false)}}>
              <Icon name={role==='client'?'user':'layout'}/><span>{role==='client'?c.roleClient:c.roleAdmin}</span><span className="role-caret" aria-hidden="true">⌄</span>
            </button>
            {roleMenuOpen&&<div className="mobile-role-menu" role="menu">
              <button role="menuitem" className={role==='client'?'active':''} onClick={()=>selectRole('client')}><Icon name="user"/><span><b>{c.roleClient}</b><small>{c.roleClientHint}</small></span></button>
              <button role="menuitem" className={role==='admin'?'active':''} onClick={()=>selectRole('admin')}><Icon name="layout"/><span><b>{c.roleAdmin}</b><small>{c.roleAdminHint}</small></span></button>
            </div>}
          </div>
          <div className="language-switch desktop-language-switch">{(['ru','en','vi'] as Language[]).map(l=><button key={l} className={state.language===l?'active':''} onClick={()=>selectLanguage(l)}>{l.toUpperCase()}</button>)}</div>
          <div className="mobile-language-switch">
            <button className="mobile-language-trigger" aria-haspopup="menu" aria-expanded={langMenuOpen} onClick={()=>{setLangMenuOpen(open=>!open);setRoleMenuOpen(false)}}>{state.language.toUpperCase()}⌄</button>
            {langMenuOpen&&<div className="mobile-language-menu" role="menu">{(['ru','en','vi'] as Language[]).map(l=><button role="menuitem" key={l} className={state.language===l?'active':''} onClick={()=>selectLanguage(l)}>{l.toUpperCase()}</button>)}</div>}
          </div>
        </div>
      </div>
    </header>
    {role==='client'?<ClientApp/>:<AdminApp/>}
  </div>;
}
