import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='border-t border-white/10 bg-slate-950/80 mt-20 pt-12 pb-8 px-6 text-white/70'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
        <div className='space-y-3'>
          <div className='flex items-center gap-2.5 font-black text-xl text-white'>
            <span className='w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-sm'>
              🤖
            </span>
            ROBO-IOT CLUB
          </div>
          <p className='text-sm text-white/60 leading-relaxed'>
            Empowering students in Robotics, Internet of Things, Embedded Systems, Edge AI, and Autonomous Systems through hands-on development and national competitions.
          </p>
          <div className='flex gap-3 text-lg text-white/60 pt-2'>
            <a href='https://github.com' target='_blank' rel='noreferrer' className='hover:text-cyan-400 transition-colors'>GitHub</a>
            <a href='https://linkedin.com' target='_blank' rel='noreferrer' className='hover:text-cyan-400 transition-colors'>LinkedIn</a>
            <a href='https://instagram.com' target='_blank' rel='noreferrer' className='hover:text-cyan-400 transition-colors'>Instagram</a>
          </div>
        </div>

        <div>
          <h4 className='font-bold text-white mb-3 text-sm uppercase tracking-wider'>Navigation</h4>
          <ul className='space-y-2 text-sm'>
            <li><Link to='/' className='hover:text-white transition-colors'>Home</Link></li>
            <li><Link to='/about' className='hover:text-white transition-colors'>About Us & Domains</Link></li>
            <li><Link to='/projects' className='hover:text-white transition-colors'>Projects Showcase</Link></li>
            <li><Link to='/events' className='hover:text-white transition-colors'>Events & Workshops</Link></li>
            <li><Link to='/team' className='hover:text-white transition-colors'>Club Team</Link></li>
          </ul>
        </div>

        <div>
          <h4 className='font-bold text-white mb-3 text-sm uppercase tracking-wider'>Club Domains</h4>
          <ul className='space-y-2 text-sm'>
            <li><span className='text-cyan-400'>•</span> Robotics & ROS2</li>
            <li><span className='text-violet-400'>•</span> IoT & Wireless Telemetry</li>
            <li><span className='text-amber-400'>•</span> Embedded Systems & PCB</li>
            <li><span className='text-emerald-400'>•</span> Edge AI & Machine Learning</li>
            <li><span className='text-fuchsia-400'>•</span> Industrial Automation</li>
            <li><span className='text-rose-400'>•</span> Drones & Computer Vision</li>
          </ul>
        </div>

        <div>
          <h4 className='font-bold text-white mb-3 text-sm uppercase tracking-wider'>Lab & Contact</h4>
          <p className='text-sm text-white/60'>
            Innovation & Robotics Center<br />
            Engineering Block 3, 2nd Floor<br />
            contact@robo-iotclub.edu
          </p>
          <Link
            to='/join'
            className='inline-block mt-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all'
          >
            Apply to Join →
          </Link>
        </div>
      </div>

      <div className='max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40'>
        <p>© {new Date().getFullYear()} Robo-IoT Student Club. Built for innovation & technology.</p>
        <div className='flex gap-4'>
          <Link to='/contact' className='hover:text-white'>Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
