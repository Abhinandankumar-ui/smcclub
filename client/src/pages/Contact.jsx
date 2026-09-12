import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [labInfo, setLabInfo] = useState(null);

  useEffect(() => {
    axios.get('/api/settings').then(res => {
      if (res.data?.labInfo) {
        setLabInfo(res.data.labInfo);
      }
    }).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await axios.post('/api/contact', form);
      setMsg('Thank you! Your message has been sent to the club leads.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = 'w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 text-sm transition-all';

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <span className='text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20'>
          Get In Touch
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold mt-3 text-white'>
          Contact Robo-IoT Club
        </h1>
        <p className='mt-3 text-white/70 text-sm sm:text-base leading-relaxed'>
          Have a question about upcoming workshops, hardware sponsorship, or collaborative research? Drop us a line!
        </p>
      </div>

      <div className='grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start'>
        {/* Contact Info Card */}
        <div className='space-y-6'>
          <div className='glass p-8 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/20 to-slate-900/40'>
            <h2 className='text-2xl font-bold text-white mb-4'>Innovation Laboratory</h2>
            
            <div className='space-y-4 text-sm text-white/80'>
              <div className='flex items-start gap-3'>
                <span className='text-xl'>📍</span>
                <div>
                  <p className='font-bold text-white'>Lab Location</p>
                  <p className='text-white/60 text-xs mt-0.5'>
                    {labInfo?.location || 'Robotics & IoT R&D Lab, Room 304, Engineering Tech Block'}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <span className='text-xl'>📧</span>
                <div>
                  <p className='font-bold text-white'>Official Email</p>
                  <p className='text-white/60 text-xs mt-0.5'>{labInfo?.email || 'robo-iot@university.edu'}</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <span className='text-xl'>📞</span>
                <div>
                  <p className='font-bold text-white'>Contact Phone</p>
                  <p className='text-white/60 text-xs mt-0.5'>{labInfo?.phone || '+91 98765 43210'}</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <span className='text-xl'>🕒</span>
                <div>
                  <p className='font-bold text-white'>Lab Timings</p>
                  <p className='text-white/60 text-xs mt-0.5'>
                    {labInfo?.timings || 'Monday – Saturday: 9:00 AM – 7:00 PM (Project sprints open 24/7)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='glass p-6 rounded-3xl border border-white/10'>
            <h3 className='font-bold text-white text-base mb-2'>Interested in joining as a core member?</h3>
            <p className='text-xs text-white/60 leading-relaxed'>
              Don't use this general inquiry form for membership applications! Use our dedicated, frictionless form where you can submit your technical domains and photo directly.
            </p>
            <a
              href='/join'
              className='inline-block mt-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all'
            >
              ⭐ Go to Join Our Team Form →
            </a>
          </div>
        </div>

        {/* Form */}
        <div className='glass p-8 rounded-3xl border border-white/10'>
          <h3 className='text-xl font-bold text-white mb-6'>Send an Enquiry</h3>
          <form onSubmit={submit} className='space-y-4'>
            <div>
              <label className='block text-xs font-semibold text-white/70 mb-1'>Your Name *</label>
              <input
                required
                placeholder='e.g. Rahul Sharma'
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={inputStyle}
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-white/70 mb-1'>Email *</label>
                <input
                  type='email'
                  required
                  placeholder='rahul@example.com'
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className='block text-xs font-semibold text-white/70 mb-1'>Phone Number</label>
                <input
                  placeholder='+91 9876543210'
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-white/70 mb-1'>Message / Query *</label>
              <textarea
                required
                rows='4'
                placeholder='Tell us how we can help you...'
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className={inputStyle}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-600/30 text-sm'
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>

            {msg && (
              <div className={`p-3 rounded-xl text-center text-xs font-semibold ${
                msg.includes('sent') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
