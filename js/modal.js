import { products } from './products.js';

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

export function setupModal() {
  window.openModal = function(id) {
    const product = products.find(p => p.id === id);
    modalContent.innerHTML = `
      <button class="absolute top-4 right-4 text-gray-400 hover:text-white" onclick="closeModal()">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      <img src="${product.image}" class="w-full h-64 object-cover rounded-xl mb-4">
      <h2 class="text-xl font-bold mb-2 text-white">${product.name}</h2>
      <p class="text-gray-400 mb-4">${product.description}</p>
      <span class="text-purple-500 font-bold text-lg mb-4 block">$${product.price}</span>
      <button class="btn bg-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 flex items-center gap-2" onclick="window.addToCart(${product.id})">
        <i data-lucide="plus-circle" class="w-5 h-5"></i> Add to Cart
      </button>
    `;
    modal.classList.add("active", "opacity-100", "visible");
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    if (window.lucide) window.lucide.replace();
  }

  window.closeModal = function() {
    modal.classList.remove("active");
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
  }

  modal.addEventListener('click', e => {
    if(e.target === modal) closeModal();
  });
}
