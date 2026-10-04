import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import { supabase } from "./lib/supabase";
import shopmartLogo from "./assets/shopmart-logo.png";

const DEMO_PASSWORD = "PASSWORD_ENTERED";

const PRODUCTS = [
  {
    id: 1,
    name: "Smart Watch GT Series",
    category: "Electronics",
    price: 2490,
    oldPrice: 3499,
    discount: 29,
    rating: 4.9,
    sold: 1200,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Premium Insulated Water Bottle",
    category: "Home",
    price: 599,
    oldPrice: 899,
    discount: 33,
    rating: 4.8,
    sold: 3500,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 959,
    oldPrice: 1499,
    discount: 36,
    rating: 4.9,
    sold: 5400,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Premium Smartphone",
    category: "Phones",
    price: 8999,
    oldPrice: 10999,
    discount: 18,
    rating: 4.9,
    sold: 8200,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Travel Tumbler Cup",
    category: "Home",
    price: 399,
    oldPrice: 699,
    discount: 43,
    rating: 4.8,
    sold: 2100,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Digital Camera",
    category: "Electronics",
    price: 4599,
    oldPrice: 5999,
    discount: 23,
    rating: 4.7,
    sold: 890,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Running Shoes",
    category: "Fashion",
    price: 1299,
    oldPrice: 1999,
    discount: 35,
    rating: 4.9,
    sold: 4100,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Mechanical Gaming Keyboard",
    category: "Gaming",
    price: 1599,
    oldPrice: 2299,
    discount: 30,
    rating: 4.9,
    sold: 1900,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Fashion Backpack",
    category: "Fashion",
    price: 799,
    oldPrice: 1199,
    discount: 33,
    rating: 4.8,
    sold: 2700,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Beauty Collection",
    category: "Beauty",
    price: 699,
    oldPrice: 999,
    discount: 30,
    rating: 4.8,
    sold: 3300,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Laptop Backpack",
    category: "Fashion",
    price: 899,
    oldPrice: 1399,
    discount: 36,
    rating: 4.8,
    sold: 1700,
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=900&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Gaming Mouse",
    category: "Gaming",
    price: 699,
    oldPrice: 1099,
    discount: 36,
    rating: 4.9,
    sold: 2800,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=900&auto=format&fit=crop",
  },
];

const SERVICES = [
  ["🎁", "Refer For Rewards"],
  ["🛡️", "Secure Shopping"],
  ["📦", "Fulfilled by Shopee"],
  ["⚡", "Flash Deals"],
  ["🚚", "Free Shipping"],
  ["💄", "Shopee Beauty"],
  ["🏆", "Shopee Loyalty"],
  ["💳", "Partner Promos"],
  ["🪙", "Coins Rewards"],
  ["🛒", "Shopee Supermarket"],
];

const CATEGORIES = [
  ["📱", "Phones"],
  ["💻", "Electronics"],
  ["👕", "Fashion"],
  ["🏠", "Home"],
  ["💄", "Beauty"],
  ["🎮", "Gaming"],
];

