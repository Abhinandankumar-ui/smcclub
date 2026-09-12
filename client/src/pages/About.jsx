import { motion } from 'framer-motion'
export default function About(){
 return <div className='max-w-5xl mx-auto px-6 py-16'>
  <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className='text-5xl font-black'>About <span className='text-gradient'>Premium Club</span></motion.h1>
  <div className='glass rounded-[1.5rem] p-8 mt-8 relative overflow-hidden'><div className='orb w-64 h-64 bg-violet-600 top-0 right-0 !opacity-20'/>
    <p className='text-white/70 leading-relaxed relative'>We are a premium, student-driven antigravity community. Our mission is to levitate talent through elite workshops, high-impact projects, and a curated network of creators. Every member is selected — not everyone gets in.</p>
    <div className='grid grid-cols-3 gap-4 mt-6'>{[{k:'Vision',v:'Be India\'s #1 premium student club'},{k:'Mission',v:'Build leaders, not followers'},{k:'Vibe',v:'Antigravity • Dynamic • Premium'}].map(x=><div key={x.k} className='bg-white/5 rounded-xl p-4'><p className='text-xs tracking-widest text-violet-400'>{x.k}</p><p className='text-sm mt-1'>{x.v}</p></div>)}</div>
  </div>
 </div>
}
