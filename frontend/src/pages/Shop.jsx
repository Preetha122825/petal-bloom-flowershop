import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All','Roses','Lilies','Tulips','Bouquets','Wedding','Indoor Plants'];

export default function ShopPage() {
  const dispatch = useDispatch();
  const { items, loading, pages, filters } = useSelector(s => s.products);

  useEffect(() => { dispatch(fetchProducts(filters)); }, [dispatch, filters]);

  const update = (key, val) => dispatch(setFilters({ [key]: val }));

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>
      <div style={{ background:'var(--blush)',padding:'28px 24px',borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'var(--max-w)',margin:'0 auto' }}>
          <h1 style={{ fontFamily:'var(--ff-display)',fontSize:36,fontWeight:400 }}>🌸 Flower Shop</h1>
        </div>
      </div>
      <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'28px 24px',display:'grid',gridTemplateColumns:'220px 1fr',gap:28 }}>
        <aside>
          <div className="card" style={{ padding:20,position:'sticky',top:'calc(var(--nav-h) + 16px)' }}>
            <h3 style={{ fontFamily:'var(--ff-display)',fontSize:18,fontWeight:500,marginBottom:16 }}>Filters</h3>
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:11,fontWeight:600,letterSpacing:1,textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:8 }}>Search</div>
              <input value={filters.search} onChange={e => update('search', e.target.value)} placeholder="Search flowers..." className="form-input"/>
            </div>
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:11,fontWeight:600,letterSpacing:1,textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:8 }}>Category</div>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => update('category', c)} style={{ display:'flex',justifyContent:'space-between',width:'100%',padding:'7px 10px',borderRadius:7,border:'none',cursor:'pointer',
                  background: filters.category===c ? 'var(--rose-light)' : 'none',
                  color: filters.category===c ? 'var(--rose)' : 'var(--charcoal)',
                  fontWeight: filters.category===c ? 600 : 400, fontSize:13, marginBottom:2, textAlign:'left' }}>{c}</button>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11,fontWeight:600,letterSpacing:1,textTransform:'uppercase',color:'var(--warm-gray)',marginBottom:8 }}>Max Price: ₹{(filters.maxPrice||15000).toLocaleString()}</div>
              <input type="range" min="2000" max="15000" step="500" value={filters.maxPrice||15000} onChange={e => update('maxPrice', Number(e.target.value))} style={{ width:'100%',accentColor:'var(--rose)' }}/>
            </div>
            <button onClick={() => dispatch(setFilters({ category:'All', search:'', maxPrice:15000, sort:'featured', page:1 }))} className="btn-ghost" style={{ width:'100%',justifyContent:'center',fontSize:12 }}>Clear Filters</button>
          </div>
        </aside>
        <div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
            <span style={{ fontSize:13,color:'var(--warm-gray)' }}>{items.length} products</span>
            <select value={filters.sort} onChange={e => update('sort', e.target.value)} className="form-input" style={{ width:'auto',padding:'7px 14px',fontSize:13 }}>
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low→High</option>
              <option value="price-desc">Price: High→Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          {loading ? <div className="spinner" style={{ marginTop:60 }}/> : items.length === 0 ? (
            <div style={{ textAlign:'center',padding:'48px 0',color:'var(--warm-gray)' }}>
              <div style={{ fontSize:52,marginBottom:12 }}>🔍</div>
              <h3 style={{ fontFamily:'var(--ff-display)',fontSize:22 }}>No flowers found</h3>
            </div>
          ) : (
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:16 }}>
              {items.map(p => <ProductCard key={p._id} product={p}/>)}
            </div>
          )}
          {pages > 1 && (
            <div style={{ display:'flex',justifyContent:'center',gap:6,marginTop:32 }}>
              {Array.from({ length:pages }, (_, i) => (
                <button key={i} onClick={() => update('page', i+1)} style={{ width:36,height:36,borderRadius:8,border:'1.5px solid var(--border)',
                  background: (filters.page||1)===i+1 ? 'var(--rose)' : '#fff',
                  color: (filters.page||1)===i+1 ? '#fff' : 'var(--charcoal)', cursor:'pointer', fontWeight:600, fontSize:13 }}>{i+1}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