function formatPrice(value) {
  return `₱${Number(value).toLocaleString("en-PH")}`;
}

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [rewardStep, setRewardStep] = useState("none");
  const [rewardName, setRewardName] = useState("");
  const [rewardPassword, setRewardPassword] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");
  const [rewardLoading, setRewardLoading] = useState(false);

  const [toast, setToast] = useState("");
  const [infoModal, setInfoModal] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("shopmart_cart");
    const storedFavorites = localStorage.getItem("shopmart_favorites");

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        setCart([]);
      }
    }

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shopmart_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "shopmart_favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (search.trim()) {
      const term = search.toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(term)
      );
    }

    return result;
  }, [search, selectedCategory]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function showToast(message) {
    setToast(message);
  }

  function openInfo(title, message) {
    setInfoModal({ title, message });
  }

  function goHome() {
    setPage("home");
    setSelectedProduct(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setPage("product");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    showToast(`${product.name} added to cart`);
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity + amount
                ),
              }
            : item
        )
    );
  }

  function toggleFavorite(id) {
    setFavorites((current) => {
      if (current.includes(id)) {
        showToast("Removed from favorites");
        return current.filter((item) => item !== id);
      }

      showToast("Added to favorites");
      return [...current, id];
    });
  }

  function openReward() {
    setRewardStep("login");
    setRewardName("");
    setRewardPassword("");
    setRewardMessage("");
  }

  async function claimReward() {
    if (!rewardName.trim()) {
      setRewardMessage("Please enter your name.");
      return;
    }

    if (!rewardPassword.trim()) {
      setRewardMessage("Please enter a password.");
      return;
    }

    setRewardLoading(true);
    setRewardMessage("");

    try {
      // IMPORTANT: the password typed by the user is never stored.
      // Only a non-sensitive marker is saved to show that a password was entered.
      const { error } = await supabase
        .from("profiles")
        .insert({
          name: rewardName.trim(),
          demo_password: "PASSWORD_ENTERED",
        });

      if (error) {
        console.error("Reward claim error:", error);
      }
    } catch (error) {
      console.error("Reward connection error:", error);
    }

    setRewardPassword("");
    setRewardLoading(false);
    setRewardStep("checking");

    setTimeout(() => {
      setRewardStep("verified");
    }, 1800);
  }

  function resetReward() {
    setRewardStep("none");
    setRewardName("");
    setRewardPassword("");
    setRewardMessage("");
    setRewardLoading(false);
  }

  function ProductCard({ product }) {
    const favorite = favorites.includes(product.id);

    return (
      <article className="product-card">
        <div
          className="product-image"
          onClick={() => openProduct(product)}
        >
          <span className="discount-badge">
            -{product.discount}%
          </span>

          <button
            className={`heart-button ${
              favorite ? "active" : ""
            }`}
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite(product.id);
            }}
            aria-label="Favorite"
          >
            {favorite ? "♥" : "♡"}
          </button>

          <img
            src={product.image}
            alt={product.name}
          />

          <div className="mall-label">
            SHOPEE
          </div>
        </div>

        <div className="product-content">
          <h3
            onClick={() => openProduct(product)}
          >
            {product.name}
          </h3>

          <div className="rating-row">
            <span className="star">
              ★
            </span>

            {product.rating}

            <span className="divider">
              |
            </span>

            {product.sold.toLocaleString()} sold
          </div>

          <div className="price-row">
            <strong>
              {formatPrice(product.price)}
            </strong>

            <del>
              {formatPrice(product.oldPrice)}
            </del>
          </div>

          <button
            className="add-cart-button"
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>
        </div>
      </article>
    );
  }

  function Header() {
    return (
      <>
        <header className="top-header">
          <div className="top-header-inner">
            <div className="top-left">
              <button onClick={() => openInfo("Seller Centre", "Seller tools are available from the Shopee seller portal.")}>Seller Centre</button>
              <span>|</span>
              <button onClick={() => openInfo("Start Selling", "Create a seller account to list products and manage orders.")}>Start Selling</button>
              <span>|</span>
              <button onClick={() => openInfo("Download Shopee", "The Shopee mobile app is coming soon.")}>Download</button>
              <span>|</span>
              <button onClick={() => openInfo("Follow Shopee", "Follow Shopee for announcements and promotions.")}>Follow us on</button>
              <button className="social-mini" onClick={() => openInfo("Facebook", "Shopee Facebook page.")}>f</button>
              <button className="social-mini" onClick={() => openInfo("Instagram", "Shopee Instagram page.")}>◎</button>
            </div>

            <div className="top-right">
              <button>🔔 Notifications</button>
              <button>❔ Help</button>
              <button>🌐 English</button>

              <span>|</span>

              <button>Sign Up</button>
              <button
                onClick={openReward}
              >
                Login
              </button>
            </div>
          </div>
        </header>

        <header className="main-header">
          <div className="main-header-inner">
            <button
              className="brand"
              onClick={goHome}
            >
              <span className="brand-bag">
              <img src={shopmartLogo} alt="ShopMart logo" className="brand-logo-image" />
              </span>

              <span className="brand-name">
                SHOPEE
              </span>
            </button>

            <div className="search-box">
              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setPage("categories");
                  }
                }}
                placeholder="Search for products, brands and categories"
              />

              <button
                onClick={() => setPage("categories")}
              >
                🔍
              </button>
            </div>

            <button
              className="cart-button"
              onClick={() => setPage("cart")}
            >
              🛒

              {cartCount > 0 && (
                <span>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="popular-searches">
            <button
              onClick={() => {
                setSearch("Smart Watch");
                setSelectedCategory("All");
                setPage("categories");
              }}
            >
              Smart Watch
            </button>

            <button
              onClick={() => {
                setSearch("Wireless Headphones");
                setSelectedCategory("All");
                setPage("categories");
              }}
            >
              Wireless Headphones
            </button>

            <button
              onClick={() => {
                setSearch("Running Shoes");
                setSelectedCategory("All");
                setPage("categories");
              }}
            >
              Running Shoes
            </button>

            <button
              onClick={() => {
                setSearch("Gaming Keyboard");
                setSelectedCategory("All");
                setPage("categories");
              }}
            >
              Gaming Keyboard
            </button>

            <button
              onClick={() => {
                setSearch("Beauty");
                setSelectedCategory("All");
                setPage("categories");
              }}
            >
              Beauty
            </button>
          </div>
        </header>
      </>
    );
  }

  function HomePage() {
    return (
      <>
        <section className="hero-section">
          <div className="main-banner">
            <div className="banner-content">
              <small>
                SHOPEE EXCLUSIVE
              </small>

              <h1>
                PAYDAY
                <br />
                SALE
              </h1>

              <div className="date-label">
                SEP 26 — 30
              </div>

              <p>
                Huge discounts, free shipping
                and exclusive shopping rewards.
              </p>

              <button
                onClick={() => setPage("flash")}
              >
                SHOP NOW
              </button>
            </div>

            <div className="banner-product">
              <div className="floating-circle">
                %
              </div>

              <img
                src={PRODUCTS[3].image}
                alt="Promotion"
              />
            </div>
          </div>

          <div className="reward-banner">
            <small>
              EXCLUSIVE SHOPEE REWARD
            </small>

            <div className="reward-amount">
              ₱500
            </div>

            <strong>
              SHOPPING VOUCHER
            </strong>

            <p>
              Limited reward for selected
              shoppers.
            </p>

            <button
              onClick={openReward}
            >
              CLAIM REWARD
            </button>
          </div>
        </section>

        <section className="service-section">
          {SERVICES.map(
            ([icon, title]) => (
              <button
                key={title}
                onClick={() => {
                if (title.includes("Rewards")) {
                  openReward();
                } else if (title.includes("Flash")) {
                  setPage("flash");
                } else if (title.includes("Beauty")) {
                  setSelectedCategory("Beauty");
                  setPage("categories");
                } else {
                  openInfo(title, "This Shopee service is available from this section.");
                }
              }}
              >
                <span className="service-icon">
                  {icon}
                </span>

                <strong>
                  {title}
                </strong>
              </button>
            )
          )}
        </section>

        <section className="section-box payday-box">
          <div className="section-title">
            <h2>
              CHECK OUT NOW!
            </h2>

            <button
              onClick={() => setPage("categories")}
            >
              See More ›
            </button>
          </div>

          <div className="featured-grid">
            {PRODUCTS.slice(0, 5).map(
              (product) => (
                <div
                  className="featured-product"
                  key={product.id}
                  onClick={() =>
                    openProduct(product)
                  }
                >
                  <div className="featured-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <strong>
                    {product.name}
                  </strong>

                  <span>
                    {formatPrice(
                      product.price
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        <section className="section-box">
          <div className="section-title">
            <h2>
              ⚡ FLASH SALE
            </h2>

            <button
              onClick={() => setPage("flash")}
            >
              See More ›
            </button>
          </div>

          <div className="flash-grid">
            {PRODUCTS.slice(0, 6).map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        </section>

        <section className="section-box">
          <div className="section-title">
            <h2>
              🛍️ RECOMMENDED FOR YOU
            </h2>

            <button
              onClick={() =>
                setPage("categories")
              }
            >
              See More ›
            </button>
          </div>

          <div className="product-grid">
            {PRODUCTS.slice(6).map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        </section>
      </>
    );
  }

  function CategoryPage() {
    return (
      <section className="page-container">
        <div className="category-menu">
          <button
            className={
              selectedCategory === "All"
                ? "selected"
                : ""
            }
            onClick={() =>
              setSelectedCategory("All")
            }
          >
            <span>✨</span>
            All
          </button>

          {CATEGORIES.map(
            ([icon, name]) => (
              <button
                key={name}
                className={
                  selectedCategory === name
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setSelectedCategory(name)
                }
              >
                <span>{icon}</span>
                {name}
              </button>
            )
          )}
        </div>

        <div className="catalog-header">
          <div>
            <small>
              SHOPEE MARKETPLACE
            </small>

            <h1>
              {selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h1>
          </div>

          <span>
            {filteredProducts.length} products
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div>🔎</div>
            <h2>
              No products found
            </h2>
            <p>
              Try another search term.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        )}
      </section>
    );
  }

  function ProductPage() {
    if (!selectedProduct) {
      return null;
    }

    return (
      <section className="product-detail">
        <button
          className="back-button"
          onClick={goHome}
        >
          ← Back to Shop
        </button>

        <div className="product-detail-card">
          <div className="detail-image">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>

          <div className="detail-info">
            <div className="mall-label large">
              SHOPEE
            </div>

            <h1>
              {selectedProduct.name}
            </h1>

            <div className="detail-rating">
              ★ {selectedProduct.rating}
              <span>
                | {selectedProduct.sold} sold
              </span>
            </div>

            <div className="detail-price">
              {formatPrice(
                selectedProduct.price
              )}

              <del>
                {formatPrice(
                  selectedProduct.oldPrice
                )}
              </del>
            </div>

            <div className="discount-info">
              {selectedProduct.discount}% OFF
            </div>

            <div className="shipping-box">
              🚚 Free shipping available
              <br />
              🛡️ Shopee buyer protection
              <br />
              ↩️ Easy returns
            </div>

            <div className="detail-actions">
              <button
                className="outline-button"
                onClick={() =>
                  addToCart(selectedProduct)
                }
              >
                🛒 Add To Cart
              </button>

              <button
                className="buy-button"
                onClick={() => {
                  addToCart(
                    selectedProduct
                  );
                  setPage("cart");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function CartPage() {
    return (
      <section className="page-container">
        <div className="cart-title">
          <h1>
            🛒 Shopping Cart
          </h1>

          <span>
            {cartCount} items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div>🛒</div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add something you like!
            </p>

            <button
              onClick={goHome}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h3>
                      {item.name}
                    </h3>

                    <small>
                      {item.category}
                    </small>

                    <strong>
                      {formatPrice(
                        item.price
                      )}
                    </strong>
                  </div>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        changeQuantity(
                          item.id,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        changeQuantity(
                          item.id,
                          1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="item-total">
                    {formatPrice(
                      item.price *
                        item.quantity
                    )}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <aside className="checkout-box">
              <h2>
                Order Summary
              </h2>

              <div>
                <span>
                  Merchandise
                </span>

                <strong>
                  {formatPrice(cartTotal)}
                </strong>
              </div>

              <div>
                <span>
                  Shipping
                </span>

                <strong>
                  FREE
                </strong>
              </div>

              <hr />

              <div className="checkout-total">
                <span>
                  Total
                </span>

                <strong>
                  {formatPrice(cartTotal)}
                </strong>
              </div>

              <button
                onClick={() =>
                  showToast(
                    "Checkout is part of the training demo."
                  )
                }
              >
                CHECK OUT
              </button>
            </aside>
          </div>
        )}
      </section>
    );
  }

  function FlashPage() {
    return (
      <section className="page-container">
        <div className="flash-heading">
          <div>
            <small>
              LIMITED-TIME DEALS
            </small>

            <h1>
              ⚡ FLASH SALE
            </h1>
          </div>

          <div className="countdown">
            <span>
              ENDS IN
            </span>

            <b>
              08 : 42 : 17
            </b>
          </div>
        </div>

        <div className="product-grid">
          {PRODUCTS.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="app">

      <Header />

      <main>
        {page === "home" && (
          <HomePage />
        )}

        {page === "categories" && (
          <CategoryPage />
        )}

        {page === "product" && (
          <ProductPage />
        )}

        {page === "cart" && (
          <CartPage />
        )}

        {page === "flash" && (
          <FlashPage />
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h2>
              🛍️ SHOPEE
            </h2>

          </div>

          <div>
            <h3>
              SHOPEE
            </h3>

            <button onClick={goHome}>
              Home
            </button>

            <button
              onClick={() =>
                setPage("categories")
              }
            >
              Products
            </button>

            <button
              onClick={() =>
                setPage("flash")
              }
            >
              Flash Sale
            </button>
          </div>

          <div>
            <h3>
              HELP
            </h3>

            <button onClick={() => openInfo("Help Centre", "Find answers about accounts, orders, payments, delivery, and returns.")}>
              Help Centre
            </button>

            <button onClick={() => openInfo("Shipping", "Shipping information depends on the seller, destination, and selected delivery option.")}>
              Shipping
            </button>

            <button onClick={() => openInfo("Returns", "Return eligibility depends on the product and order status.")}>
              Returns
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 SHOPEE
        </div>
      </footer>

      <InfoModal
        infoModal={infoModal}
        setInfoModal={setInfoModal}
      />

      <RewardModal
        rewardStep={rewardStep}
        rewardName={rewardName}
        rewardPassword={rewardPassword}
        rewardMessage={rewardMessage}
        rewardLoading={rewardLoading}
        setRewardName={setRewardName}
        setRewardPassword={setRewardPassword}
        claimReward={claimReward}
        resetReward={resetReward}
        setRewardStep={setRewardStep}
      />

      {toast && (
        <div className="toast">
          ✓ {toast}
        </div>
      )}

    </div>
  );
}



function InfoModal({ infoModal, setInfoModal }) {
  if (!infoModal) return null;

  return (
    <div className="modal-overlay">
      <div className="reward-modal info-modal">
        <button
          className="modal-close"
          onClick={() => setInfoModal(null)}
          aria-label="Close"
        >
          ×
        </button>

        <div className="reward-icon">ℹ️</div>
        <h2>{infoModal.title}</h2>
        <p className="modal-subtitle">{infoModal.message}</p>

        <button
          className="claim-button"
          onClick={() => setInfoModal(null)}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

function RewardModal({
  rewardStep,
  rewardName,
  rewardPassword,
  rewardMessage,
  rewardLoading,
  setRewardName,
  setRewardPassword,
  claimReward,
  resetReward,
  setRewardStep,
}) {
  if (rewardStep === "none") return null;

  return (
    <div className="modal-overlay">
      <div className="reward-modal">
        <button className="modal-close" onClick={resetReward} aria-label="Close">
          ×
        </button>

        {rewardStep === "login" && (
          <>
            <div className="reward-icon">🎁</div>

            <h2>Claim Your Reward</h2>

            <p className="modal-subtitle">
              Enter your details to continue with this reward.
            </p>

            <div className="reward-input">
              <label>Your Name</label>
              <input
                type="text"
                value={rewardName}
                onChange={(event) => setRewardName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="off"
                autoFocus
              />
            </div>

            <div className="reward-input">
              <label>Password</label>
              <input
                type="password"
                value={rewardPassword}
                onChange={(event) => setRewardPassword(event.target.value)}
                placeholder="Enter any password"
                autoComplete="new-password"
              />
            </div>


            {rewardMessage && (
              <div className="error-message">{rewardMessage}</div>
            )}

            <button
              className="claim-button"
              onClick={claimReward}
              disabled={rewardLoading}
            >
              {rewardLoading ? "PROCESSING..." : "CONTINUE"}
            </button>


          </>
        )}

        {rewardStep === "checking" && (
          <div className="checking-screen">
            <div className="loader"></div>
            <h2>Checking Reward...</h2>
            <p>Please wait while we verify your eligibility.</p>

            <div className="verification-lines">
              <span>✓ Account submitted</span>
              <span>✓ Reward eligibility checked</span>
              <span>✓ Verification in progress</span>
            </div>
          </div>
        )}

        {rewardStep === "verified" && (
          <div className="verified-screen">
            <div className="success-icon">✓</div>
            <div className="training-tag">REWARD CLAIMED</div>
            <h2>Congratulations, {rewardName || "Shopper"}!</h2>
            <p>Your shopping voucher has been successfully claimed.</p>

            <div className="voucher-card">
              <div className="voucher-top">
                <div>
                  <small>SHOPMART VOUCHER</small>
                  <strong>₱500 OFF</strong>
                </div>
                <div className="voucher-icon">🎁</div>
              </div>
              <div className="voucher-divider"></div>
              <div className="voucher-details">
                <span>Minimum spend</span>
                <strong>₱1,000</strong>
                <span>Valid until</span>
                <strong>30 Sep 2026</strong>
              </div>
            </div>

            <button
              className="claim-button"
              onClick={() => setRewardStep("reveal")}
            >
              VIEW REWARD
            </button>
          </div>
        )}

        {rewardStep === "reveal" && (
          <div className="reveal-screen">
            <div className="reward-success-large">🎉</div>
            <div className="training-tag">VOUCHER READY</div>
            <h2>Your Voucher Is Ready!</h2>
            <p>Save this voucher and use it on your next ShopMart purchase.</p>

            <div className="final-voucher">
              <small>SHOPMART SHOPPING VOUCHER</small>
              <div className="final-voucher-amount">₱500 OFF</div>

              <div className="voucher-code">
                <span>Voucher Code</span>
                <strong>SHOP500</strong>
              </div>

              <div className="voucher-status">
                ✓ Ready to use&nbsp;&nbsp; • &nbsp;&nbsp;Minimum spend ₱1,000
              </div>
            </div>

            <div className="reward-actions">
              <button className="claim-button" onClick={resetReward}>
                SHOP NOW
              </button>
              <button
                className="secondary-reward-button"
                onClick={resetReward}
              >
                CLOSE
              </button>
            </div>

            <div className="lesson-box">
              <strong>Cybersecurity Awareness</strong>
              <p>
                This reward flow is a controlled simulation. Your typed password
                was not stored; only the fixed demo value is used by the database.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;