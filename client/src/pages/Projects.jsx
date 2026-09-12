import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeDomain, setActiveDomain] = useState('All');
  const [loading, setLoading] = useState(true);

  const domains = ['All', 'Robotics', 'IoT', 'Embedded Systems', 'AI/ML', 'Automation', 'Drone/CV'];

  const fetchProjects = (domain) => {
    setLoading(true);
    const url = domain && domain !== 'All' ? `/api/projects?domain=${encodeURIComponent(domain)}` : '/api/projects';
    axios.get(url)
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects(activeDomain);
  }, [activeDomain]);

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <span className='text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20'>
          Robotics & IoT Innovations
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold mt-3 text-white'>
          Our Engineering Projects
        </h1>
        <p className='mt-3 text-white/70 text-sm sm:text-base leading-relaxed'>
          Explore autonomous vehicles, telemetry nodes, custom electronics, and edge AI systems designed, engineered, and assembled by club members.
        </p>
      </div>

      {/* Domain Filter Tabs */}
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

      {/* Projects Grid */}
      {loading ? (
        <div className='text-center py-16 text-white/60'>Loading innovative projects...</div>
      ) : projects.length === 0 ? (
        <div className='text-center py-16 glass rounded-2xl p-8 border border-white/10 max-w-md mx-auto'>
          <p className='text-lg font-bold text-white'>No projects found in this domain yet.</p>
          <p className='text-xs text-white/60 mt-1'>Check back soon or submit a new project proposal!</p>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map(p => (
            <div
              key={p._id}
              className='glass rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col'
            >
              {/* Image Preview */}
              <div className='relative h-52 w-full overflow-hidden bg-slate-900'>
                <img
                  src={p.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'}
                  alt={p.name}
                  className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <div className='absolute top-3 right-3'>
                  <span className='px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur border border-white/20 text-cyan-300'>
                    {p.domain}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className='p-6 flex-1 flex flex-col justify-between'>
                <div>
                  <h3 className='text-xl font-bold text-white leading-tight'>{p.name}</h3>
                  <p className='text-white/70 text-xs mt-2.5 leading-relaxed'>{p.description}</p>
                </div>

                <div className='mt-6 space-y-4'>
                  {/* Technologies Used */}
                  <div>
                    <p className='text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5'>
                      Technologies Used
                    </p>
                    <div className='flex flex-wrap gap-1.5'>
                      {p.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className='text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/80 font-mono'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <p className='text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5'>
                      Team Members
                    </p>
                    <div className='flex items-center gap-1.5 flex-wrap text-xs text-violet-300'>
                      <span className='text-white/60'>👥</span>
                      {p.teamMembers && p.teamMembers.length > 0 ? (
                        p.teamMembers.map((m, mIdx) => (
                          <span key={mIdx} className='font-medium'>
                            {m}{mIdx < p.teamMembers.length - 1 ? ',' : ''}
                          </span>
                        ))
                      ) : (
                        <span className='text-white/50'>Robo-IoT Core Team</span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  {(p.githubUrl || p.demoUrl) && (
                    <div className='pt-3 border-t border-white/10 flex gap-3 text-xs'>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='text-white/80 hover:text-cyan-400 font-semibold flex items-center gap-1'
                        >
                          Code Repository ↗
                        </a>
                      )}
                      {p.demoUrl && p.demoUrl !== '#' && (
                        <a
                          href={p.demoUrl}
                          target='_blank'
                          rel='noreferrer'
                          className='text-cyan-400 hover:underline font-semibold'
                        >
                          Live Demonstration ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Project CTA */}
      <div className='mt-20 glass p-8 rounded-3xl border border-violet-500/30 text-center max-w-2xl mx-auto'>
        <h3 className='text-xl font-bold text-white'>Have a project idea in mind?</h3>
        <p className='text-xs text-white/70 mt-2'>
          Join our club to pitch hardware concepts, get laboratory workspace access, and collaborate with student engineers.
        </p>
        <Link
          to='/join'
          className='inline-block mt-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all'
        >
          Join Our Team to Build
        </Link>
      </div>
    </div>
  );
}
