"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from './CartProvider';
import Link from 'next/link';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  
  // Modals state
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  
  // Dropdowns state
  const [isDeliveryDropdownOpen, setIsDeliveryDropdownOpen] = useState(false);
  const [isSchedulePopoverOpen, setIsSchedulePopoverOpen] = useState(false);
  const [isCreditDropdownOpen, setIsCreditDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Data state
  const [deliveryTime, setDeliveryTime] = useState('Now');
  const [scheduleDatetime, setScheduleDatetime] = useState('');
  const [mainLoc, setMainLoc] = useState('Sector 4, 19th Main...');
  const [subLoc, setSubLoc] = useState('HSR Layout RK, Bengaluru');
  const [userName, setUserName] = useState('Sign In');
  const [searchQuery, setSearchQuery] = useState('');

  const creditBalance = 3000;

  const handleLocationSelect = (loc: string) => {
    const parts = loc.split(',');
    if (parts.length > 0) {
      setMainLoc(parts[0].trim());
      setSubLoc(parts.slice(1).join(',').trim());
    }
    setIsLocationOpen(false);
  };

  const handleScheduleConfirm = () => {
    if (!scheduleDatetime) {
      alert('Please choose a valid date and time.');
      return;
    }
    const dateObj = new Date(scheduleDatetime);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    setDeliveryTime(`${month} ${day}, ${hours}:${minutes} ${ampm}`);
    setIsSchedulePopoverOpen(false);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName('Guest'); // Mock sign-in
    setIsSignInOpen(false);
  };

  return (
    <>
      <header className="eatsure-header">
        <div className="header-top">
          <div className="header-left">
            <Link href="/" className="logo"><i className="fas fa-utensils"></i><span>Tasty Bites</span></Link>

            <div className="location-selector-btn" onClick={() => setIsLocationOpen(true)}>
              <i className="fas fa-map-marker-alt map-pin"></i>
              <div className="location-text">
                <span className="main-loc">{mainLoc}</span>
                <span className="sub-loc">{subLoc}</span>
              </div>
              <i className="fas fa-chevron-down arrow-down"></i>
            </div>

            <div className="delivery-toggle relative">
              <span className="toggle-btn delivery-active"><i className="fas fa-motorcycle"></i> Delivery</span>
              <span className="toggle-btn delivery-time" onClick={() => setIsDeliveryDropdownOpen(!isDeliveryDropdownOpen)}>
                {deliveryTime} <i className={`fas fa-chevron-down ${isDeliveryDropdownOpen ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }}></i>
              </span>
              
              {isDeliveryDropdownOpen && (
                <div className="time-dropdown-menu active">
                  <ul>
                    <li onClick={() => { setDeliveryTime('Now'); setIsDeliveryDropdownOpen(false); }}><i className="fas fa-shipping-fast"></i> Now</li>
                    <li onClick={() => { setDeliveryTime('In 30 mins'); setIsDeliveryDropdownOpen(false); }}><i className="far fa-clock"></i> In 30 mins</li>
                    <li onClick={() => { setDeliveryTime('In 1 hour'); setIsDeliveryDropdownOpen(false); }}><i className="far fa-clock"></i> In 1 hour</li>
                    <li onClick={() => { setIsDeliveryDropdownOpen(false); setIsSchedulePopoverOpen(true); }}><i className="far fa-calendar-alt"></i> Schedule Time & Date</li>
                  </ul>
                </div>
              )}

              {isSchedulePopoverOpen && (
                <div className="schedule-popover active" style={{ left: 'auto', right: 0 }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2f3542', marginBottom: '8px' }}>Select Date & Time</p>
                  <input type="datetime-local" value={scheduleDatetime} onChange={e => setScheduleDatetime(e.target.value)} style={{ width: '100%', padding: '8px', fontSize: '1.3rem', border: '1px solid #dfe4ea', borderRadius: '6px', outline: 'none', marginBottom: '10px' }} />
                  <button onClick={handleScheduleConfirm} className="btn0" style={{ width: '100%', fontSize: '1.3rem', padding: '8px 12px' }}>Confirm</button>
                  <button onClick={() => { setScheduleDatetime(''); setDeliveryTime('Now'); setIsSchedulePopoverOpen(false); }} className="btn0" style={{ width: '100%', marginTop: '8px', padding: '8px 12px', backgroundColor: '#747d8c', borderColor: '#747d8c', fontSize: '1.3rem' }}>Reset</button>
                </div>
              )}
            </div>

            <div className="delivery-toggle credit-toggle" style={{ marginLeft: '12px', position: 'relative' }}>
              <span className="toggle-btn" onClick={() => setIsCreditDropdownOpen(!isCreditDropdownOpen)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', cursor: 'pointer' }}>
                <i className="fas fa-wallet" style={{ fontSize: '1.5rem', color: '#2ed573' }}></i>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2f3542', textTransform: 'none' }}>Credits: <span style={{ color: '#2ed573' }}>₹{creditBalance}</span></span>
                <i className="fas fa-chevron-down" style={{ fontSize: '1rem', color: '#747d8c', marginLeft: '4px', transform: isCreditDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}></i>
              </span>

              {isCreditDropdownOpen && (
                <div className="credit-dropdown-menu" style={{ position: 'absolute', top: '45px', right: 0, background: '#ffffff', padding: '15px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', width: '260px', zIndex: 1100, border: '1px solid #f1f2f6', display: 'block' }}>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2f3542', marginBottom: '5px', textTransform: 'none' }}>Tasty Credit Line</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', color: '#57606f', marginBottom: '10px', borderBottom: '1px solid #f1f2f6', paddingBottom: '8px' }}>
                    <span>Available Limit:</span>
                    <span style={{ fontWeight: 800, color: '#2ed573' }}>₹{creditBalance}</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', color: '#747d8c', textAlign: 'center', padding: '5px 0' }}>
                    No outstanding repayments.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="header-right">
            <a href="tel:07304047007" className="header-action-item call-btn">
              <i className="fas fa-phone-alt"></i>
              <div className="action-text">
                <span className="label">Call us at</span>
                <span className="value">07304047007</span>
              </div>
            </a>

            <div className="header-action-item cart-trigger-btn" onClick={() => setIsCartOpen(true)}>
              <div className="cart-icon-wrapper">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-badge">{cartCount}</span>
              </div>
              <div className="action-text">
                <span className="single-label">Cart</span>
              </div>
            </div>

            <div className="header-action-item" onClick={() => {
              if (userName === 'Sign In') setIsSignInOpen(true);
              else setIsProfileDropdownOpen(!isProfileDropdownOpen);
            }}>
              <i className="fas fa-user-circle" style={userName !== 'Sign In' ? { color: '#ff3838' } : {}}></i>
              <div className="action-text">
                <span className="single-label">{userName}</span>
              </div>
              {isProfileDropdownOpen && userName !== 'Sign In' && (
                <div className="profile-dropdown-menu active">
                  <ul>
                    <li><i className="fas fa-shopping-bag"></i> Orders</li>
                    <li><i className="fas fa-heart"></i> Favorites</li>
                    <li onClick={() => {setIsProfileDropdownOpen(false); setIsProfileSettingsOpen(true);}}><i className="fas fa-cog"></i> Settings</li>
                    <li onClick={() => {setUserName('Sign In'); setIsProfileDropdownOpen(false);}}><i className="fas fa-sign-out-alt"></i> Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="header-search-bar">
            <i className="fas fa-search search-bar-icon"></i>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for your favorite dishes and restaurants (e.g. burger, pizza, biryani)..." />
            {searchQuery && <i className="fas fa-times" onClick={() => setSearchQuery('')} style={{ cursor: 'pointer', position: 'absolute', right: '15px' }}></i>}
          </div>
          {searchQuery && (
            <div className="main-search-results-dropdown active">
               <div style={{ padding: '15px', fontSize: '1.4rem', textAlign: 'center', color: '#747d8c' }}>Press Enter to search for "{searchQuery}"</div>
            </div>
          )}
        </div>
      </header>

      {/* Location Modal */}
      {isLocationOpen && (
        <>
          <div className="modal-container active" style={{ display: 'block' }} onClick={() => setIsLocationOpen(false)}></div>
          <div className="modal-content location-modal active" style={{ display: 'block' }}>
            <div className="modal-header">
              <h3>Select Location</h3>
              <i className="fas fa-times" onClick={() => setIsLocationOpen(false)}></i>
            </div>
            <div className="location-list">
              <ul>
                <li onClick={() => handleLocationSelect('Sector 4, 19th Main, HSR Layout RK, Bengaluru')}>
                  <i className="fas fa-location-arrow current-loc-icon"></i>
                  <div className="loc-info">
                    <span className="loc-title">Current Location</span>
                    <span className="loc-desc">Sector 4, 19th Main, HSR...</span>
                  </div>
                </li>
                <li onClick={() => handleLocationSelect('Koramangala, 5th Block, Bengaluru')}>
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="loc-info">
                    <span className="loc-title">Koramangala</span>
                    <span className="loc-desc">5th Block, Bengaluru</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Sign In Modal */}
      {isSignInOpen && (
        <>
          <div className="modal-container active" style={{ display: 'block' }} onClick={() => setIsSignInOpen(false)}></div>
          <div className="modal-content signin-modal active" style={{ display: 'block' }}>
            <div className="modal-header">
              <h3>Sign In to Tasty Bites</h3>
              <i className="fas fa-times" onClick={() => setIsSignInOpen(false)}></i>
            </div>
            <form onSubmit={handleSignIn}>
              <div className="input-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" required />
              </div>
              <button type="submit" className="btn0" style={{ width: '100%', fontSize: '1.4rem' }}>Sign In</button>
            </form>
          </div>
        </>
      )}

      {/* Profile Settings Modal */}
      {isProfileSettingsOpen && (
        <>
          <div className="modal-container active" style={{ display: 'block' }} onClick={() => setIsProfileSettingsOpen(false)}></div>
          <div className="modal-content profile-settings-modal active" style={{ display: 'block' }}>
             <div className="modal-header">
              <h3>Profile Settings</h3>
              <i className="fas fa-times" onClick={() => setIsProfileSettingsOpen(false)}></i>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsProfileSettingsOpen(false); }}>
               <div className="input-group">
                  <input type="text" defaultValue={userName} required />
               </div>
               <button type="submit" className="btn0" style={{ width: '100%' }}>Save Profile</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
