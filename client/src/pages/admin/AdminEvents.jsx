import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getHeader = () => ({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

export default function AdminEvents() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'Workshop',
    status: 'Upcoming',
    description: '',
    maxSeats: 60
  });
  const [file, setFile] = useState(null);

  const categories = ['Workshop', 'Competition', 'Event', 'Past'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed'];

  const load = () => {
    setLoading(true);
    axios.get('/api/events')
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
    if (file) fd.append('image', file);

    try {
      await axios.post('/api/events', fd, {
        headers: { ...getHeader(), 'Content-Type': 'multipart/form-data' }
      });
      setForm({
        title: '',
        date: '',
        time: '',
        location: '',
        category: 'Workshop',
        status: 'Upcoming',
        description: '',
        maxSeats: 60
      });
      setFile(null);
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create event');
    } finally {
      setSubmitting(false);
    }
  };

  const del = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`/api/events/${id}`, { headers: getHeader() });
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete event');
    }
  };

  const inputStyle = 'w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 text-xs transition-all';

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Events & Workshops</h1>
          <p className='text-xs text-white/60 mt-1'>Manage bootcamps, robotics hackathons, and guest seminars.</p>
        </div>
        <Link to='/admin/dashboard' className='text-xs text-violet-400 hover:underline'>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add Event Form */}
      <form onSubmit={submit} className='glass p-6 rounded-2xl border border-white/10 mt-6 space-y-4 bg-slate-900/50'>
        <h2 className='text-base font-bold text-white border-b border-white/10 pb-2'>
          ➕ Announce New Event / Workshop
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2'>
            <label className='block text-xs text-white/70 mb-1'>Event Title *</label>
            <input
              required
              placeholder='e.g. ROS2 Nav2 Hands-on Autonomous Driving Bootcamp'
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className={`${inputStyle} bg-slate-900`}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <label className='block text-xs text-white/70 mb-1'>Date *</label>
            <input
              required
              type='text'
              placeholder='e.g. Oct 24, 2024'
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Time</label>
            <input
              placeholder='e.g. 10:00 AM - 4:00 PM'
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Location</label>
            <input
              placeholder='e.g. Lab 304, Tech Block'
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Status</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className={`${inputStyle} bg-slate-900`}
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className='block text-xs text-white/70 mb-1'>Description</label>
          <textarea
            rows={2}
            placeholder='Topics covered, hardware kits provided, prerequisites...'
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className={inputStyle}
          />
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4 pt-2'>
          <div className='flex items-center gap-4'>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Event Banner / Poster</label>
              <input
                type='file'
                accept='image/*'
                onChange={e => setFile(e.target.files[0])}
                className='text-xs text-white/60'
              />
            </div>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Seat Capacity</label>
              <input
                type='number'
                value={form.maxSeats}
                onChange={e => setForm({ ...form, maxSeats: e.target.value })}
                className='w-24 p-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={submitting}
            className='bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-violet-600/30'
          >
            {submitting ? 'Publishing...' : 'Publish Event'}
          </button>
        </div>
      </form>

      {/* Events List */}
      <div className='mt-8'>
        <h2 className='text-lg font-bold text-white mb-4'>Scheduled Programs ({list.length})</h2>
        {loading ? (
          <div className='text-center py-8 text-white/50'>Loading events...</div>
        ) : list.length === 0 ? (
          <div className='text-center py-8 glass rounded-xl text-white/50 text-sm'>No events created yet.</div>
        ) : (
          <div className='space-y-3'>
            {list.map(e => (
              <div key={e._id} className='glass p-4 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                  {e.image && (
                    <img src={e.image} alt={e.title} className='w-16 h-12 object-cover rounded-lg border border-white/10 shrink-0' />
                  )}
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-bold text-white text-sm'>{e.title}</h3>
                      <span className='text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold'>
                        {e.category}
                      </span>
                      <span className='text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70'>
                        {e.status}
                      </span>
                    </div>
                    <p className='text-xs text-white/60 mt-1'>
                      📅 {e.date} {e.time ? `• ${e.time}` : ''} • 📍 {e.location || 'Robotics Lab'} • 👥 {e.registeredCount || 0} / {e.maxSeats || 60} Attendees
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 self-end md:self-center'>
                  <button
                    onClick={() => del(e._id)}
                    className='text-xs text-rose-400 hover:text-white px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 transition-all'
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
