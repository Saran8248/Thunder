"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/customer/Header';
import PromoCarousel from '@/components/customer/PromoCarousel';
import Menu from '@/components/customer/Menu';
import CartDrawer from '@/components/customer/CartDrawer';
import { CartProvider } from '@/components/customer/CartProvider';

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loader-container fade-out-anim">
      <div className="loader-brand-content">
        <i className="fas fa-utensils loader-logo-icon"></i>
        <span className="loader-logo-text">Tasty Bites</span>
      </div>
      <div className="loader-spinner"></div>
      <style>{`
        .fade-out-anim {
          animation: fadeOut 1.5s forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}

export default function CustomerApp() {
  return (
    <CartProvider>
      <Loader />
      <Header />
      <PromoCarousel />
      <Menu />
      
      {/* Steps Section */}
      <section className="steps">
        <div className="box">
            <img src="/assets/images/step-1.jpg" alt="" />
            <h3>choose your favourite food</h3>
        </div>
        <div className="box">
            <img src="/assets/images/step-2.jpg" alt="" />
            <h3>free and fast delivery</h3>
        </div>
        <div className="box">
            <img src="/assets/images/step-3.jpg" alt="" />
            <h3>easy payment methods</h3>
        </div>
        <div className="box">
            <img src="/assets/images/step-4.jpg" alt="" />
            <h3>and finally, enjoy your food</h3>
        </div>
      </section>
      
      {/* Footer */}
      <section className="footer">
        <div className="container">
            <div className="footer-content">
                <h3>Contact Us</h3>
                <ul>
                    <li>Email: sksaran987@gmail.com</li>
                    <li>Phone: +91 8248286612</li>
                    <li>Address: 14/2 munjiyan chetti kadu  vennandur, Namakkal - 637505, Tamil Nadu</li>
                </ul>
            </div>
            <div className="footer-content">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#speciality">our's special</a></li>
                    <li><a href="#popular">popular foods</a></li>
                    <li><a href="#review">customer reviews</a></li>
                </ul>
            </div>
            <div className="footer-content">
                <h3>Follow Us</h3>
                <ul className="social-icons">
                    <li><a href=""><i className="fab fa-instagram"></i></a></li>
                    <li><a href=""><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href=""><i className="fab fa-youtube"></i></a></li>
                    <li><a href=""><i className="fab fa-whatsapp"></i></a></li>
                    <li><a href=""><i className="fab fa-github"></i></a></li>
                    <li><a href=""><i className="fab fa-pinterest"></i></a></li>
                </ul>
            </div>
        </div>
        <h1 className="credit">
            created by <a href="">Saran</a> | all rights are reserved
        </h1>
      </section>
      
      <CartDrawer />
    </CartProvider>
  );
}
