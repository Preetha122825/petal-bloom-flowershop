import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSelector(s => s.auth);
  const cartCount = useSelector(s => s.cart.items.reduce((a, i) => a + (i.quantity || 1), 0));
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [['Home','/'],['About','/about'],['Collection','/collection'],['Shop','/shop'],['Contact','/contact']];

  return (
    <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:1000,height:'var(--nav-h)',display:'flex',alignItems:'center',
      background: scrolled ? 'rgba(253,248,245,.97)' : 'rgba(253,248,245,.85)',
      backdropFilter:'blur(16px)', boxShadow: scrolled ? 'var(--shadow)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none', transition:'all .28s' }}>
      <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'0 24px',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <Link to="/" style={{ display:'flex',alignItems:'center',gap:8,textDecoration:'none' }}>
          <span style={{ fontSize:24 }}>🌸</span>
          <div>
            <div style={{ fontFamily:'var(--ff-display)',fontSize:18,color:'var(--rose-dark)',lineHeight:1 }}>Petal & Bloom</div>
            <div style={{ fontSize:9,letterSpacing:2,color:'var(--warm-gray)',textTransform:'uppercase' }}>Fine Floristry</div>
          </div>
        </Link>

        <div className="hide-mobile" style={{ display:'flex',gap:2 }}>
          {links.map(([l, p]) => (
            <Link key={p} to={p} style={{ padding:'7px 12px',borderRadius:8,fontSize:13,fontWeight:500,textDecoration:'none',
              color: pathname===p ? 'var(--rose)' : 'var(--charcoal)',
              background: pathname===p ? 'var(--rose-light)' : 'none', transition:'all .18s' }}>{l}</Link>
          ))}
        </div>

        <div style={{ display:'flex',alignItems:'center',gap:8 }}>
          <Link to="/cart" style={{ position:'relative',padding:'7px 12px',borderRadius:10,display:'flex',alignItems:'center',gap:5,textDecoration:'none',color:'var(--charcoal)',fontSize:13,fontWeight:500 }}>
            🛒 Cart
            {cartCount > 0 && <span style={{ position:'absolute',top:2,right:2,background:'var(--rose)',color:'#fff',borderRadius:'50%',width:16,height:16,fontSize:9,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700 }}>{cartCount}</span>}
          </Link>

          {user ? (
            <div style={{ position:'relative' }}>
              <button onClick={() => setProfileOpen(o => !o)} style={{ display:'flex',alignItems:'center',gap:7,padding:'5px 10px',borderRadius:10,border:'1.5px solid var(--border)',background:'#fff',fontWeight:500,fontSize:13 }}>
                <div style={{ width:26,height:26,borderRadius:'50%',background:'var(--rose)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700 }}>{user.name[0]}</div>
                {user.name.split(' ')[0]} ▾
              </button>
              {profileOpen && (
                <div style={{ position:'absolute',top:'calc(100% + 8px)',right:0,background:'#fff',borderRadius:12,boxShadow:'var(--shadow-lg)',border:'1px solid var(--border)',minWidth:170,overflow:'hidden',zIndex:200 }}>
                  {[['Dashboard','/dashboard'],['Orders','/dashboard/orders'],['Wishlist','/dashboard/wishlist']].map(([l, p]) => (
                    <Link key={p} to={p} onClick={() => setProfileOpen(false)} style={{ display:'block',padding:'11px 16px',textDecoration:'none',fontSize:13,color:'var(--charcoal)' }}>{l}</Link>
                  ))}
                  {user.role === 'admin' && <Link to="/admin" onClick={() => setProfileOpen(false)} style={{ display:'block',padding:'11px 16px',textDecoration:'none',fontSize:13,color:'var(--rose)',fontWeight:600 }}>⚙ Admin Panel</Link>}
                  <div style={{ borderTop:'1px solid var(--border)' }}/>
                  <button onClick={() => { dispatch(logout()); navigate('/'); setProfileOpen(false); }} style={{ width:'100%',padding:'11px 16px',textAlign:'left',fontSize:13,color:'var(--rose)',background:'none',border:'none',cursor:'pointer' }}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding:'8px 18px',textDecoration:'none' }}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
