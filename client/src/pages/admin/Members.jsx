import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getHeader = () => ({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

export default function Members() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    technicalDomain: 'Robotics',
    email: '',
    bio: '',
    isLead: false
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const domains = ['Robotics', 'IoT', 'Embedded Systems', 'AI/ML', 'Automation', 'Drone/CV', 'Core Team'];

  const load = () => {
    setLoading(true);
    axios.get('/api/members')
      .then(r => {
        setList(r.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('photo', file);

    try {
      await axios.post('/api/members', fd, {
        headers: { ...getHeader(), 'Content-Type': 'multipart/form-data' }
      });
      setForm({
        name: '',
        designation: '',
        technicalDomain: 'Robotics',
        email: '',
        bio: '',
        isLead: false
      });
      setFile(null);
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add member');
    } finally {
      setSubmitting(false);
    }
  };

  const del = async (id) => {
    if (!confirm('Remove this member?')) return;
    try {
      await axios.delete(`/api/members/${id}`, { headers: getHeader() });
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete member');
    }
  };

  const inputStyle = 'w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 text-xs transition-all';

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Team & Core Members</h1>
          <p className='text-xs text-white/60 mt-1'>Manage leadership leads and active club hardware engineers.</p>
        </div>
        <Link to='/admin/dashboard' className='text-xs text-violet-400 hover:underline'>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add Member Form */}
      <form onSubmit={submit} className='glass p-6 rounded-2xl border border-white/10 mt-6 space-y-4 bg-slate-900/50'>
        <h2 className='text-base font-bold text-white border-b border-white/10 pb-2'>
          ➕ Add New Team Member
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div>
            <label className='block text-xs text-white/70 mb-1'>Full Name *</label>
            <input
              required
              placeholder='e.g. Aarav Sharma'
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Designation / Role *</label>
            <input
              required
              placeholder='e.g. Robotics Lead / Embedded Dev'
              value={form.designation}
              onChange={e => setForm({ ...form, designation: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Technical Domain</label>
            <select
              value={form.technicalDomain}
              onChange={e => setForm({ ...form, technicalDomain: e.target.value })}
              className={`${inputStyle} bg-slate-900`}
            >
              {domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-xs text-white/70 mb-1'>Email</label>
            <input
              type='email'
              placeholder='aarav@club.edu'
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Bio</label>
            <input
              placeholder='Brief technical highlight or interests'
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              className={inputStyle}
            />
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4 pt-2'>
          <div className='flex items-center gap-4'>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Member Photo</label>
              <input
                type='file'
                accept='image/*'
                onChange={e => setFile(e.target.files[0])}
                className='text-xs text-white/60'
              />
            </div>
            <label className='flex items-center gap-2 text-xs text-white/80 cursor-pointer mt-4'>
              <input
                type='checkbox'
                checked={form.isLead}
                onChange={e => setForm({ ...form, isLead: e.target.checked })}
                className='rounded accent-violet-600'
              />
              👑 Club Lead / Core Officer
            </label>
          </div>

          <button
            type='submit'
            disabled={submitting}
            className='bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-violet-600/30'
          >
            {submitting ? 'Adding...' : 'Add Team Member'}
          </button>
        </div>
      </form>

      {/* Members Grid */}
      <div className='mt-8'>
        <h2 className='text-lg font-bold text-white mb-4'>Team Roster ({list.length})</h2>
        {loading ? (
          <div className='text-center py-8 text-white/50'>Loading members...</div>
        ) : list.length === 0 ? (
          <div className='text-center py-8 glass rounded-xl text-white/50 text-sm'>No members added yet.</div>
        ) : (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {list.map(m => (
              <div key={m._id} className='glass p-5 rounded-2xl border border-white/10 flex items-start gap-4'>
                <div className='w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-white/20 shrink-0'>
                  <img
                    src={m.photo?.startsWith('http') ? m.photo : (m.photo ? `http://localhost:5000${m.photo}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')}
                    alt={m.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-1.5'>
                    <h3 className='font-bold text-white text-sm truncate'>{m.name}</h3>
                    {m.isLead && <span className='text-[10px] text-amber-400 font-bold'>👑</span>}
                  </div>
                  <p className='text-xs text-violet-400 font-medium truncate'>{m.designation}</p>
                  <span className='text-[10px] uppercase font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full inline-block mt-1'>
                    {m.technicalDomain}
                  </span>
                  <div className='mt-3 flex justify-end'>
                    <button
                      onClick={() => del(m._id)}
                      className='text-xs text-rose-400 hover:text-white px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-600 transition-all'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
