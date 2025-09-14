// Product page interactions
function initProductPage() {
  // Quantity controls
  const qtyControls = document.querySelectorAll('.qty');
  qtyControls.forEach(control => {
    const minus = control.querySelector('.qty-minus');
    const plus = control.querySelector('.qty-plus');
    const span = control.querySelector('span');
    
    if (minus && plus && span) {
      minus.addEventListener('click', () => {
        let qty = parseInt(span.textContent);
        if (qty > 1) {
          span.textContent = qty - 1;
        }
      });
      
      plus.addEventListener('click', () => {
        let qty = parseInt(span.textContent);
        span.textContent = qty + 1;
      });
    }
  });
  
  // Delivery & Returns accordion
  const deliveryHeaders = document.querySelectorAll('.delivery-returns-header');
  deliveryHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const arrow = header.querySelector('.arrow');
      
      if (content.classList.contains('open')) {
        content.classList.remove('open');
        arrow.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('open');
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });
  
  // Gallery image click
  const galleryImages = document.querySelectorAll('.gallery-img');
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      // Simple lightbox effect - can be enhanced
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
      `;
      
      const enlargedImg = document.createElement('img');
      enlargedImg.src = img.src;
      enlargedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `;
      
      overlay.appendChild(enlargedImg);
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
    });
  });
  
  // Add to cart functionality
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get product details
      const productTitle = document.querySelector('.info h2')?.textContent || 'Product';
      const productPrice = document.querySelector('.price')?.textContent || '$0';
      const quantity = document.querySelector('.qty span')?.textContent || '1';
      
      // Simple cart simulation - in real app, this would integrate with backend
      const cartItem = {
        title: productTitle,
        price: productPrice,
        quantity: parseInt(quantity),
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage for demo
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Visual feedback
      btn.textContent = 'Added!';
      btn.style.background = '#28a745';
      
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 2000);
      
      // Update cart count if displayed
      updateCartCount();
    });
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggleBtn.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggleBtn.innerHTML = '☰';
      }
    });
  }
}

// Cart count update
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Update cart badge if it exists
  const cartBadge = document.querySelector('.cart-count');
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'block' : 'none';
  }
}

// Pinterest grid masonry effect
function initMasonryGrid() {
  const grids = document.querySelectorAll('.pinterest-grid');
  
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.product-card');
    
    // Simple masonry-like effect using CSS columns
    // The CSS already handles this, but we can add loading animations
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.style.animation = 'fadeInUp 0.6s ease forwards';
    });
  });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
  initMobileMenu();
  initMasonryGrid();
  updateCartCount();
});

// CSS animation keyframes (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .product-card {
    opacity: 0;
  }
  
  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #dc3545;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    display: none;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .search-cart {
    position: relative;
  }
  
  .arrow {
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);
