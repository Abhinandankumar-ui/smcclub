import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [activeDomain, setActiveDomain] = useState('All');
  const [loading, setLoading] = useState(true);

  const domains = ['All', 'Robotics', 'IoT', 'Embedded Systems', 'AI/ML', 'Automation', 'Drone/CV'];

  useEffect(() => {
    axios.get('/api/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredMembers = members.filter(m => {
    if (activeDomain === 'All') return true;
    return m.technicalDomain === activeDomain;
  });

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <span className='text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20'>
          Club Leadership & Engineers
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold mt-3 text-white'>
          Meet the Minds Behind the Tech
        </h1>
        <p className='mt-3 text-white/70 text-sm sm:text-base leading-relaxed'>
          Our team comprises dedicated student developers, hardware fabricators, firmware programmers, and robotics leads.
        </p>
      </div>

      {/* Domain Filters */}
      <div className='flex flex-wrap items-center justify-center gap-2 mb-12'>
        {domains.map(d => (
          <button
            key={d}
            onClick={() => setActiveDomain(d)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeDomain === d
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'glass border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      {loading ? (
        <div className='text-center py-16 text-white/60'>Loading team members...</div>
      ) : filteredMembers.length === 0 ? (
        <div className='text-center py-16 glass rounded-2xl p-8 border border-white/10 max-w-md mx-auto'>
          <p className='text-lg font-bold text-white'>No members listed for this domain yet.</p>
          <p className='text-xs text-white/60 mt-1'>Approved club applicants will appear here.</p>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredMembers.map(m => (
            <div
              key={m._id}
              className='glass p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center'
            >
              {/* Photo */}
              <div className='relative w-28 h-28 rounded-2xl overflow-hidden mb-4 border-2 border-violet-500/30 shadow-lg shadow-violet-900/20'>
                <img
                  src={m.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={m.name}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Domain Badge */}
              <span className='text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2'>
                {m.technicalDomain || 'Robotics'}
              </span>

              {/* Name & Role */}
              <h3 className='text-xl font-bold text-white'>{m.name}</h3>
              <p className='text-xs text-violet-400 font-medium mt-0.5'>{m.designation}</p>

              {/* Bio */}
              <p className='text-xs text-white/60 mt-3 line-clamp-3 leading-relaxed'>
                {m.bio || 'Core engineering member contributing to innovative club hardware and software modules.'}
              </p>

              {/* Social Links */}
              <div className='flex gap-3 mt-4 pt-4 border-t border-white/10 text-white/60 text-xs font-semibold'>
                {m.socialLinks?.linkedin && (
                  <a href={m.socialLinks.linkedin} target='_blank' rel='noreferrer' className='hover:text-cyan-400 transition-colors'>
                    LinkedIn ↗
                  </a>
                )}
                {m.socialLinks?.github && (
                  <a href={m.socialLinks.github} target='_blank' rel='noreferrer' className='hover:text-cyan-400 transition-colors'>
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Join the Team Callout */}
      <div className='mt-16 glass p-8 rounded-3xl border border-white/10 text-center max-w-xl mx-auto'>
        <h3 className='text-lg font-bold text-white'>Want your name and projects here?</h3>
        <p className='text-xs text-white/60 mt-1'>
          We are actively recruiting passionate team leads, developers, and hardware builders.
        </p>
        <Link
          to='/join'
          className='inline-block mt-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all'
        >
          ⭐ Join Our Team
        </Link>
      </div>
    </div>
  );
}
