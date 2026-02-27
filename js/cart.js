import { products, renderProducts } from './products.js';

let cart = [];
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

export function setupCart() {
  window.addToCart = function(id) {
    cart.push(id);
    cartCount.textContent = cart.length;
    updateCartPanel();
    openCartBubble();
  }
}

function openCartBubble(){
  const bubble = document.createElement("div");
  bubble.className="cart-bubble absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white";
  bubble.textContent="+1";
  document.querySelector('#cart-btn').appendChild(bubble);
  setTimeout(()=> bubble.remove(), 800);
}

export function updateCartPanel(){
  cartPanel.classList.add("active");
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((id, index) => {
    const product = products.find(p=>p.id===id);
    total += product.price;
    const item = document.createElement('div');
    item.className = "flex justify-between items-center p-2 bg-gray-800 rounded-lg";
    item.innerHTML = `
      <span>${product.name}</span>
      <div class="flex items-center gap-2">
        <span>$${product.price}</span>
        <button class="text-red-500 hover:text-red-400" onclick="removeCartItem(${index})">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(item);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
  if(window.lucide) window.lucide.replace();
}

window.removeCartItem = function(index){
  cart.splice(index,1);
  cartCount.textContent = cart.length;
  updateCartPanel();
}

window.closeCart = function(){
  cartPanel.classList.remove("active");
}
