import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg,var(--cream),var(--blush))', padding:'52px 24px', textAlign:'center', borderBottom:'1px solid var(--border)' }}>
        <div className="section-label">✦ Get In Touch</div>
        <h1 className="section-title" style={{ textAlign:'center' }}>We'd Love to Hear From You</h1>
        <p style={{ color:'var(--warm-gray)', fontSize:15, marginTop:12, maxWidth:500, margin:'12px auto 0' }}>
          Whether it's a custom order, wedding inquiry, or just to say hello — our petals are always open.
        </p>
      </section>

      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'56px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
        {/* Contact Form */}
        <div className="card" style={{ padding:36 }}>
          <h2 style={{ fontFamily:'var(--ff-display)', fontSize:26, fontWeight:400, marginBottom:24 }}>Send a Message</h2>
          {sent && (
            <div style={{ background:'var(--sage-light)', borderRadius:10, padding:'12px 16px', marginBottom:20, color:'#3A6B3E', fontWeight:500, fontSize:14 }}>
              ✅ Message sent! We'll respond within 2 hours.
            </div>
          )}
          <form onSubmit={handle} style={{ display:'grid', gap:16 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="form-input" placeholder="Priya Sharma" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="form-input" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} className="form-input">
                <option value="">Select a subject</option>
                {['Wedding Inquiry','Custom Order','Delivery Question','Bulk Order','Feedback','Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} rows={5} className="form-input" placeholder="Tell us how we can help..." required style={{ resize:'vertical' }}/>
            </div>
            <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:15 }}>
              Send Message 🌸
            </button>
          </form>
        </div>

        {/* Info */}
        <div>
          <h2 style={{ fontFamily:'var(--ff-display)', fontSize:26, fontWeight:400, marginBottom:24 }}>Visit Our Studio</h2>

          {[
            { icon:'📍', title:'Address',  lines:['42, Flower Market Street', 'Pallavaram, Chennai – 600043', 'Tamil Nadu, India'] },
            { icon:'📞', title:'Phone',    lines:['+91 98765 43210', '+91 44 2234 5678'] },
            { icon:'✉️', title:'Email',    lines:['hello@petalandbloom.in', 'orders@petalandbloom.in'] },
            { icon:'🕐', title:'Hours',    lines:['Mon – Sat: 8 AM – 9 PM', 'Sunday: 9 AM – 6 PM', 'Same-day orders close at 2 PM'] },
          ].map(({ icon, title, lines }) => (
            <div key={title} style={{ display:'flex', gap:14, marginBottom:24 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:'var(--rose-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:4 }}>{title}</div>
                {lines.map(l => <div key={l} style={{ fontSize:13, color:'var(--warm-gray)', lineHeight:1.7 }}>{l}</div>)}
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div style={{ borderRadius:16, overflow:'hidden', height:210, background:'linear-gradient(135deg,var(--blush),var(--rose-light))', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', border:'1px solid var(--border)', marginBottom:24 }}>
            <div style={{ fontSize:44, marginBottom:10 }}>🗺️</div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:18 }}>Pallavaram, Chennai</div>
            <div style={{ fontSize:12, color:'var(--warm-gray)', marginTop:4 }}>42, Flower Market Street</div>
          </div>

          {/* Social */}
          <div>
            <div style={{ fontSize:11, fontWeight:600, marginBottom:10, color:'var(--warm-gray)', letterSpacing:1, textTransform:'uppercase' }}>Follow Us</div>
            <div style={{ display:'flex', gap:10 }}>
              {[['📘','Facebook'],['📸','Instagram'],['🐦','Twitter'],['▶️','YouTube']].map(([e,n]) => (
                <button key={n} title={n} style={{ width:42, height:42, borderRadius:10, border:'1.5px solid var(--border)', background:'#fff', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .18s' }}
                  onMouseEnter={ev => ev.currentTarget.style.background='var(--rose-light)'}
                  onMouseLeave={ev => ev.currentTarget.style.background='#fff'}>{e}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section style={{ background:'var(--charcoal)', padding:'52px 24px', textAlign:'center' }}>
        <h2 style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:400, color:'#fff', marginBottom:12 }}>Need Flowers Today?</h2>
        <p style={{ color:'rgba(255,255,255,.65)', fontSize:14, marginBottom:24 }}>Order before 2 PM for same-day delivery across Chennai.</p>
        <a href="/shop" className="btn-primary" style={{ textDecoration:'none' }}>Shop Now 🌸</a>
      </section>
    </div>
  );
}
