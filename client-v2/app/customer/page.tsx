
import React from 'react';
import Link from 'next/link';

export default function Customer() {
  return (
    <>
      
    <header className="eatsure-header">
        <div className="header-top">
            <div className="header-left">
                <a href="/customer#" className="logo"><i className="fas fa-utensils"></i><span>Tasty Bites</span></a>

                <div className="location-selector-btn" id="location-selector-trigger">
                    <i className="fas fa-map-marker-alt map-pin"></i>
                    <div className="location-text">
                        <span className="main-loc" id="current-main-loc">Sector 4, 19th Main...</span>
                        <span className="sub-loc" id="current-sub-loc">HSR Layout RK, Bengaluru</span>
                    </div>
                    <i className="fas fa-chevron-down arrow-down"></i>
                </div>

                <div className="delivery-toggle" id="delivery-toggle-container">
                    <span className="toggle-btn delivery-active" id="delivery-active-btn"><i className="fas fa-motorcycle"></i> Delivery</span>
                    <span className="toggle-btn delivery-time" id="delivery-time-trigger">Now <i className="fas fa-chevron-down" id="delivery-time-chevron"></i></span>
                    
                    {/*  Time Selection Dropdown  */}
                    <div className="time-dropdown-menu" id="delivery-time-dropdown">
                        <ul>
                            <li data-time="Now"><i className="fas fa-shipping-fast"></i> Now</li>
                            <li data-time="In 30 mins"><i className="far fa-clock"></i> In 30 mins</li>
                            <li data-time="In 1 hour"><i className="far fa-clock"></i> In 1 hour</li>
                            <li id="dropdown-schedule-trigger"><i className="far fa-calendar-alt"></i> Schedule Time & Date</li>
                        </ul>
                    </div>

                    {/*  Calendar Input Popover  */}
                    <div className="schedule-popover" id="schedule-popover" style={{ left: 'auto', right: '0', transform: 'translateX(0) scale(0.95)' }}>
                        <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2f3542', marginBottom: '8px' }}>Select Date & Time</p>
                        <input type="datetime-local" id="schedule-datetime" style={{ width: '100%', padding: '8px', fontSize: '1.3rem', border: '1px solid #dfe4ea', borderRadius: '6px', outline: 'none', marginBottom: '10px' }} />
                        <button id="confirm-schedule-btn" className="btn0" style={{ width: '100%', fontSize: '1.3rem', padding: '8px 12px' }}>Confirm</button>
                        <button id="reset-schedule-btn" className="btn0" style={{ width: '100%', marginTop: '8px', padding: '8px 12px', backgroundColor: '#747d8c', borderColor: '#747d8c', fontSize: '1.3rem' }}>Reset</button>
                    </div>
                </div>

                <div className="delivery-toggle credit-toggle" id="header-credit-container" style={{ marginLeft: '12px', position: 'relative' }}>
                    <span className="toggle-btn" id="header-credit-trigger" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', cursor: 'pointer' }}>
                        <i className="fas fa-wallet" style={{ fontSize: '1.5rem', color: '#2ed573' }}></i>
                        <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#2f3542', textTransform: 'none' }}>Credits: <span id="header-credit-balance" style={{ color: '#2ed573' }}>₹3000</span></span>
                        <i className="fas fa-chevron-down" id="credit-chevron" style={{ fontSize: '1rem', color: '#747d8c', marginLeft: '4px' }}></i>
                    </span>

                    {/*  Credits Info Dropdown  */}
                    <div className="credit-dropdown-menu" id="credit-info-dropdown" style={{ position: 'absolute', top: '45px', right: '0', background: '#ffffff', padding: '15px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.12)', width: '260px', display: 'none', zIndex: '1100', border: '1px solid #f1f2f6' }}>
                        <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2f3542', marginBottom: '5px', textTransform: 'none' }}>Tasty Credit Line</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', color: '#57606f', marginBottom: '10px', borderBottom: '1px solid #f1f2f6', paddingBottom: '8px' }}>
                            <span>Available Limit:</span>
                            <span id="popup-credit-balance" style={{ fontWeight: '800', color: '#2ed573' }}>₹3000</span>
                        </div>
                        
                        <div id="credit-repay-section" style={{ display: 'none' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff3838', marginBottom: '4px' }}><i className="fas fa-exclamation-circle"></i> Outstanding Repayment</p>
                            <div style={{ fontSize: '1.2rem', color: '#57606f', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                    <span>Repay Amount:</span>
                                    <span id="repay-amount-val" style={{ fontWeight: '700', color: '#2f3542' }}>₹0</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Due Date:</span>
                                    <span id="repay-date-val" style={{ fontWeight: '700', color: '#2f3542' }}>-</span>
                                </div>
                            </div>
                            <button id="repay-now-btn" className="btn0" style={{ width: '100%', fontSize: '1.2rem', padding: '8px', backgroundColor: '#2ed573', borderColor: '#2ed573', marginTop: '5px' }}>Repay Full Amount</button>
                        </div>
                        <div id="credit-no-repay-msg" style={{ fontSize: '1.2rem', color: '#747d8c', textAlign: 'center', padding: '5px 0' }}>
                            No outstanding repayments.
                        </div>
                    </div>
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

                <div className="header-action-item cart-trigger-btn" id="cart-trigger">
                    <div className="cart-icon-wrapper">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="cart-badge" id="cart-count">0</span>
                    </div>
                    <div className="action-text">
                        <span className="single-label">Cart</span>
                    </div>
                </div>

                <div className="header-action-item" id="signin-trigger">
                    <i className="fas fa-user-circle" id="signin-icon"></i>
                    <div className="action-text">
                        <span className="single-label" id="signin-text">Sign In</span>
                    </div>
                </div>

                <div className="header-action-item" id="profile-trigger">
                    <i className="fas fa-bars"></i>
                    <div className="action-text">
                        <span className="single-label">My Profile</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="header-bottom">
            <div className="header-search-bar">
                <i className="fas fa-search search-bar-icon"></i>
                <input type="text" id="main-search-input" placeholder="Search for your favorite dishes and restaurants (e.g. burger, pizza, biryani)..." />
                <i className="fas fa-times" id="clear-search-btn"></i>
            </div>
            {/*  Live Search Results Dropdown  */}
            <div id="main-search-results" className="main-search-results-dropdown"></div>
        </div>
    </header>
    {/*  Promo Banner Carousel Section  */}
    <section className="promo-carousel-section" id="home">
        <div className="carousel-container">
            <div className="carousel-track">
                {/*  Slide 1  */}
                <div className="carousel-slide active">
                    <div className="promo-banner ovenstory-theme">
                        <div className="promo-content">
                            <span className="brand-tag">Oven Story</span>
                            <h2>BUY 1 GET 1 FREE</h2>
                            <p className="sub-promo">ALL DAY, EVERYDAY</p>
                            <p className="desc">Semisoft cheese crust pizzas with signature sauces.</p>
                            <a href="/customer#menu-sections" className="promo-btn">Order Now</a>
                        </div>
                        <div className="promo-image">
                            <img src="/assets/images/s-img-2.jpg" alt="Oven Story Pizza" />
                        </div>
                    </div>
                </div>

                {/*  Slide 2  */}
                <div className="carousel-slide">
                    <div className="promo-banner faasos-theme">
                        <div className="promo-content">
                            <span className="brand-tag">Faasos</span>
                            <h2>BUY 1 GET 1 FREE</h2>
                            <p className="sub-promo">ALL DAY, EVERYDAY</p>
                            <p className="desc">Fresh wraps, rolls, and healthy bowls delivered fast.</p>
                            <a href="/customer#menu-sections" className="promo-btn">Order Now</a>
                        </div>
                        <div className="promo-image">
                            <img src="/assets/images/s-img-1.jpg" alt="Faasos Wrap" />
                        </div>
                    </div>
                </div>

                {/*  Slide 3  */}
                <div className="carousel-slide">
                    <div className="promo-banner biryani-theme">
                        <div className="promo-content">
                            <span className="brand-tag">The Biryani Life</span>
                            <h2>BUY 1 GET 1 FREE</h2>
                            <p className="sub-promo">ALL DAY, EVERYDAY</p>
                            <p className="desc">Authentic Dum Biryanis prepared with signature spices.</p>
                            <a href="/customer#menu-sections" className="promo-btn">Order Now</a>
                        </div>
                        <div className="promo-image">
                            <img src="/assets/images/s-img-3.jpg" alt="Biryani Life" />
                        </div>
                    </div>
                </div>
            </div>

            {/*  Slide Navigation Controls  */}
            <button className="carousel-arrow prev" id="prev-slide"><i className="fas fa-chevron-left"></i></button>
            <button className="carousel-arrow next" id="next-slide"><i className="fas fa-chevron-right"></i></button>
            
            <div className="carousel-dots">
                <span className="dot active" data-index="0"></span>
                <span className="dot" data-index="1"></span>
                <span className="dot" data-index="2"></span>
            </div>
        </div>
    </section>


    {/*  Food Options Categories Section  */}
    <section className="food-categories-section">
        <div className="section-header">
            <h2 className="categories-title">Order our best food options</h2>
            <div className="categories-arrows">
                <button className="arrow-btn" id="categories-prev"><i className="fas fa-chevron-left"></i></button>
                <button className="arrow-btn" id="categories-next"><i className="fas fa-chevron-right"></i></button>
            </div>
        </div>

        <div className="categories-slider-wrapper" id="categories-slider-wrapper">
            <div className="category-card" data-category="South Indian">
                <div className="category-circle">
                    <img src="/assets/images/s-img-6.jpg" alt="South Indian" />
                </div>
                <span className="category-name">South Indian</span>
            </div>
            
            <div className="category-card" data-category="North Indian">
                <div className="category-circle">
                    <img src="/assets/images/s-img-6.jpg" alt="North Indian" />
                </div>
                <span className="category-name">North Indian</span>
            </div>

            <div className="category-card" data-category="Biryani">
                <div className="category-circle">
                    <img src="/assets/images/s-img-3.jpg" alt="Biryani" />
                </div>
                <span className="category-name">Biryani</span>
            </div>

            <div className="category-card" data-category="Desserts">
                <div className="category-circle">
                    <img src="/assets/images/s-img-5.jpg" alt="Desserts" />
                </div>
                <span className="category-name">Desserts</span>
            </div>

            <div className="category-card" data-category="Chinese">
                <div className="category-circle">
                    <img src="/assets/images/s-img-1.jpg" alt="Chinese" />
                </div>
                <span className="category-name">Chinese</span>
            </div>

            <div className="category-card" data-category="Cake">
                <div className="category-circle">
                    <img src="/assets/images/p-2.jpg" alt="Cake" />
                </div>
                <span className="category-name">Cake</span>
            </div>

            <div className="category-card" data-category="Burger">
                <div className="category-circle">
                    <img src="/assets/images/p-1.jpg" alt="Burger" />
                </div>
                <span className="category-name">Burger</span>
            </div>

            <div className="category-card" data-category="Ice Cream">
                <div className="category-circle">
                    <img src="/assets/images/p-6.jpg" alt="Ice Cream" />
                </div>
                <span className="category-name">Ice Cream</span>
            </div>

            <div className="category-card" data-category="Pastry">
                <div className="category-circle">
                    <img src="/assets/images/p-4.jpg" alt="Pastry" />
                </div>
                <span className="category-name">Pastry</span>
            </div>

            <div className="category-card" data-category="Dosa">
                <div className="category-circle">
                    <img src="/assets/images/s-img-6.jpg" alt="Dosa" />
                </div>
                <span className="category-name">Dosa</span>
            </div>

            <div className="category-card" data-category="Noodles">
                <div className="category-circle">
                    <img src="/assets/images/s-img-1.jpg" alt="Noodles" />
                </div>
                <span className="category-name">Noodles</span>
            </div>

            <div className="category-card" data-category="Pasta">
                <div className="category-circle">
                    <img src="/assets/images/s-img-2.jpg" alt="Pasta" />
                </div>
                <span className="category-name">Pasta</span>
            </div>

            <div className="category-card" data-category="Idli">
                <div className="category-circle">
                    <img src="/assets/images/s-img-6.jpg" alt="Idli" />
                </div>
                <span className="category-name">Idli</span>
            </div>

            <div className="category-card" data-category="Khichdi">
                <div className="category-circle">
                    <img src="/assets/images/s-img-6.jpg" alt="Khichdi" />
                </div>
                <span className="category-name">Khichdi</span>
            </div>
        </div>
    </section>

    {/*  Food Court Menu Sections  */}
    <section className="menu-sections" id="menu-sections">
        <h1 className="heading">our <span>menu court</span></h1>

        {/*  Oven Story Section  */}
        <div className="restaurant-menu-group" id="menu-ovenstory" data-brand="ovenstory">
            <div className="restaurant-brand-header">
                <div className="brand-info">
                    <img src="/assets/images/s-3.png" alt="Oven Story Logo" className="brand-avatar" />
                    <div>
                        <h2>Oven Story Pizza</h2>
                        <p><i className="fas fa-star" style={{ color: 'gold' }}></i> 4.3 | Semisoft Cheese Crust Pizzas</p>
                    </div>
                </div>
                <span className="badge-promo">Free Delivery</span>
            </div>
            
            <div className="box-container">
                <div className="box">
                    <span className="price">₹290</span>
                    <img src="/assets/images/s-img-2.jpg" alt="Paneer Tikka Pizza" />
                    <h3>Paneer Tikka Pizza</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Paneer Tikka Pizza" data-price="290" data-brand="Oven Story">ADD TO CART</a>
                </div>

                <div className="box">
                    <span className="price">₹210</span>
                    <img src="/assets/images/p-6.jpg" alt="Margherita Pizza" />
                    <h3>Classic Margherita</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Classic Margherita Pizza" data-price="210" data-brand="Oven Story">ADD TO CART</a>
                </div>

                <div className="box">
                    <span className="price">₹340</span>
                    <img src="/assets/images/s-img-2.jpg" alt="Veggie Supreme Pizza" />
                    <h3>Veggie Supreme Pizza</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Veggie Supreme Pizza" data-price="340" data-brand="Oven Story">ADD TO CART</a>
                </div>
            </div>
        </div>

        {/*  Faasos Section  */}
        <div className="restaurant-menu-group" id="menu-faasos" data-brand="faasos">
            <div className="restaurant-brand-header">
                <div className="brand-info">
                    <img src="/assets/images/s-1.png" alt="Faasos Logo" className="brand-avatar" />
                    <div>
                        <h2>Faasos Wraps</h2>
                        <p><i className="fas fa-star" style={{ color: 'gold' }}></i> 4.2 | Signature Rolls and Wraps</p>
                    </div>
                </div>
                <span className="badge-promo">Buy 1 Get 1 Free</span>
            </div>

            <div className="box-container">
                <div className="box">
                    <span className="price">₹160</span>
                    <img src="/assets/images/s-img-1.jpg" alt="Double Cheese Paneer Wrap" />
                    <h3>Double Cheese Paneer Wrap</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Double Cheese Paneer Wrap" data-price="160" data-brand="Faasos">ADD TO CART</a>
                </div>

                <div className="box">
                    <span className="price">₹130</span>
                    <img src="/assets/images/p-1.jpg" alt="Masala Chicken Wrap" />
                    <h3>Classic Masala Wrap</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Classic Masala Wrap" data-price="130" data-brand="Faasos">ADD TO CART</a>
                </div>
            </div>
        </div>

        {/*  Wendy's Burgers Section  */}
        <div className="restaurant-menu-group" id="menu-wendys" data-brand="wendys">
            <div className="restaurant-brand-header">
                <div className="brand-info">
                    <img src="/assets/images/s-2.png" alt="Wendy's Logo" className="brand-avatar" />
                    <div>
                        <h2>Wendy's Burgers</h2>
                        <p><i className="fas fa-star" style={{ color: 'gold' }}></i> 4.4 | Square Burgers & Fries</p>
                    </div>
                </div>
                <span className="badge-promo">Trending #1</span>
            </div>

            <div className="box-container">
                <div className="box">
                    <span className="price">₹120</span>
                    <img src="/assets/images/p-1.jpg" alt="Wendy's Crispy Veg Burger" />
                    <h3>Classic Crispy Veg</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Classic Crispy Veg" data-price="120" data-brand="Wendy's">ADD TO CART</a>
                </div>

                <div className="box">
                    <span className="price">₹190</span>
                    <img src="/assets/images/s-img-1.jpg" alt="Double Cheese Bacon Burger" />
                    <h3>Double Cheese Bacon</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Double Cheese Bacon Burger" data-price="190" data-brand="Wendy's">ADD TO CART</a>
                </div>
            </div>
        </div>

        {/*  Behrouz Biryani Section  */}
        <div className="restaurant-menu-group" id="menu-behrouz" data-brand="behrouz">
            <div className="restaurant-brand-header">
                <div className="brand-info">
                    <img src="/assets/images/s-4.png" alt="Behrouz Logo" className="brand-avatar" />
                    <div>
                        <h2>Behrouz Biryani</h2>
                        <p><i className="fas fa-star" style={{ color: 'gold' }}></i> 4.6 | Royal Biryani Recipes</p>
                    </div>
                </div>
                <span className="badge-promo">Royal Feast</span>
            </div>

            <div className="box-container">
                <div className="box">
                    <span className="price">₹350</span>
                    <img src="/assets/images/s-img-3.jpg" alt="Subz-e-Falafel Biryani" />
                    <h3>Subz-e-Biryani</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Subz-e-Biryani" data-price="350" data-brand="Behrouz">ADD TO CART</a>
                </div>
            </div>
        </div>

        {/*  Sweet Truth Section  */}
        <div className="restaurant-menu-group" id="menu-sweettruth" data-brand="sweettruth">
            <div className="restaurant-brand-header">
                <div className="brand-info">
                    <img src="/assets/images/s-5.png" alt="Sweet Truth Logo" className="brand-avatar" />
                    <div>
                        <h2>Sweet Truth</h2>
                        <p><i className="fas fa-star" style={{ color: 'gold' }}></i> 4.5 | Desserts, Cakes & Cupcakes</p>
                    </div>
                </div>
                <span className="badge-promo">Sweet Deals</span>
            </div>

            <div className="box-container">
                <div className="box">
                    <span className="price">₹90</span>
                    <img src="/assets/images/p-3.jpg" alt="Lava Cake" />
                    <h3>Chocolate Lava Cake</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Chocolate Lava Cake" data-price="90" data-brand="Sweet Truth">ADD TO CART</a>
                </div>

                <div className="box">
                    <span className="price">₹70</span>
                    <img src="/assets/images/p-4.jpg" alt="Cupcakes" />
                    <h3>Tasty Cupcakes Pack</h3>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Tasty Cupcakes Pack" data-price="70" data-brand="Sweet Truth">ADD TO CART</a>
                </div>
            </div>
        </div>
    </section>

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

    <section className="gallery" id="gallery">

        <h1 className="heading">our food <span>gallery</span></h1>

        <div className="box-container">

            <div className="box">
                <img src="/assets/images/g-1.jpg" alt="Tasty Burger" />
                <div className="content">
                    <h3>Tasty Burger</h3>
                    <p>Absolutely delicious! The Tasty Burger was juicy and flavorful, easily the best burger I've had in a long time.</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Tasty Burger" data-price="150" data-brand="Wendy's">order now</a>
                </div>
            </div>
            <div className="box">
                <img src="/assets/images/g-3.jpg" alt="Tasty Food" />
                <div className="content">
                    <h3>tasty food</h3>
                    <p>Breakfast here is amazing! The pancakes were fluffy, and the omelet was packed with fresh ingredients. A great way to start the day!</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Tasty Breakfast Food" data-price="120" data-brand="Homely">order now</a>
                </div>
            </div>
            <div className="box">
                <img src="/assets/images/g-4.jpg" alt="Tasty Cupcakes" />
                <div className="content">
                    <h3>Tasty Cupcakes</h3>
                    <p>The cupcakes from TastyBites are absolutely delightful! They're moist, flavorful, and beautifully decorated. Each bite is a little piece of heaven. I can't resist ordering them for every special occasion!"</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Tasty Cupcakes" data-price="70" data-brand="Sweet Truth">order now</a>
                </div>
            </div>
            <div className="box">
                <img src="/assets/images/g-5.jpg" alt="Tasty Sweets" />
                <div className="content">
                    <h3>Tasty Sweets</h3>
                    <p>The Tasty Sweets are simply divine. Every bite of the cake was moist and delicious. A real treat!"</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Tasty Sweets" data-price="90" data-brand="Sweet Truth">order now</a>
                </div>
            </div>
            <div className="box">
                <img src="/assets/images/p-5.jpg" alt="Cold Drinks" />
                <div className="content">
                    <h3>Cold Drinks</h3>
                    <p>The Cold Drinks are so refreshing and full of flavor. They were the perfect complement to my meal.</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Cold Drinks" data-price="50" data-brand="Tasty Bites">order now</a>
                </div>
            </div>
            <div className="box">
                <img src="/assets/images/g-8.jpg" alt="Tasty Chocolate" />
                <div className="content">
                    <h3>Tasty chocolate</h3>
                    <p>Tasty chocolate from TastyBites are simply delicious! They never fail to satisfy my sweet cravings. Perfect for indulging or sharing with friends</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Tasty Chocolate" data-price="80" data-brand="Sweet Truth">order now</a>
                </div>
            </div>
            <div className="box">
                <img src="/assets/images/p-6.jpg" alt="Tasty Cold Ice Cream" />
                <div className="content">
                    <h3>tasty Cold Ice Cream</h3>
                    <p> Cold Ice Cream from TastyBites is a real treat! Creamy, smooth, and oh-so-satisfying. Whether you're cooling off on a hot day or just need a sweet pick-me-up, their ice cream hits the spot every time. Definitely a must-try!</p>
                    <a href="/customer#" className="btn add-to-cart-btn" data-name="Cold Ice Cream" data-price="100" data-brand="Sweet Truth">order now</a>
                </div>
            </div>
        </div>
    </section>

    <section className="review" id="review">

        <h1 className="heading">our customers <span>reviews</span></h1>

        <div className="box-container">

            <div className="box">
                <img src="/assets/images/pic1.png" alt="" />
                <h3>Priya Patel</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </div>
                <p>The Tasty Sweets are simply divine. Every bite of the cake was moist and delicious. A real treat!"</p>

            </div>
            <div className="box">
                <img src="/assets/images/pic2.webp" alt="" />
                <h3>Rahul Gupta</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </div>
                <p>TastyBites breakfast is truly satisfying! They always hit the spot for me.</p>

            </div>
            <div className="box">
                <img src="/assets/images/pic3.jpg" alt="" />
                <h3>meera pandi</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                </div>
                <p> It's the ultimate comfort food to start your day with. Highly recommend!</p>

            </div>
        </div>
    </section>

    <section className="order" id="order">
 
         <h1 className="heading"><span>order</span> now </h1>
 
         <div className="row">
             <form id="order-form">
                 <div className="inputBox">
                     <input type="text" id="order-name" placeholder="name" required /> <br />
                     <input type="email" id="order-email" placeholder="email" required />
                 </div>
                 <div className="inputBox">
                     <input type="number" id="order-phone" placeholder="phone number" required /> <br />
                     <input type="text" id="order-food" placeholder="food name" required />
                 </div>
                 <textarea placeholder="address" id="order-address" cols={30} rows={10} required></textarea>
                 <input type="submit" value="order now" className="btn0" />
             </form>
         </div>
     </section>

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
                    <li><a href="/customer#home">Home</a></li>
                    <li><a href="/customer#speciality">our's special</a></li>
                    <li><a href="/customer#popular">popular foods</a></li>
                    <li><a href="/customer#review">customer reviews</a></li>
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


 
     <div className="loader-container">
         <div className="loader-brand-content">
             <i className="fas fa-utensils loader-logo-icon"></i>
             <span className="loader-logo-text">Tasty Bites</span>
         </div>
         <div className="loader-spinner"></div>
     </div>
 
     {/*  Custom Success Modal  */}
     <div id="order-success-modal" className="modal-container">
         <div className="modal-content">
             <i className="fas fa-check-circle success-icon"></i>
             <h2>Order Placed Successfully!</h2>
             <p>Thank you for choosing Tasty Bites. Your delicious meal is being prepared and will be delivered shortly.</p>
             <button id="close-modal-btn" className="btn0">Great!</button>
         </div>
     </div>

     {/*  Cart Drawer  */}
     <div id="cart-drawer" className="drawer-container">
         <div className="drawer-content">
             <div className="drawer-header">
                 <h2>Your Cart</h2>
                 <i className="fas fa-times" id="close-cart-btn"></i>
             </div>
             <div className="cart-items-container" id="cart-items">
                 <div className="empty-cart-msg">
                     <i className="fas fa-shopping-basket"></i>
                     <p>Your cart is empty. Add some delicious food!</p>
                 </div>
             </div>
             <div className="drawer-footer">
                 {/*  Coupon Section  */}
                 <div className="cart-coupon-section" id="cart-coupon-section" style={{ display: 'none', marginBottom: '15px' }}>
                     <div className="coupon-box">
                         <i className="fas fa-percentage coupon-icon"></i>
                         <div className="coupon-info">
                             <span className="coupon-title">WELCOME25</span>
                             <span className="coupon-desc">Get 25% off on your first order!</span>
                         </div>
                         <button id="apply-coupon-btn" className="apply-btn">Apply</button>
                     </div>
                 </div>
                  {/*  Credit Option checkbox  */}
                  <div className="cart-credit-toggle-wrapper" id="cart-credit-toggle-container" style={{ display: 'none', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '10px', background: '#f6f8fa', borderRadius: '8px', border: '1px solid #dfe4ea', textAlign: 'left' }}>
                      <input type="checkbox" id="use-credit-checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                      <label htmlFor="use-credit-checkbox" style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2f3542', cursor: 'pointer', textTransform: 'none' }}>
                          Use Tasty Credit (Pay 50% now, repay later with 5% interest fee)
                      </label>
                  </div>

                  {/*  Price Breakdown  */}
                  <div className="cart-summary-breakdown" style={{ fontSize: '1.3rem', color: '#57606f', marginBottom: '12px', display: 'none' }} id="cart-price-breakdown">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }} id="breakdown-subtotal-row">
                          <span>Subtotal:</span>
                          <span id="cart-subtotal-price">₹0</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#2ed573', fontWeight: '700' }} id="breakdown-discount-row">
                          <span>Discount (25% OFF):</span>
                          <span id="cart-discount-price">-₹0</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#ffa502', fontWeight: '700', display: 'none' }} id="breakdown-credit-row">
                          <span>Tasty Credit Used (50%):</span>
                          <span id="cart-credit-used-price">-₹0</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#ff3838', fontWeight: '700', display: 'none' }} id="breakdown-repay-row">
                          <span>Repayment Due (in 1 week):</span>
                          <span id="cart-repay-due-price">₹0</span>
                      </div>
                  </div>

                 <div className="cart-summary">
                     <span>Total Amount:</span>
                     <span id="cart-total-price">₹0</span>
                 </div>
                 <button id="cart-checkout-btn" className="btn0 checkout-btn">Proceed to Checkout</button>
             </div>
         </div>
     </div>

     {/*  Sign In Modal  */}
     <div id="signin-modal" className="modal-container">
         <div className="modal-content signin-content">
             <i className="fas fa-times close-modal-btn" id="close-signin-btn"></i>
             <h2>Sign In to Tasty Bites</h2>
             <p>Get access to your orders, rewards, and favorites.</p>
             <form id="signin-form">
                 <div className="inputBox">
                     <input type="email" id="signin-email" placeholder="Email Address" required />
                 </div>
                 <div className="inputBox">
                     <input type="password" id="signin-password" placeholder="Password" required />
                 </div>
                 <button type="submit" className="btn0" style={{ width: '100%', marginTop: '15px' }}>Sign In</button>
             </form>
             <div className="divider"><span>OR</span></div>
             <div className="social-login">
                 <button className="social-btn google"><i className="fab fa-google"></i> Google</button>
                 <button className="social-btn facebook"><i className="fab fa-facebook-f"></i> Facebook</button>
             </div>
         </div>
     </div>

     {/*  Location Selector Modal  */}
     <div id="location-modal" className="modal-container">
         <div className="modal-content location-content">
             <i className="fas fa-times close-modal-btn" id="close-location-btn"></i>
             <h2>Select Delivery Location</h2>
             <p>Find the best restaurants delivering to your doorstep.</p>
             <div className="location-search-wrapper">
                 <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: '#ff3838', marginRight: '10px' }}></i>
                 <input type="text" id="location-search" placeholder="Enter your delivery location..." style={{ width: '100%', fontSize: '1.6rem', border: 'none', outline: 'none' }} />
             </div>
             <ul className="location-list">
                 <li data-loc="Sector 4, 19th Main, HSR Layout, Bengaluru"><i className="fas fa-map-pin"></i> HSR Layout, Bengaluru</li>
                 <li data-loc="Koramangala 5th Block, Bengaluru"><i className="fas fa-map-pin"></i> Koramangala, Bengaluru</li>
                 <li data-loc="Indiranagar 100 Feet Rd, Bengaluru"><i className="fas fa-map-pin"></i> Indiranagar, Bengaluru</li>
                 <li data-loc="Whitefield Main Rd, Bengaluru"><i className="fas fa-map-pin"></i> Whitefield, Bengaluru</li>
                 <li data-loc="Jayanagar 4th Block, Bengaluru"><i className="fas fa-map-pin"></i> Jayanagar, Bengaluru</li>
             </ul>
         </div>
     </div>

     {/*  My Profile Dropdown Menu  */}
     <div id="profile-dropdown" className="profile-dropdown-container">
         <ul>
             <li><a href="/customer#order" id="profile-orders-btn"><i className="fas fa-history"></i> My Orders</a></li>
             <li><a href="/customer#" id="profile-settings-btn"><i className="fas fa-cog"></i> Profile Settings</a></li>
             <li><a href="/customer#" id="profile-logout-btn"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
         </ul>
     </div>

     {/*  My Profile Settings Modal  */}
     <div id="profile-settings-modal" className="modal-container">
         <div className="modal-content profile-modal-content">
             <i className="fas fa-times close-modal-btn" id="close-profile-settings-btn"></i>
             <h2>My Profile Settings</h2>
             <p>Manage your name, details, and delivery addresses.</p>
             <form id="profile-settings-form">
                 <div className="profile-input-grid">
                     <div className="inputBox" style={{ marginBottom: '12px', textAlign: 'left' }}>
                         <label htmlFor="profile-name" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2f3542', display: 'block', marginBottom: '4px' }}>Full Name</label>
                         <input type="text" id="profile-name" placeholder="Enter name" required style={{ width: '100%', padding: '10px', fontSize: '1.4rem', border: '1px solid #dfe4ea', borderRadius: '6px', textTransform: 'none' }} />
                     </div>
                     <div className="inputBox" style={{ marginBottom: '12px', textAlign: 'left' }}>
                         <label htmlFor="profile-phone" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2f3542', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                         <input type="tel" id="profile-phone" placeholder="Enter phone" required style={{ width: '100%', padding: '10px', fontSize: '1.4rem', border: '1px solid #dfe4ea', borderRadius: '6px' }} />
                     </div>
                     <div className="inputBox" style={{ marginBottom: '12px', textAlign: 'left' }}>
                         <label htmlFor="profile-age" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2f3542', display: 'block', marginBottom: '4px' }}>Age</label>
                         <input type="number" id="profile-age" placeholder="Enter age" min="1" max="120" required style={{ width: '100%', padding: '10px', fontSize: '1.4rem', border: '1px solid #dfe4ea', borderRadius: '6px' }} />
                     </div>
                     <div className="inputBox" style={{ marginBottom: '12px', textAlign: 'left' }}>
                          <label htmlFor="profile-pincode" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2f3542', display: 'flex', alignItems: 'center', marginBottom: '4px' }}>Pin Code <span id="pincode-status" style={{ fontSize: '1.1rem', marginLeft: '8px', fontWeight: '800', display: 'none' }}></span></label>
                          <input type="text" id="profile-pincode" placeholder="Enter 6-digit pin code" required style={{ width: '100%', padding: '10px', fontSize: '1.4rem', border: '1px solid #dfe4ea', borderRadius: '6px' }} />
                      </div>
                 </div>
                 
                 <div className="inputBox" style={{ marginTop: '15px', textAlign: 'left' }}>
                     <label htmlFor="profile-address" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2f3542', display: 'block', marginBottom: '4px' }}>Delivery Address</label>
                     <div className="address-input-wrapper">
                         <input type="text" id="profile-address" placeholder="Select location or enter address" required />
                         <button type="button" id="detect-address-btn" className="detect-btn"><i className="fas fa-crosshairs"></i> Auto-Detect</button>
                     </div>
                     <div id="address-detect-loader" style={{ display: 'none', fontSize: '1.2rem', color: '#ff3838', marginTop: '8px', fontWeight: '700' }}>
                         <i className="fas fa-spinner fa-spin"></i> Detecting your current location...
                     </div>
                 </div>
                 
                 <button type="submit" className="btn0" style={{ width: '100%', marginTop: '20px', padding: '12px', fontSize: '1.6rem', cursor: 'pointer' }}>Save Profile</button>
             </form>
         </div>
     </div>
 
     
     
     
     
     
 
    </>
  );
}
