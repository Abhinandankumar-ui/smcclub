import { useState } from 'react'; import axios from 'axios'; import { motion } from 'framer-motion'
export default function JoinTeam(){
 const [form,setForm]=useState({fullName:'',email:'',phone:'',gender:'Male',address:'',course:'',areaOfInterest:'',whyJoin:''});
 const [file,setFile]=useState(null); const [msg,setMsg]=useState(''); const [agree,setAgree]=useState(false);
 const submit=async e=>{ e.preventDefault(); if(!agree) return setMsg('Please accept Terms'); const fd=new FormData(); Object.entries(form).forEach(([k,v])=>fd.append(k,v)); if(file) fd.append('profilePhoto',file); try{ await axios.post('/api/applications',fd,{headers:{'Content-Type':'multipart/form-data'}}); setMsg('✨ Premium Application Submitted! Admin will review.'); }catch(err){ setMsg(err.response?.data?.error||'Error') }};
 const inp='w-full p-3.5 rounded-xl bg-white/[0.06] border border-white/10 outline-none focus:border-violet-500 focus:bg-white/[0.09] transition placeholder:text-white/40';
 return <div className='max-w-3xl mx-auto px-6 py-12'>
  <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className='text-center'><p className='glass inline-block px-4 py-1 rounded-full text-xs tracking-widest text-violet-300'>LIMITED SLOTS</p><h1 className='text-5xl font-black mt-4'>Join <span className='text-gradient'>Premium Team</span> ⭐️</h1><p className='text-white/50 mt-2'>Only selected applicants get the premium badge.</p></motion.div>
  <form onSubmit={submit} className='glass p-8 rounded-[1.5rem] mt-8 space-y-4 relative overflow-hidden'><div className='premium-gradient h-1 rounded-full'/>
    <input placeholder='Full Name *' required value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} className={inp}/>
    <div className='grid grid-cols-2 gap-4'><input placeholder='Email *' required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={inp}/><input placeholder='Phone *' required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={inp}/></div>
    <div className='grid grid-cols-2 gap-4'><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} className={inp}><option>Male</option><option>Female</option><option>Other</option></select><input placeholder='Course' value={form.course} onChange={e=>setForm({...form,course:e.target.value})} className={inp}/></div>
    <input placeholder='Address' value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className={inp}/>
    <input placeholder='Area of Interest (Design / Tech / Management)' value={form.areaOfInterest} onChange={e=>setForm({...form,areaOfInterest:e.target.value})} className={inp}/>
    <textarea placeholder='Why do you want to join? (Be premium)' value={form.whyJoin} onChange={e=>setForm({...form,whyJoin:e.target.value})} className={inp+' h-28'}/>
    <div className='bg-white/5 rounded-xl p-4'><label className='text-sm text-white/60'>Profile Photo — premium members get featured</label><input type='file' accept='image/*' onChange={e=>setFile(e.target.files[0])} className='block mt-2 text-sm'/></div>
    <label className='flex gap-2 text-sm text-white/70'><input type='checkbox' checked={agree} onChange={e=>setAgree(e.target.checked)}/> I agree to Premium Terms & Conditions</label>
    <button className='w-full premium-gradient py-4 rounded-xl font-black text-lg shadow-xl shadow-violet-600/25 hover:scale-[1.01] transition'>Submit Premium Application →</button>
    {msg&&<p className='text-center text-sm text-emerald-400 font-semibold'>{msg}</p>}
  </form>
 </div>
}
