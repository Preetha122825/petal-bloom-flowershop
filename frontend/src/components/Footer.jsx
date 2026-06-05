import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background:'var(--charcoal)',color:'rgba(255,255,255,.65)',paddingTop:56 }}>
      <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'0 24px 40px',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:36 }}>
        <div>
          <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:14 }}>
            <span style={{ fontSize:24 }}>🌸</span>
            <span style={{ fontFamily:'var(--ff-display)',fontSize:20,color:'#fff' }}>Petal & Bloom</span>
          </div>
          <p style={{ fontSize:13,lineHeight:1.8,marginBottom:18 }}>Chennai's finest boutique flower shop. Crafting botanical beauty since 2018.</p>
          <div style={{ display:'flex',gap:10 }}>
            {['📘','📸','🐦','▶️'].map((e,i) => <div key={i} style={{ width:34,height:34,borderRadius:8,background:'rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:15 }}>{e}</div>)}
          </div>
        </div>
        {[
          { title:'Quick Links', links:[['Home','/'],['About','/about'],['Collection','/collection'],['Shop','/shop']] },
          { title:'Services',    links:[['Wedding Flowers','/collection'],['Custom Orders','/contact'],['Same-Day Delivery','/shop'],['Gift Wrapping','/shop']] },
          { title:'Support',     links:[['Contact Us','/contact'],['My Account','/dashboard'],['Track Order','/dashboard/orders'],['Admin Login','/admin/login']] },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 style={{ color:'#fff',fontFamily:'var(--ff-display)',fontSize:17,fontWeight:400,marginBottom:14 }}>{title}</h4>
            {links.map(([l, p]) => <Link key={p} to={p} style={{ display:'block',color:'rgba(255,255,255,.55)',fontSize:13,textDecoration:'none',padding:'3px 0',lineHeight:1.8 }}>{l}</Link>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,.1)',padding:'18px 24px',textAlign:'center',fontSize:12 }}>
        © 2025 Petal & Bloom, Pallavaram, Chennai. Made with 💝
      </div>
    </footer>
  );
}
