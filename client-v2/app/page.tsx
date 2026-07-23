import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--dark)' }}>
      <div className="home-container" style={{ textAlign: 'center', padding: '40px', background: 'var(--dark-card)', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <Link href="/" className="logo" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>
          <i className="fas fa-utensils"></i> Tasty <span style={{ color: 'var(--text-main)' }}>Bites</span>
        </Link>
        <h1 style={{ marginTop: '20px', color: 'var(--text-main)' }}>Welcome to Tasty Bites</h1>
        <p style={{ marginTop: '10px', color: 'var(--text-main)' }}>Your one‑stop destination for delicious food from your favorite restaurants.</p>
        
        <div className="nav-links" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link href="/customer" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
            Customer Portal
          </Link>
          <Link href="/delivery" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
            Delivery Dashboard
          </Link>
          <Link href="/restaurant" style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, display: 'inline-block' }}>
            Restaurant Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
