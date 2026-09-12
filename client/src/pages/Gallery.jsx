import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Workshops',
    'Competitions',
    'Project Demonstrations',
    'Club Activities'
  ];

  useEffect(() => {
    axios.get('/api/gallery')
      .then(res => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredImages = images.filter(img => {
    if (activeCategory === 'All') return true;
    return img.category === activeCategory;
  });

  return (
    <div className='max-w-7xl mx-auto px-6 py-12'>
      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <span className='text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3.5 py-1 rounded-full border border-violet-500/20'>
          Visual Moments
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold mt-3 text-white'>
          Robo-IoT Club Gallery
        </h1>
        <p className='mt-3 text-white/70 text-sm sm:text-base leading-relaxed'>
          A snapshot of our intensive workshops, hackathon victories, robotic demonstrations, and laboratory building sessions.
        </p>
      </div>

      {/* Category Tabs */}
      <div className='flex flex-wrap items-center justify-center gap-2 mb-12'>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'glass border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className='text-center py-16 text-white/60'>Loading gallery photos...</div>
      ) : filteredImages.length === 0 ? (
        <div className='text-center py-16 glass rounded-2xl p-8 border border-white/10 max-w-md mx-auto'>
          <p className='text-lg font-bold text-white'>No photos uploaded for this category yet.</p>
          <p className='text-xs text-white/60 mt-1'>Check back soon for new club updates!</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredImages.map(img => {
            const imgSrc = img.image?.startsWith('http')
              ? img.image
              : `http://localhost:5000${img.image}`;

            return (
              <div
                key={img._id}
                className='group relative rounded-2xl overflow-hidden glass border border-white/10 aspect-[4/3] bg-slate-900'
              >
                <img
                  src={imgSrc}
                  alt={img.title || 'Robo-IoT Club'}
                  className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5'>
                  <span className='text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1'>
                    {img.category || 'Club Moment'}
                  </span>
                  <p className='text-sm font-bold text-white'>{img.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
