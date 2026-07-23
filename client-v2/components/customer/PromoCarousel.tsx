"use client";
import React, { useState, useEffect } from 'react';

const slidesData = [
  { brand: 'Oven Story', title: 'BUY 1 GET 1 FREE', sub: 'ALL DAY, EVERYDAY', desc: 'Semisoft cheese crust pizzas with signature sauces.', img: '/assets/images/s-img-2.jpg', theme: 'ovenstory-theme' },
  { brand: 'Faasos', title: 'BUY 1 GET 1 FREE', sub: 'ALL DAY, EVERYDAY', desc: 'Fresh wraps, rolls, and healthy bowls delivered fast.', img: '/assets/images/s-img-1.jpg', theme: 'faasos-theme' },
  { brand: 'The Biryani Life', title: 'BUY 1 GET 1 FREE', sub: 'ALL DAY, EVERYDAY', desc: 'Authentic Dum Biryanis prepared with signature spices.', img: '/assets/images/s-img-3.jpg', theme: 'biryani-theme' }
];

export default function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + slidesData.length) % slidesData.length);

  return (
    <section className="promo-carousel-section" id="home">
      <div className="carousel-container">
        <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slidesData.map((slide, idx) => (
            <div key={idx} className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}>
              <div className={`promo-banner ${slide.theme}`}>
                <div className="promo-content">
                  <span className="brand-tag">{slide.brand}</span>
                  <h2>{slide.title}</h2>
                  <p className="sub-promo">{slide.sub}</p>
                  <p className="desc">{slide.desc}</p>
                  <a href="#menu-sections" className="promo-btn">Order Now</a>
                </div>
                <div className="promo-image">
                  <img src={slide.img} alt={slide.brand} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-arrow prev" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
        <button className="carousel-arrow next" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
        
        <div className="carousel-dots">
          {slidesData.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></span>
          ))}
        </div>
      </div>
    </section>
  );
}
