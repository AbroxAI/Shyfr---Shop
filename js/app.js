// Admin / Cart / Products Logic
const products=[
  {id:1,name:"Luxury Hoodie",price:79.99,description:"Soft cotton, premium stitching.",image:"images/hoodie.png",tags:["New"]},
  {id:2,name:"Dark Sneakers",price:129.99,description:"Comfortable, stylish.",image:"images/sneakers.png",tags:["Premium"]}
];

const productList=document.getElementById("product-list");
const cartCount=document.getElementById("cart-count");
const cartPanel=document.getElementById("cart-panel");
const cartItems=document.getElementById("cart-items");
const cartTotal=document.getElementById("cart-total");
const modal=document.getElementById("modal");
const modalContent=document.getElementById("modal-content");

let cart=[];

// Render products
function renderProducts(){
  productList.innerHTML="";
  products.forEach(product=>{
    const card=document.createElement("div");
    card.className="relative bg-gray-900 bg-opacity-75 backdrop-blur-md p-6 rounded-2xl shadow-xl transition transform hover:-translate-y-2 hover:scale-105";
    card.innerHTML=`
      ${product.tags.length>0? `<span class="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">${product.tags[0]}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" class="w-full h-52 object-cover rounded-xl mb-4 cursor-pointer" onclick="openModal(${product.id})">
      <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
      <p class="text-gray-400 mb-3 text-sm">${product.description}</p>
      <div class="flex items-center justify-between">
        <span class="text-purple-500 font-bold">$${product.price}</span>
        <button class="btn flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition" onclick="addToCart(${product.id})">
          <i data-lucide="plus-circle" class="w-5 h-5"></i> Add
        </button>
      </div>
    `;
    productList.appendChild(card);
  });
  if(window.lucide) lucide.replace();
}

// Cart functions
function addToCart(id){
  cart.push(id);
  cartCount.textContent=cart.length;
  updateCartPanel();
  openCartBubble();
}

function updateCartPanel(){
  cartPanel.classList.add("active");
  cartItems.innerHTML='';
  let total=0;
  cart.forEach((id,index)=>{
    const p=products.find(x=>x.id===id);
    total+=p.price;
    const item=document.createElement("div");
    item.className="flex justify-between items-center p-2 bg-gray-800 rounded-lg";
    item.innerHTML=`<span>${p.name} - ${p.description}</span><div class="flex items-center gap-2"><span>$${p.price}</span><button class="text-red-500 hover:text-red-400" onclick="removeCartItem(${index})"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div>`;
    cartItems.appendChild(item);
  });
  cartTotal.textContent=`$${total.toFixed(2)}`;
  if(window.lucide) lucide.replace();
}

function openCartBubble(){
  const bubble=document.createElement("div");
  bubble.className="cart-bubble absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white";
  bubble.textContent="+1";
  document.querySelector('#cart-btn').appendChild(bubble);
  setTimeout(()=>bubble.remove(),800);
}

window.removeCartItem=function(i){ cart.splice(i,1); cartCount.textContent=cart.length; updateCartPanel(); }
window.closeCart=function(){ cartPanel.classList.remove("active"); }

// Product Modal
window.openModal=function(id){
  const p=products.find(x=>x.id===id);
  modalContent.innerHTML=`<button class="absolute top-4 right-4 text-gray-400 hover:text-white" onclick="closeModal()"><i data-lucide="x" class="w-6 h-6"></i></button>
  <img src="${p.image}" class="w-full h-64 object-cover rounded-xl mb-4">
  <h2 class="text-xl font-bold mb-2 text-white">${p.name}</h2>
  <p class="text-gray-400 mb-4">${p.description}</p>
  <span class="text-purple-500 font-bold text-lg mb-4 block">$${p.price}</span>
  <button class="btn bg-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 flex items-center gap-2" onclick="addToCart(${p.id})"><i data-lucide="plus-circle" class="w-5 h-5"></i> Add to Cart</button>`;
  modal.classList.add("active");
  if(window.lucide) lucide.replace();
}

window.closeModal=function(){ modal.classList.remove("active"); }

// Admin Product Upload
const isAdmin=prompt("Enter admin password:") === "Shyfr 12$";
if(isAdmin){
  document.getElementById("admin-panel").classList.remove("hidden");
  document.getElementById("add-product-btn").addEventListener("click",()=>{
    const name=document.getElementById("product-name").value.trim();
    const price=parseFloat(document.getElementById("product-price").value.trim());
    const desc=document.getElementById("product-desc").value.trim();
    const file=document.getElementById("product-image").files[0];
    if(!name||isNaN(price)||!desc||!file) return alert("All fields required");
    const reader=new FileReader();
    reader.onload=e=>{
      products.push({id:products.length+1,name,price,description:desc,image:e.target.result,tags:["Admin"]});
      renderProducts();
    }
    reader.readAsDataURL(file);
  });
}

// Initial render
renderProducts();
