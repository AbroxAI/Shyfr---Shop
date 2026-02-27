export const products = [
  {id:1, name:"Luxury Hoodie", price:79.99, description:"Soft cotton, premium stitching, limited edition.", image:"images/hoodie.png", tags:["New"]},
  {id:2, name:"Dark Sneakers", price:129.99, description:"Comfortable, stylish, built to last.", image:"images/sneakers.png", tags:["Premium"]}
];

export const productList = document.getElementById("product-list");

export function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "relative bg-gray-900 bg-opacity-75 backdrop-blur-md p-6 rounded-2xl shadow-xl transition transform hover:-translate-y-2 hover:scale-105";

    card.innerHTML = `
      ${product.tags.length>0? `<span class="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">${product.tags[0]}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" class="w-full h-52 object-cover rounded-xl mb-4 cursor-pointer" onclick="window.openModal(${product.id})">
      <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
      <p class="text-gray-400 mb-3 text-sm">${product.description}</p>
      <div class="flex items-center justify-between">
        <span class="text-purple-500 font-bold">$${product.price}</span>
        <button class="btn flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition" onclick="window.addToCart(${product.id})">
          <i data-lucide="plus-circle" class="w-5 h-5"></i> Add
        </button>
      </div>
    `;
    productList.appendChild(card);
  });
}
