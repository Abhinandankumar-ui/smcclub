import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  // RSVP Registration Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpForm, setRsvpForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    course: '',
    technicalDomain: 'Robotics'
  });
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);

  const tabs = ['All', 'Workshops', 'Competitions', 'Past Events'];

  const fetchEvents = () => {
    setLoading(true);
    axios.get('/api/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setRsvpSubmitting(true);
    setRsvpStatus(null);

    try {
      const res = await axios.post(`/api/events/${selectedEvent._id}/register`, rsvpForm);
      setRsvpStatus({
        type: 'success',
        message: res.data.message || 'Successfully registered for this event!'
      });
      // Refresh event count
      fetchEvents();
      // Reset form after short delay
      setTimeout(() => {
        setRsvpForm({
          fullName: '',
          email: '',
          phone: '',
          studentId: '',
          course: '',
          technicalDomain: 'Robotics'
        });
      }, 1500);
    } catch (err) {
      setRsvpStatus({
        type: 'error',
        message: err.response?.data?.error || 'Registration failed. Please try again.'
      });
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const filteredEvents = events.filter(e => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Workshops') return e.category === 'Workshop';
    if (activeTab === 'Competitions') return e.category === 'Competition';
    if (activeTab === 'Past Events') return e.category === 'Past' || e.status === 'Completed';
    return true;
  });

  const inputStyle = 'w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 text-xs transition-all';

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <span className='text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3.5 py-1 rounded-full border border-violet-500/20'>
          Events & Programs
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold mt-3 text-white'>
          Workshops & Competitions
        </h1>
        <p className='mt-3 text-white/70 text-sm sm:text-base leading-relaxed'>
          Participate in intensive technical bootcamps, hands-on hardware workshops, and national inter-college robotics hackathons.
        </p>
      </div>

      {/* Category Tabs */}
      <div className='flex flex-wrap items-center justify-center gap-2 mb-12'>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                : 'glass border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className='text-center py-16 text-white/60'>Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className='text-center py-16 glass rounded-2xl p-8 border border-white/10 max-w-md mx-auto'>
          <p className='text-lg font-bold text-white'>No events in this category yet.</p>
          <p className='text-xs text-white/60 mt-1'>Check back soon for new workshop announcements!</p>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 gap-8'>
          {filteredEvents.map(e => {
            const isCompleted = e.category === 'Past' || e.status === 'Completed';
            const seatsLeft = (e.maxSeats || 60) - (e.registeredCount || 0);

            return (
              <div
                key={e._id}
                className='glass rounded-3xl overflow-hidden border border-white/10 hover:border-violet-500/40 transition-all flex flex-col justify-between'
              >
                {e.image && (
                  <div className='relative h-48 w-full overflow-hidden bg-slate-900'>
                    <img src={e.image} alt={e.title} className='h-full w-full object-cover' />
                    <div className='absolute top-3 right-3 flex gap-2'>
                      <span className='px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur border border-white/20 text-white'>
                        {e.category || 'Workshop'}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isCompleted ? 'bg-white/10 text-white/60' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isCompleted ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                )}

                <div className='p-6 flex-1 flex flex-col justify-between'>
                  <div>
                    <h3 className='text-2xl font-bold text-white'>{e.title}</h3>
                    <div className='flex flex-wrap gap-4 text-xs text-cyan-300 mt-2 font-medium'>
                      <span>📅 {e.date} {e.time ? `• ${e.time}` : ''}</span>
                      {e.location && <span>📍 {e.location}</span>}
                    </div>
                    <p className='text-white/70 text-sm mt-4 leading-relaxed'>{e.description}</p>

                    {!isCompleted && (
                      <div className='mt-4 flex items-center gap-3 text-xs text-white/60'>
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10'>
                          👥 {e.registeredCount || 0} Registered
                        </span>
                        {seatsLeft > 0 ? (
                          <span className='text-emerald-400'>
                            • {seatsLeft} seats remaining
                          </span>
                        ) : (
                          <span className='text-amber-400'>
                            • Seats full (Waitlist active)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className='mt-6 pt-4 border-t border-white/10 flex items-center justify-between'>
                    <span className='text-xs text-white/50'>
                      {isCompleted ? 'Event concluded' : 'Open for student RSVP'}
                    </span>
                    {!isCompleted ? (
                      <button
                        onClick={() => {
                          setSelectedEvent(e);
                          setRsvpStatus(null);
                        }}
                        className='bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-violet-600/30'
                      >
                        ⚡ Register / RSVP →
                      </button>
                    ) : (
                      <span className='text-xs text-white/40 border border-white/10 px-3 py-1.5 rounded-xl'>
                        Archived
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RSVP MODAL */}
      {selectedEvent && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm'>
          <div className='glass p-6 sm:p-8 rounded-3xl border border-violet-500/30 max-w-lg w-full bg-slate-900/95 shadow-2xl relative'>
            <button
              onClick={() => setSelectedEvent(null)}
              className='absolute top-4 right-4 text-white/50 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-white/5 flex items-center justify-center'
            >
              ✕
            </button>

            <div className='mb-6'>
              <span className='text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20'>
                {selectedEvent.category} • Free Registration
              </span>
              <h3 className='text-xl font-bold text-white mt-2 leading-tight'>{selectedEvent.title}</h3>
              <p className='text-xs text-white/60 mt-1'>
                📅 {selectedEvent.date} {selectedEvent.time ? `• ${selectedEvent.time}` : ''} • 📍 {selectedEvent.location}
              </p>
            </div>

            {rsvpStatus && (
              <div className={`p-3.5 rounded-xl text-xs font-medium mb-4 ${
                rsvpStatus.type === 'success' 
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' 
                  : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
              }`}>
                {rsvpStatus.message}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className='space-y-3.5'>
              <div>
                <label className='block text-xs font-semibold text-white/70 mb-1'>Full Name *</label>
                <input
                  required
                  type='text'
                  placeholder='e.g. Aryan Sharma'
                  value={rsvpForm.fullName}
                  onChange={e => setRsvpForm({ ...rsvpForm, fullName: e.target.value })}
                  className={inputStyle}
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-semibold text-white/70 mb-1'>Email Address *</label>
                  <input
                    required
                    type='email'
                    placeholder='aryan@domain.com'
                    value={rsvpForm.email}
                    onChange={e => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-white/70 mb-1'>WhatsApp / Phone *</label>
                  <input
                    required
                    type='tel'
                    placeholder='+91 98765 43210'
                    value={rsvpForm.phone}
                    onChange={e => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-semibold text-white/70 mb-1'>Student ID / Roll No</label>
                  <input
                    type='text'
                    placeholder='e.g. 21BCE1024'
                    value={rsvpForm.studentId}
                    onChange={e => setRsvpForm({ ...rsvpForm, studentId: e.target.value })}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-white/70 mb-1'>Course / Branch</label>
                  <input
                    type='text'
                    placeholder='e.g. B.Tech ECE 3rd Year'
                    value={rsvpForm.course}
                    onChange={e => setRsvpForm({ ...rsvpForm, course: e.target.value })}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold text-white/70 mb-1'>Primary Technical Interest</label>
                <select
                  value={rsvpForm.technicalDomain}
                  onChange={e => setRsvpForm({ ...rsvpForm, technicalDomain: e.target.value })}
                  className={`${inputStyle} bg-slate-900`}
                >
                  <option>Robotics</option>
                  <option>IoT (Internet of Things)</option>
                  <option>Embedded Systems</option>
                  <option>AI/ML & Vision</option>
                  <option>Industrial Automation</option>
                  <option>Drones & UAVs</option>
                </select>
              </div>

              <div className='pt-2 flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setSelectedEvent(null)}
                  className='px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={rsvpSubmitting}
                  className='bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:opacity-95 transition-all shadow-md shadow-violet-600/30 disabled:opacity-50'
                >
                  {rsvpSubmitting ? 'Confirming...' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
