import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getHeader = () => ({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const [hero, setHero] = useState({
    badge: '',
    titlePrefix: '',
    titleHighlight: '',
    description: ''
  });

  const [stats, setStats] = useState([]);
  const [labInfo, setLabInfo] = useState({
    location: '',
    email: '',
    phone: '',
    timings: ''
  });

  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');

  useEffect(() => {
    axios.get('/api/settings')
      .then(res => {
        if (res.data) {
          setSettings(res.data);
          if (res.data.hero) setHero(res.data.hero);
          if (res.data.stats) setStats(res.data.stats);
          if (res.data.labInfo) setLabInfo(res.data.labInfo);
          if (res.data.mission) setMission(res.data.mission);
          if (res.data.vision) setVision(res.data.vision);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleStatChange = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      await axios.put('/api/settings', {
        hero,
        stats,
        labInfo,
        mission,
        vision
      }, { headers: getHeader() });

      setMsg('Club settings successfully updated! Homepage and About page will now reflect these changes.');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = 'w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 text-xs transition-all';

  if (loading) return <div className='p-8 text-center text-white/50'>Loading settings...</div>;

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Club Content & Settings</h1>
          <p className='text-xs text-white/60 mt-1'>Dynamically customize hero texts, statistics, lab info, and club vision.</p>
        </div>
        <Link to='/admin/dashboard' className='text-xs text-violet-400 hover:underline'>
          ← Back to Dashboard
        </Link>
      </div>

      {msg && (
        <div className='p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mt-4'>
          {msg}
        </div>
      )}

      <form onSubmit={handleSave} className='space-y-6 mt-6'>
        {/* Hero Section Configuration */}
        <div className='glass p-6 rounded-2xl border border-white/10 space-y-4'>
          <h2 className='text-base font-bold text-cyan-400 border-b border-white/10 pb-2'>
            1. Hero Banner Content
          </h2>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Welcome Tagline / Badge</label>
            <input
              value={hero.badge}
              onChange={e => setHero({ ...hero, badge: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div className='grid sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Title Prefix</label>
              <input
                value={hero.titlePrefix}
                onChange={e => setHero({ ...hero, titlePrefix: e.target.value })}
                className={inputStyle}
              />
            </div>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Title Gradient Highlight</label>
              <input
                value={hero.titleHighlight}
                onChange={e => setHero({ ...hero, titleHighlight: e.target.value })}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Hero Description</label>
            <textarea
              rows={2}
              value={hero.description}
              onChange={e => setHero({ ...hero, description: e.target.value })}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Club Statistics */}
        <div className='glass p-6 rounded-2xl border border-white/10 space-y-4'>
          <h2 className='text-base font-bold text-violet-400 border-b border-white/10 pb-2'>
            2. Homepage Numerical Statistics
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {stats.map((s, idx) => (
              <div key={idx} className='p-3 rounded-xl bg-white/5 border border-white/5 space-y-2'>
                <div>
                  <label className='block text-[10px] text-white/50 uppercase tracking-wider mb-1'>Number / Value</label>
                  <input
                    value={s.value}
                    onChange={e => handleStatChange(idx, 'value', e.target.value)}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className='block text-[10px] text-white/50 uppercase tracking-wider mb-1'>Label</label>
                  <input
                    value={s.label}
                    onChange={e => handleStatChange(idx, 'label', e.target.value)}
                    className={inputStyle}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className='glass p-6 rounded-2xl border border-white/10 space-y-4'>
          <h2 className='text-base font-bold text-emerald-400 border-b border-white/10 pb-2'>
            3. Mission & Vision Statements
          </h2>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Club Mission</label>
            <textarea
              rows={3}
              value={mission}
              onChange={e => setMission(e.target.value)}
              className={inputStyle}
            />
          </div>

          <div>
            <label className='block text-xs text-white/70 mb-1'>Club Vision</label>
            <textarea
              rows={3}
              value={vision}
              onChange={e => setVision(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Lab Info */}
        <div className='glass p-6 rounded-2xl border border-white/10 space-y-4'>
          <h2 className='text-base font-bold text-fuchsia-400 border-b border-white/10 pb-2'>
            4. Lab Information & Contact
          </h2>

          <div className='grid sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Physical Lab Location</label>
              <input
                value={labInfo.location}
                onChange={e => setLabInfo({ ...labInfo, location: e.target.value })}
                className={inputStyle}
              />
            </div>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Official Club Email</label>
              <input
                value={labInfo.email}
                onChange={e => setLabInfo({ ...labInfo, email: e.target.value })}
                className={inputStyle}
              />
            </div>
          </div>

          <div className='grid sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Lab Timings</label>
              <input
                value={labInfo.timings}
                onChange={e => setLabInfo({ ...labInfo, timings: e.target.value })}
                className={inputStyle}
              />
            </div>
            <div>
              <label className='block text-xs text-white/70 mb-1'>Contact Phone Number</label>
              <input
                value={labInfo.phone}
                onChange={e => setLabInfo({ ...labInfo, phone: e.target.value })}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        <button
          type='submit'
          disabled={saving}
          className='w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-violet-600/30 disabled:opacity-50'
        >
          {saving ? 'Saving Settings...' : 'Save All Club Changes 💾'}
        </button>
      </form>
    </div>
  );
}
