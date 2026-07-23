"use client";
import React, { useState } from 'react';
import { useCart } from './CartProvider';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, cartTotal, removeFromCart } = useCart();
  const [couponApplied, setCouponApplied] = useState(false);
  const [useCredit, setUseCredit] = useState(false);

  const creditBalance = 3000;

  let discountAmt = 0;
  if (couponApplied) {
    discountAmt = Math.round(cartTotal * 0.25);
  }

  const billAfterDiscount = cartTotal - discountAmt;
  let finalPayNow = billAfterDiscount;
  let creditUsed = 0;
  let repayDue = 0;

  if (useCredit) {
    const possibleCredit = Math.round(billAfterDiscount * 0.5);
    creditUsed = possibleCredit <= creditBalance ? possibleCredit : creditBalance;
    finalPayNow = billAfterDiscount - creditUsed;
    repayDue = creditUsed + Math.round(billAfterDiscount * 0.05);
  }

  if (!isCartOpen) return null;

  return (
    <>
      <div className="modal-container active" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }} onClick={() => setIsCartOpen(false)}></div>
      <div id="cart-drawer" className="drawer-container active" style={{ right: 0, zIndex: 1050 }}>
        <div className="drawer-content">
          <div className="drawer-header">
            <h2>Your Cart</h2>
            <i className="fas fa-times" id="close-cart-btn" onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer' }}></i>
          </div>
          
          <div className="cart-items-container" id="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart-msg">
                <i className="fas fa-shopping-basket"></i>
                <p>Your cart is empty. Add some delicious food!</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.img} alt={item.name} />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price}</div>
                  </div>
                  <div className="cart-item-qty">
                    <div className="qty-btn minus" onClick={() => updateQuantity(index, -1)}>-</div>
                    <span className="qty-val">{item.qty}</span>
                    <div className="qty-btn plus" onClick={() => updateQuantity(index, 1)}>+</div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="drawer-footer">
            {cart.length > 0 && (
              <>
                <div className="cart-coupon-section" id="cart-coupon-section" style={{ marginBottom: '15px' }}>
                  <div className="coupon-box">
                    <i className="fas fa-percentage coupon-icon"></i>
                    <div className="coupon-info">
                      <span className="coupon-title">WELCOME25</span>
                      <span className="coupon-desc">Get 25% off on your first order!</span>
                    </div>
                    <button 
                      id="apply-coupon-btn" 
                      className="apply-btn" 
                      style={{ backgroundColor: couponApplied ? '#57606f' : '', borderColor: couponApplied ? '#57606f' : '' }}
                      onClick={() => setCouponApplied(!couponApplied)}
                    >
                      {couponApplied ? 'Remove' : 'Apply'}
                    </button>
                  </div>
                </div>
                
                <div className="cart-credit-toggle-wrapper" id="cart-credit-toggle-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '10px', background: '#f6f8fa', borderRadius: '8px', border: '1px solid #dfe4ea', textAlign: 'left' }}>
                  <input type="checkbox" id="use-credit-checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} checked={useCredit} onChange={e => setUseCredit(e.target.checked)} />
                  <label htmlFor="use-credit-checkbox" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2f3542', cursor: 'pointer', textTransform: 'none' }}>
                    Use Tasty Credit (Pay 50% now, repay later with 5% interest fee)
                  </label>
                </div>
                
                <div className="cart-summary-breakdown" style={{ fontSize: '1.3rem', color: '#57606f', marginBottom: '12px', display: (couponApplied || (useCredit && creditUsed > 0)) ? 'block' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Subtotal:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  {couponApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#2ed573', fontWeight: 700 }}>
                      <span>Discount (25% OFF):</span>
                      <span>-₹{discountAmt}</span>
                    </div>
                  )}
                  {useCredit && creditUsed > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#ffa502', fontWeight: 700 }}>
                      <span>Tasty Credit Used (50%):</span>
                      <span>-₹{creditUsed}</span>
                    </div>
                  )}
                  {useCredit && creditUsed > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#ff3838', fontWeight: 700 }}>
                      <span>Repayment Due (in 1 week):</span>
                      <span>₹{repayDue}</span>
                    </div>
                  )}
                </div>
                
                <div className="cart-total">
                  <span>Pay Now:</span>
                  <span id="cart-total-price">₹{finalPayNow}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={async () => {
                    try {
                      const res = await fetch('http://localhost:5001/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          items: cart,
                          totalAmount: cartTotal,
                          isCreditOrder: useCredit,
                          creditUsed: creditUsed,
                          repaymentDue: repayDue
                        })
                      });
                      if (res.ok) {
                        alert('Order placed successfully! Checkout complete.');
                        // Clear cart locally (mocking state reset)
                        window.location.reload(); 
                      }
                    } catch (e) {
                      console.error('Checkout failed', e);
                    }
                  }}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
