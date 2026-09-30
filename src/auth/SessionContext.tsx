import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
export type User = { id:string; email:string; firstName:string; lastName:string; displayName:string|null; role:'school_admin' };
type Value={status:'loading'|'authenticated'|'unauthenticated';user:User|null; authenticate:(path:'/api/auth/login'|'/api/auth/register',body:Record<string,string>)=>Promise<string|null>;logout:()=>Promise<void>};
const Context=createContext<Value|null>(null);
export function SessionProvider({children}:{children:ReactNode}) { const [user,setUser]=useState<User|null>(null);const [status,setStatus]=useState<Value['status']>('loading');
 const restore=async()=>{try{const r=await fetch('/api/auth/me',{credentials:'same-origin'});const d=await r.json();setUser(r.ok?d.user:null);setStatus(r.ok?'authenticated':'unauthenticated')}catch{setStatus('unauthenticated')}};
 useEffect(()=>{void restore()},[]);
 const authenticate=async(path:'/api/auth/login'|'/api/auth/register',body:Record<string,string>)=>{const r=await fetch(path,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json().catch(()=>null);if(r.ok){setUser(d.user);setStatus('authenticated');return null}return d?.error?.message??'Anmeldung nicht möglich. Bitte prüfen Sie Ihre Eingaben.'};
 const logout=async()=>{const response=await fetch('/api/auth/logout',{method:'POST',credentials:'same-origin'});if(!response.ok)throw new Error('LOGOUT_FAILED');setUser(null);setStatus('unauthenticated')};
 return <Context.Provider value={useMemo(()=>({status,user,authenticate,logout}),[status,user])}>{children}</Context.Provider> }
export function useSession(){const x=useContext(Context);if(!x)throw new Error('SessionProvider fehlt.');return x}
