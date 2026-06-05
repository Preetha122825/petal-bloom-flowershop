import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../redux/orderSlice';
import { clearLocal } from '../redux/cartSlice';

const EMOJIS = { Roses:'🌹', Lilies:'🌷', Tulips:'🌺', Bouquets:'💐', Wedding:'👰', 'Indoor Plants':'🌿' };

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(s => s.cart);
  const { loading } = useSelector(s => s.orders);
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', street:'', city:'Chennai', state:'Tamil Nadu', pincode:'', payment:'cod' });
  const [confirmed, setConfirmed] = useState(null);

  const subtotal  = items.reduce((s,i) => s + i.price*(i.quantity||1), 0);
  const shipping  = subtotal > 4250 ? 0 : 510;
  const total     = subtotal + shipping;

  if (items.length === 0 && !confirmed) return (
    <div style={{ paddingTop:'var(--nav-h)', minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
      <div style={{ fontSize:64 }}>🛒</div>
      <h2 style={{ fontFamily:'var(--ff-display)', fontSize:26 }}>Nothing to checkout</h2>
      <Link to="/shop" className="btn-primary" style={{ textDecoration:'none' }}>Shop Flowers</Link>
    </div>
  );

  const handleConfirm = async () => {
    if (!form.name || !form.email || !form.street) { toast.error('Please fill all required fields'); return; }
    const orderData = {
      items: items.map(i => ({ product:i._id, name:i.name, image:'', price:i.price, quantity:i.quantity||1 })),
      shippingAddress: { name:form.name, street:form.street, city:form.city, state:form.state, pincode:form.pincode, phone:form.phone },
      paymentMethod:   form.payment,
      itemsPrice:      subtotal,
      shippingPrice:   shipping,
      totalPrice:      total,
    };
    const res = await dispatch(createOrder(orderData));
    if (res.meta.requestStatus === 'fulfilled') {
      dispatch(clearLocal());
      setConfirmed(res.payload);
      setStep(3);
    } else {
      toast.error('Order failed. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>
      <div style={{ background:'var(--blush)', padding:'28px 24px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
          <h1 style={{ fontFamily:'var(--ff-display)', fontSize:34, fontWeight:400 }}>Checkout</h1>
          {step < 3 && (
            <div style={{ display:'flex', gap:0, marginTop:14, maxWidth:360 }}>
              {['Delivery','Payment','Done'].map((s,i) => (
                <div key={s} style={{ flex:1, textAlign:'center' }}>
                  <div style={{ width:26,height:26,borderRadius:'50%',margin:'0 auto 5px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,
                    background: step>i+1 ? 'var(--sage)' : step===i+1 ? 'var(--rose)' : 'var(--border)', color:'#fff' }}>
                    {step>i+1 ? '✓' : i+1}
                  </div>
                  <div style={{ fontSize:11, fontWeight: step===i+1?600:400, color: step===i+1?'var(--rose)':'var(--warm-gray)' }}>{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'32px 24px', display:'grid', gridTemplateColumns: step===3 ? '1fr' : '1fr 300px', gap:28, alignItems:'start' }}>

        {/* Confirmed */}
        {step === 3 && (
          <div style={{ textAlign:'center', padding:'48px 24px' }}>
            <div style={{ fontSize:72, marginBottom:16 }}>🌸</div>
            <h2 style={{ fontFamily:'var(--ff-display)', fontSize:44, fontWeight:400, color:'var(--rose-dark)', marginBottom:10 }}>Order Confirmed!</h2>
            <p style={{ fontSize:16, color:'var(--warm-gray)', marginBottom:28 }}>Your flowers are being lovingly prepared and will reach you today.</p>
            <div className="card" style={{ maxWidth:400, margin:'0 auto 28px', padding:22 }}>
              <div style={{ fontSize:12, color:'var(--warm-gray)', marginBottom:6 }}>Order ID</div>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:22, color:'var(--rose-dark)', marginBottom:12 }}>
                #{confirmed?._id?.slice(-8).toUpperCase() || 'XXXXXXXX'}
              </div>
              <div style={{ display:'flex', gap:16, justifyContent:'center', fontSize:12, color:'var(--warm-gray)', flexWrap:'wrap' }}>
                <span>📍 Out for delivery</span><span>⏰ ETA: 3–5 PM</span><span>📞 Driver will call</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
              <Link to="/"           className="btn-primary" style={{ textDecoration:'none' }}>Continue Shopping</Link>
              <Link to="/dashboard/orders" className="btn-outline" style={{ textDecoration:'none' }}>View My Orders</Link>
            </div>
          </div>
        )}

        {/* Step 1 — Delivery */}
        {step === 1 && (
          <div className="card" style={{ padding:30 }}>
            <h3 style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:500, marginBottom:22 }}>Delivery Details</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[['name','Full Name *'],['email','Email Address *'],['phone','Phone Number']].map(([k,l]) => (
                <div key={k} className="form-group">
                  <label className="form-label">{l}</label>
                  <input value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} className="form-input" placeholder={l.replace(' *','')}/>
                </div>
              ))}
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Street Address *</label>
                <input value={form.street} onChange={e => setForm({...form,street:e.target.value})} className="form-input" placeholder="House No., Street Name"/>
              </div>
              {[['city','City'],['state','State'],['pincode','Pincode']].map(([k,l]) => (
                <div key={k} className="form-group">
                  <label className="form-label">{l}</label>
                  <input value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} className="form-input" placeholder={l}/>
                </div>
              ))}
            </div>
            <button onClick={() => { if(!form.name||!form.email||!form.street){toast.error('Please fill required fields');return;} setStep(2); }}
              className="btn-primary" style={{ marginTop:22, padding:'12px 28px' }}>Continue to Payment →</button>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="card" style={{ padding:30 }}>
            <h3 style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:500, marginBottom:22 }}>Payment Method</h3>
            <div style={{ display:'flex', gap:10, marginBottom:22 }}>
              {[['card','💳 Card'],['upi','📱 UPI'],['cod','🤝 Cash on Delivery']].map(([v,l]) => (
                <button key={v} onClick={() => setForm({...form,payment:v})} style={{ flex:1, padding:'11px 8px', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:500, transition:'all .18s',
                  border:   `2px solid ${form.payment===v ? 'var(--rose)' : 'var(--border)'}`,
                  background: form.payment===v ? 'var(--rose-light)' : '#fff',
                  color:      form.payment===v ? 'var(--rose)' : 'var(--charcoal)' }}>{l}</button>
              ))}
            </div>

            {form.payment === 'card' && (
              <div style={{ display:'grid', gap:14, marginBottom:6 }}>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="form-input" placeholder="1234 5678 9012 3456" maxLength={19}/>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input className="form-input" placeholder="MM / YY"/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <div style={{ position:'relative' }}>
                      <input type={showPw?'text':'password'} className="form-input" placeholder="•••" maxLength={4} style={{ paddingRight:40 }}/>
                      <button type="button" onClick={() => setShowPw(s=>!s)} style={{ position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:14,color:'var(--warm-gray)' }}>
                        {showPw?'🙈':'👁️'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {form.payment === 'upi' && (
              <div className="form-group" style={{ marginBottom:6 }}>
                <label className="form-label">UPI ID</label>
                <input className="form-input" placeholder="yourname@upi"/>
              </div>
            )}
            {form.payment === 'cod' && (
              <div style={{ background:'var(--gold-light)', borderRadius:10, padding:14, color:'#7A5A10', fontSize:13, marginBottom:6 }}>
                💵 Pay <strong>₹{total.toLocaleString()}</strong> in cash when your flowers arrive.
              </div>
            )}

            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              <button onClick={() => setStep(1)} className="btn-outline" style={{ padding:'12px 22px' }}>← Back</button>
              <button onClick={handleConfirm} className="btn-primary" style={{ flex:1, justifyContent:'center', padding:'12px' }} disabled={loading}>
                {loading ? 'Placing order...' : 'Confirm Order 🌸'}
              </button>
            </div>
          </div>
        )}

        {/* Order Summary (steps 1 & 2) */}
        {step < 3 && (
          <div className="card" style={{ padding:22, position:'sticky', top:'calc(var(--nav-h) + 16px)' }}>
            <h3 style={{ fontFamily:'var(--ff-display)', fontSize:18, fontWeight:500, marginBottom:14 }}>Your Order</h3>
            {items.map(item => (
              <div key={item._id} style={{ display:'flex', gap:10, alignItems:'center', marginBottom:10, paddingBottom:10, borderBottom:'1px solid var(--border)' }}>
                <div style={{ fontSize:24, background:'var(--blush)', width:38, height:38, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {EMOJIS[item.category]||'🌸'}
                </div>
                <div style={{ flex:1, fontSize:12 }}>
                  <div style={{ fontWeight:500, lineHeight:1.3 }}>{item.name}</div>
                  <div style={{ color:'var(--warm-gray)' }}>×{item.quantity||1}</div>
                </div>
                <div style={{ fontWeight:600, fontSize:13 }}>₹{(item.price*(item.quantity||1)).toLocaleString()}</div>
              </div>
            ))}
            {[['Subtotal',`₹${subtotal.toLocaleString()}`],['Shipping',shipping===0?'Free 🎉':`₹${shipping}`]].map(([l,v]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
                <span style={{ color:'var(--warm-gray)' }}>{l}</span>
                <span style={{ fontWeight:500, color: v.includes('Free')?'var(--sage)':'var(--charcoal)' }}>{v}</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--ff-display)', fontSize:18, paddingTop:10, borderTop:'1.5px solid var(--border)', marginTop:4 }}>
              <span>Total</span><span style={{ color:'var(--rose-dark)' }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
