"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from './CartProvider';

const categories = [
  { name: 'South Indian', img: '/assets/images/s-img-6.jpg' },
  { name: 'North Indian', img: '/assets/images/s-img-6.jpg' },
  { name: 'Biryani', img: '/assets/images/s-img-3.jpg' },
  { name: 'Desserts', img: '/assets/images/s-img-5.jpg' },
  { name: 'Chinese', img: '/assets/images/s-img-1.jpg' },
  { name: 'Cake', img: '/assets/images/p-2.jpg' },
  { name: 'Burger', img: '/assets/images/p-1.jpg' },
  { name: 'Ice Cream', img: '/assets/images/p-6.jpg' },
];

export default function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [menuData, setMenuData] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/menu')
      .then(res => res.json())
      .then(data => {
        // Map the backend data to match the UI expectations
        const formattedData = data.map((r: any) => ({
          brand: r.name,
          brandLogo: r.logo,
          rating: r.rating || 4.3,
          promo: r.promo || 'Verified',
          items: r.menuItems.map((m: any) => ({
            name: m.name,
            price: m.price,
            img: m.image,
            stars: m.stars || 4.5
          }))
        }));
        setMenuData(formattedData);
      })
      .catch(err => console.error('Failed to fetch menu:', err));
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -240, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 240, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(activeCategory === cat ? null : cat);
  };

  const isMatch = (itemName: string, category: string | null) => {
    if (!category) return true;
    const cat = category.toLowerCase();
    const title = itemName.toLowerCase();
    
    let matches = title.includes(cat);
    if (cat === 'cake' || cat === 'desserts' || cat === 'pastry') matches = matches || title.includes('cake') || title.includes('cupcake') || title.includes('sweet') || title.includes('lava') || title.includes('pastry');
    if (cat === 'south indian' || cat === 'north indian') matches = matches || title.includes('dosa') || title.includes('idli') || title.includes('masala');
    if (cat === 'chinese') matches = matches || title.includes('noodle') || title.includes('pasta') || title.includes('wrap');
    if (cat === 'burger') matches = matches || title.includes('burger') || title.includes('crispy veg');
    return matches;
  };

  return (
    <>
      <section className="food-categories-section">
        <div className="section-header">
          <h2 className="categories-title">Order our best food options</h2>
          <div className="categories-arrows">
            <button className="arrow-btn" onClick={scrollLeft}><i className="fas fa-chevron-left"></i></button>
            <button className="arrow-btn" onClick={scrollRight}><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <div className="categories-slider-wrapper" ref={sliderRef}>
          {categories.map((cat, idx) => (
            <div key={idx} className={`category-card ${activeCategory === cat.name ? 'active' : ''}`} onClick={() => handleCategoryClick(cat.name)}>
              <div className="category-circle">
                <img src={cat.img} alt={cat.name} />
              </div>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="menu-sections" id="menu-sections">
        <h1 className="heading">our <span>menu court</span></h1>
        
        {menuData.map((brandGroup, bIdx) => {
          const visibleItems = brandGroup.items.filter(item => isMatch(item.name, activeCategory));
          if (visibleItems.length === 0) return null;

          return (
            <div className="restaurant-menu-group" key={bIdx}>
              <div className="restaurant-brand-header">
                <div className="brand-info">
                  <img src={brandGroup.brandLogo} alt={brandGroup.brand} className="brand-avatar" />
                  <div>
                    <h2>{brandGroup.brand}</h2>
                    <p><i className="fas fa-star" style={{ color: 'gold' }}></i> {brandGroup.rating} | Verified</p>
                  </div>
                </div>
                <span className="badge-promo">{brandGroup.promo}</span>
              </div>
              
              <div className="box-container">
                {visibleItems.map((item, iIdx) => (
                  <div className="box" key={iIdx}>
                    <span className="price">₹{item.price}</span>
                    <img src={item.img} alt={item.name} />
                    <h3>{item.name}</h3>
                    <div className="stars">
                       <i className="fas fa-star"></i>
                       <i className="fas fa-star"></i>
                       <i className="fas fa-star"></i>
                       <i className="fas fa-star"></i>
                       <i className="fas fa-star"></i>
                    </div>
                    <button className="btn add-to-cart-btn" onClick={() => addToCart({ name: `${item.name} [${brandGroup.brand}]`, price: item.price, img: item.img, qty: 1 })}>
                      ADD TO CART
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
