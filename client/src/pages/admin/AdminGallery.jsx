import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getHeader = () => ({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

export default function AdminGallery() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workshops');

  const categories = [
    'Workshops',
    'Competitions',
    'Project Demonstrations',
    'Club Activities'
  ];

  const load = () => {
    setLoading(true);
    axios.get('/api/gallery')
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

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a photo to upload');

    setSubmitting(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', title || 'Club Moment');
    fd.append('category', category);

    try {
      await axios.post('/api/gallery', fd, {
        headers: { ...getHeader(), 'Content-Type': 'multipart/form-data' }
      });
      setTitle('');
      setFile(null);
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setSubmitting(false);
    }
  };

  const del = async (id) => {
    if (!confirm('Delete this photo from the gallery?')) return;
    try {
      await axios.delete(`/api/gallery/${id}`, { headers: getHeader() });
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete photo');
    }
  };

  const inputStyle = 'p-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 text-xs transition-all';

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Visual Gallery</h1>
          <p className='text-xs text-white/60 mt-1'>Upload laboratory moments, competition medals, and workshop captures.</p>
        </div>
        <Link to='/admin/dashboard' className='text-xs text-violet-400 hover:underline'>
          ← Back to Dashboard
        </Link>
      </div>

      {/* Upload Form */}
      <form onSubmit={upload} className='glass p-6 rounded-2xl border border-white/10 mt-6 flex flex-wrap items-end gap-4 bg-slate-900/50'>
        <div className='flex-1 min-w-[200px]'>
          <label className='block text-xs text-white/70 mb-1'>Caption / Title</label>
          <input
            placeholder='e.g. RoboSoccer Championship Finals 2024'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`${inputStyle} w-full`}
          />
        </div>

        <div className='min-w-[180px]'>
          <label className='block text-xs text-white/70 mb-1'>Gallery Track</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={`${inputStyle} w-full bg-slate-900`}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className='min-w-[200px]'>
          <label className='block text-xs text-white/70 mb-1'>Select Image File *</label>
          <input
            type='file'
            accept='image/*'
            required
            onChange={e => setFile(e.target.files[0])}
            className='text-xs text-white/60'
          />
        </div>

        <button
          type='submit'
          disabled={submitting}
          className='bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-violet-600/30'
        >
          {submitting ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>

      {/* Gallery Grid */}
      <div className='mt-8'>
        <h2 className='text-lg font-bold text-white mb-4'>Gallery Collection ({list.length})</h2>
        {loading ? (
          <div className='text-center py-8 text-white/50'>Loading gallery...</div>
        ) : list.length === 0 ? (
          <div className='text-center py-8 glass rounded-xl text-white/50 text-sm'>No photos uploaded yet.</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {list.map(g => {
              const imgSrc = g.image?.startsWith('http') ? g.image : `http://localhost:5000${g.image}`;
              return (
                <div key={g._id} className='relative group rounded-xl overflow-hidden glass border border-white/10 aspect-[4/3] bg-slate-900'>
                  <img src={imgSrc} alt={g.title} className='h-full w-full object-cover group-hover:scale-105 transition-all' />
                  <div className='absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-between p-3 opacity-90 group-hover:opacity-100 transition-opacity'>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => del(g._id)}
                        className='bg-rose-600/90 hover:bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg transition-all shadow'
                      >
                        ✕ Delete
                      </button>
                    </div>
                    <div>
                      <span className='text-[9px] font-bold uppercase tracking-wider text-cyan-400'>
                        {g.category}
                      </span>
                      <p className='text-xs font-semibold text-white truncate'>{g.title}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
